from django.contrib import admin
from django.urls import include, path
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.routers import DefaultRouter, SimpleRouter

from venues.views import CityListView, VenueFeedViewSet, VenueViewSet


venue_router = DefaultRouter()
venue_router.register("venues", VenueViewSet, basename="venue")

feed_router = SimpleRouter()
feed_router.register("feed", VenueFeedViewSet, basename="venue-feed")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls")),
    path("api/token/", obtain_auth_token, name="api-token"),
    path("api/cities/", CityListView.as_view(), name="city-list"),
    path("api/", include(venue_router.urls)),
    path("api/", include(feed_router.urls)),
]
