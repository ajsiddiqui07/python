from urllib.parse import urlsplit

from rest_framework import status
from rest_framework.test import APITestCase

from .models import Venue
from .seed_data import EXTRA_VENUES
from .serializers import VenueSerializer


def valid_venue_data(**overrides):
    data = {
        "name": "Test Celebration Hall",
        "city": "Pune",
        "venue_type": "HALL",
        "capacity": 120,
        "price_per_day": "25000.00",
        "is_outdoor": False,
    }
    data.update(overrides)
    return data


class VenueApiTests(APITestCase):
    @classmethod
    def setUpTestData(cls):
        for venue_data in EXTRA_VENUES:
            Venue.objects.create(**venue_data)

    def test_api_root_lists_router_resources(self):
        response = self.client.get("/api/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("venues", response.data)

    def test_model_viewset_crud_actions(self):
        list_response = self.client.get("/api/venues/")
        self.assertEqual(list_response.status_code, status.HTTP_200_OK)
        self.assertEqual(list_response.data["count"], 20)
        self.assertEqual(len(list_response.data["results"]), 5)

        detail_url = "/api/venues/1/"
        self.assertEqual(
            self.client.get(detail_url).status_code,
            status.HTTP_200_OK,
        )

        invalid = self.client.post(
            "/api/venues/",
            valid_venue_data(capacity=5),
            format="json",
        )
        self.assertEqual(invalid.status_code, status.HTTP_400_BAD_REQUEST)

        created = self.client.post(
            "/api/venues/",
            valid_venue_data(),
            format="json",
        )
        self.assertEqual(created.status_code, status.HTTP_201_CREATED)

        updated = self.client.put(
            detail_url,
            valid_venue_data(name="Updated Venue"),
            format="json",
        )
        self.assertEqual(updated.status_code, status.HTTP_200_OK)
        self.assertEqual(updated.data["name"], "Updated Venue")

        patched = self.client.patch(
            detail_url,
            {"capacity": 160},
            format="json",
        )
        self.assertEqual(patched.status_code, status.HTTP_200_OK)
        self.assertEqual(patched.data["capacity"], 160)

        self.assertEqual(
            self.client.delete(detail_url).status_code,
            status.HTTP_204_NO_CONTENT,
        )
        self.assertEqual(
            self.client.get(detail_url).status_code,
            status.HTTP_404_NOT_FOUND,
        )

    def test_limit_offset_search_ordering_and_max_limit(self):
        response = self.client.get(
            "/api/venues/?search=Jaipur&ordering=-capacity&limit=3&offset=3"
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["count"], 4)
        self.assertEqual(
            [venue["capacity"] for venue in response.data["results"]],
            [190],
        )

        Venue.objects.create(**valid_venue_data(name="Twenty-first Venue"))
        max_limit = self.client.get("/api/venues/?limit=50")
        self.assertEqual(max_limit.status_code, status.HTTP_200_OK)
        self.assertEqual(len(max_limit.data["results"]), 20)
        self.assertEqual(max_limit.data["count"], 21)

    def test_feed_follows_cursor_pages_to_the_end(self):
        page = self.client.get("/api/feed/")
        self.assertEqual(page.status_code, status.HTTP_200_OK)

        venues = []
        page_sizes = []
        while True:
            venues.extend(page.data["results"])
            page_sizes.append(len(page.data["results"]))
            next_url = page.data["next"]
            if next_url is None:
                break

            parts = urlsplit(next_url)
            page = self.client.get(f"{parts.path}?{parts.query}")
            self.assertEqual(page.status_code, status.HTTP_200_OK)

        self.assertEqual(len(venues), 20)
        self.assertEqual(page_sizes, [4, 4, 4, 4, 4])
        self.assertEqual(
            len({venue["id"] for venue in venues}),
            20,
        )
        timestamps = [
            Venue.objects.get(pk=venue["id"]).created_at
            for venue in venues
        ]
        self.assertEqual(timestamps, sorted(timestamps, reverse=True))

class VenueSerializerTests(APITestCase):
    def test_capacity_and_price_validation(self):
        self.assertFalse(
            VenueSerializer(data=valid_venue_data(capacity=5)).is_valid()
        )
        self.assertFalse(
            VenueSerializer(
                data=valid_venue_data(price_per_day="0")
            ).is_valid()
        )
        self.assertTrue(VenueSerializer(data=valid_venue_data()).is_valid())
