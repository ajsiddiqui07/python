"""Admin configuration for Locality and PG models."""

from django.contrib import admin
from .models import Locality, PG


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
