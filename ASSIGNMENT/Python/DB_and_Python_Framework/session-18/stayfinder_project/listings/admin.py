"""Admin configuration for Locality and PG models."""

from django.contrib import admin
from .models import Booking, Locality, PG


@admin.register(Locality)
class LocalityAdmin(admin.ModelAdmin):
    """Admin interface configuration for Locality."""

    list_display = ('name', 'city')
    search_fields = ('name', 'city')


@admin.register(PG)
class PGAdmin(admin.ModelAdmin):
    """Admin interface configuration for PG."""

    list_display = (
        'name',
        'locality',
        'monthly_rent',
        'gender_type',
        'available_beds',
        'rent_band',
    )
    ordering = ('monthly_rent',)
    search_fields = ('name', 'locality__name')
    list_filter = ('gender_type', 'locality')

    @admin.display(description='Rent band')
    def rent_band(self, obj):
        """Return Budget, Standard, or Premium based on monthly rent."""
        if obj.monthly_rent < 6000:
            return 'Budget'
        if obj.monthly_rent < 10000:
            return 'Standard'
        return 'Premium'


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    """Admin interface configuration for Booking."""

    list_display = ('id', 'tenant', 'pg', 'token_amount', 'status', 'created_at')
    list_filter = ('status',)
