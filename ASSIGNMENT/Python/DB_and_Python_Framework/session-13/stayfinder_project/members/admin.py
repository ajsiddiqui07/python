"""Admin registration for members app."""

from django.contrib import admin
from .models import Profile


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    """Admin configuration for user profiles."""

    list_display = ('user', 'full_name', 'phone')
