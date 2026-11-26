from rest_framework import filters, viewsets

from .models import Venue
from .pagination import VenueCursorPagination, VenueLimitOffsetPagination
from .serializers import VenueSerializer


class VenueViewSet(viewsets.ModelViewSet):
    queryset = Venue.objects.all().order_by("id")
    serializer_class = VenueSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["name", "city"]
    ordering_fields = ["price_per_day", "capacity", "name"]
    pagination_class = VenueLimitOffsetPagination


class VenueFeedViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Venue.objects.all().order_by("-created_at")
    serializer_class = VenueSerializer
    pagination_class = VenueCursorPagination
