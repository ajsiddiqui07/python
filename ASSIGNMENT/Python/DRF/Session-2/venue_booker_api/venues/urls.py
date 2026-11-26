from django.urls import path

from .views import VenueDetailView, VenueListCreateView


urlpatterns = [
    path("venues/", VenueListCreateView.as_view(), name="venue-list-create"),
    path("venues/<int:pk>/", VenueDetailView.as_view(), name="venue-detail"),
]
