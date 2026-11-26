from django.urls import path

from .views import CityListView, OrganiserListView


urlpatterns = [
    path("cities/", CityListView.as_view(), name="city-list"),
    path("organisers/", OrganiserListView.as_view(), name="organiser-list"),
]
