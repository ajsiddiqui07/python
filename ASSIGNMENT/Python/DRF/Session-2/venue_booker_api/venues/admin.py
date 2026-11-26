from django.contrib import admin

from .models import Venue


@admin.register(Venue)
class VenueAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "city",
        "venue_type",
        "capacity",
        "price_per_day",
        "is_outdoor",
    )
    list_filter = ("city", "venue_type", "is_outdoor")
    search_fields = ("name", "city")
