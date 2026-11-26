from rest_framework import filters, viewsets
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .city_data import CITY_DATA
from .models import Venue
from .pagination import VenueCursorPagination, VenueLimitOffsetPagination
from .permissions import IsOwnerOrReadOnly
from .serializers import CitySerializer, VenueSerializer


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
