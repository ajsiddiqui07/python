from django.db import models


class Venue(models.Model):
    class VenueType(models.TextChoices):
        HALL = "HALL", "Hall"
        LAWN = "LAWN", "Lawn"
        TERRACE = "TERRACE", "Terrace"

    name = models.CharField(max_length=150)
    city = models.CharField(max_length=100)
    venue_type = models.CharField(max_length=10, choices=VenueType.choices)
    capacity = models.PositiveIntegerField()
    price_per_day = models.DecimalField(max_digits=10, decimal_places=2)
    is_outdoor = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.city})"
