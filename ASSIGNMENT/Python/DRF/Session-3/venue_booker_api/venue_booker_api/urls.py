from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter, SimpleRouter

from venues.views import VenueFeedViewSet, VenueViewSet


venue_router = DefaultRouter()
venue_router.register("venues", VenueViewSet, basename="venue")

feed_router = SimpleRouter()
feed_router.register("feed", VenueFeedViewSet, basename="venue-feed")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(venue_router.urls)),
    path("api/", include(feed_router.urls)),
]
