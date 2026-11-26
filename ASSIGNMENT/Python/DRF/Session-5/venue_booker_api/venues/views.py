from decimal import Decimal, InvalidOperation

import requests
from django.conf import settings
from django.shortcuts import get_object_or_404
from rest_framework import filters, viewsets
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .city_data import CITY_DATA
from .models import Venue
from .pagination import VenueCursorPagination, VenueLimitOffsetPagination
from .permissions import IsOwnerOrReadOnly
from .serializers import CitySerializer, VenueSerializer


OUTDOOR_UNSUITABLE_CONDITIONS = {"Rain", "Drizzle", "Thunderstorm"}
OPENWEATHER_URL = "https://api.openweathermap.org/data/2.5/weather"
GITHUB_USER_URL = "https://api.github.com/users/{}"


class VenueViewSet(viewsets.ModelViewSet):
    queryset = Venue.objects.all().order_by("id")
    serializer_class = VenueSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["name", "city"]
    ordering_fields = ["price_per_day", "capacity", "name"]
    pagination_class = VenueLimitOffsetPagination

    def get_permissions(self):
        if self.action == "destroy":
            permission_classes = [IsAdminUser]
        else:
            permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]
        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class VenueFeedViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Venue.objects.all().order_by("-created_at")
    serializer_class = VenueSerializer
    pagination_class = VenueCursorPagination


class CityListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        serializer = CitySerializer(CITY_DATA, many=True)
        return Response(serializer.data)


class VenueWeatherView(APIView):
    def get(self, request, venue_id):
        venue = get_object_or_404(Venue, pk=venue_id)
        try:
            weather_response = requests.get(
                OPENWEATHER_URL,
                params={
                    "q": venue.city,
                    "appid": settings.OPENWEATHER_API_KEY,
                    "units": "metric",
                },
                timeout=5,
            )
        except requests.exceptions.RequestException:
            return Response(
                {"detail": "Weather service unavailable"},
                status=503,
            )

        if weather_response.status_code == 404:
            return Response({"detail": "City not found"}, status=404)
        if weather_response.status_code != 200:
            return Response(
                {"detail": "Weather service unavailable"},
                status=503,
            )

        try:
            weather_data = weather_response.json()
            temp_c = weather_data["main"]["temp"]
            condition = weather_data["weather"][0]["main"]
        except (IndexError, KeyError, TypeError, ValueError):
            return Response(
                {"detail": "Weather service unavailable"},
                status=503,
            )

        outdoor_ok = not (
            venue.is_outdoor
            and condition in OUTDOOR_UNSUITABLE_CONDITIONS
        )
        return Response(
            {
                "venue": venue.name,
                "city": venue.city,
                "temp_c": temp_c,
                "condition": condition,
                "outdoor_ok": outdoor_ok,
            }
        )


class GitHubUserView(APIView):
    def get(self, request, username):
        try:
            github_response = requests.get(
                GITHUB_USER_URL.format(username),
                headers={"Accept": "application/vnd.github+json"},
                timeout=5,
            )
        except requests.exceptions.RequestException:
            return Response(
                {"detail": "GitHub service unavailable"},
                status=503,
            )

        if github_response.status_code == 404:
            return Response(
                {"detail": "GitHub user not found"},
                status=404,
            )
        if github_response.status_code != 200:
            return Response(
                {"detail": "GitHub service unavailable"},
                status=503,
            )

        try:
            profile = github_response.json()
            result = {
                "login": profile["login"],
                "public_repos": profile["public_repos"],
                "followers": profile["followers"],
            }
        except (KeyError, TypeError, ValueError):
            return Response(
                {"detail": "GitHub service unavailable"},
                status=503,
            )
        return Response(result)


class PriceHintView(APIView):
    def get(self, request, venue_id):
        venue = get_object_or_404(Venue, pk=venue_id)
        try:
            hint_response = requests.post(
                settings.FASTAPI_PRICE_HINT_URL,
                json={
                    "capacity": venue.capacity,
                    "is_outdoor": venue.is_outdoor,
                },
                timeout=5,
            )
        except requests.exceptions.RequestException:
            return Response(
                {"detail": "Price service unavailable"},
                status=503,
            )

        if hint_response.status_code != 200:
            return Response(
                {"detail": "Price service unavailable"},
                status=503,
            )

        try:
            suggestion = Decimal(
                str(hint_response.json()["suggestion"])
            )
            if not suggestion.is_finite():
                raise InvalidOperation
        except (InvalidOperation, KeyError, TypeError, ValueError):
            return Response(
                {"detail": "Price service unavailable"},
                status=503,
            )

        difference = suggestion - venue.price_per_day
        return Response(
            {
                "venue": venue.name,
                "current_price": venue.price_per_day,
                "suggestion": suggestion,
                "difference": difference,
            }
        )
