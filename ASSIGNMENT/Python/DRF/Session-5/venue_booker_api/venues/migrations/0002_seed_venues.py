from decimal import Decimal

from django.db import migrations


VENUES = [
    {
        "name": "Harbourlight Grand Hall",
        "city": "Mumbai",
        "venue_type": "HALL",
        "capacity": 350,
        "price_per_day": Decimal("85000.00"),
        "is_outdoor": False,
    },
    {
        "name": "Pink City Garden Lawn",
        "city": "Jaipur",
        "venue_type": "LAWN",
        "capacity": 500,
        "price_per_day": Decimal("65000.00"),
        "is_outdoor": True,
    },
    {
        "name": "Mysuru Terrace Pavilion",
        "city": "Bengaluru",
        "venue_type": "TERRACE",
        "capacity": 120,
        "price_per_day": Decimal("42000.00"),
        "is_outdoor": True,
    },
    {
        "name": "Marina Celebration Hall",
        "city": "Chennai",
        "venue_type": "HALL",
        "capacity": 250,
        "price_per_day": Decimal("70000.00"),
        "is_outdoor": False,
    },
    {
        "name": "Lakeview Green Lawn",
        "city": "Udaipur",
        "venue_type": "LAWN",
        "capacity": 400,
        "price_per_day": Decimal("90000.00"),
        "is_outdoor": True,
    },
    {
        "name": "Nizam Courtyard Terrace",
        "city": "Hyderabad",
        "venue_type": "TERRACE",
        "capacity": 180,
        "price_per_day": Decimal("55000.00"),
        "is_outdoor": True,
    },
]


def seed_venues(apps, schema_editor):
    venue_model = apps.get_model("venues", "Venue")
    venue_model.objects.bulk_create(
        [venue_model(**venue_data) for venue_data in VENUES]
    )


def remove_seeded_venues(apps, schema_editor):
    venue_model = apps.get_model("venues", "Venue")
    venue_model.objects.filter(
        name__in=[venue_data["name"] for venue_data in VENUES]
    ).delete()


class Migration(migrations.Migration):
    dependencies = [
        ("venues", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(seed_venues, remove_seeded_venues),
    ]
