from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.views import APIView

from .city_data import CITY_DATA
from .serializers import CitySerializer, OrganiserSerializer


ORGANISER_USERNAMES = (
    "asha_organiser",
    "ravi_organiser",
    "meera_organiser",
)


class CityListView(APIView):
    def get(self, request):
        serializer = CitySerializer(CITY_DATA, many=True)
        return Response(serializer.data)


class OrganiserListView(APIView):
    def get(self, request):
        organisers = User.objects.filter(
            username__in=ORGANISER_USERNAMES
        ).order_by("id")
        serializer = OrganiserSerializer(organisers, many=True)
        return Response(serializer.data)
