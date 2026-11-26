from venues.models import Venue
from venues.seed_data import EXTRA_VENUES


for venue_data in EXTRA_VENUES:
    if not Venue.objects.filter(name=venue_data["name"]).exists():
        Venue.objects.create(**venue_data)
