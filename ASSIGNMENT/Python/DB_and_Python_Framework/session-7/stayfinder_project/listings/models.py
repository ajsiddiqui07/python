"""Database models for StayFinder PG and locality listings."""

from django.db import models


class Locality(models.Model):
    """Represents a neighborhood/locality within a city."""

    name = models.CharField(max_length=60)
    city = models.CharField(max_length=40)

    class Meta:
        verbose_name_plural = 'Localities'

    def __str__(self):
        return f'{self.name}, {self.city}'


class PG(models.Model):
    """Represents a paying guest accommodation or hostel."""

    GENDER_CHOICES = [
        ('Boys', 'Boys'),
        ('Girls', 'Girls'),
        ('Any', 'Any'),
    ]

    name = models.CharField(max_length=80)
    locality = models.ForeignKey(Locality, on_delete=models.CASCADE)
    monthly_rent = models.PositiveIntegerField()
    gender_type = models.CharField(max_length=10, choices=GENDER_CHOICES)
    available_beds = models.PositiveSmallIntegerField()

    def __str__(self):
        return self.name
