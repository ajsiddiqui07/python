from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Venue
from .serializers import VenueSerializer


class VenueListCreateView(APIView):
    def get(self, request):
        venues = Venue.objects.all().order_by("id")
        serializer = VenueSerializer(venues, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = VenueSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class VenueDetailView(APIView):
    def get(self, request, pk):
        venue = get_object_or_404(Venue, pk=pk)
        serializer = VenueSerializer(venue)
        return Response(serializer.data)

    def put(self, request, pk):
        venue = get_object_or_404(Venue, pk=pk)
        serializer = VenueSerializer(venue, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def patch(self, request, pk):
        venue = get_object_or_404(Venue, pk=pk)
        serializer = VenueSerializer(
            venue,
            data=request.data,
            partial=True,
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request, pk):
        venue = get_object_or_404(Venue, pk=pk)
        venue.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
