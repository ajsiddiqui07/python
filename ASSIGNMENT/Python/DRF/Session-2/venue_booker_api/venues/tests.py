from rest_framework import status
from rest_framework.test import APITestCase

from .models import Venue
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


class VenueApiTests(APITestCase):
    def test_list_create_and_validation(self):
        response = self.client.get("/api/venues/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 6)

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

    def test_detail_update_patch_delete_and_missing_ids(self):
        venue = Venue.objects.get(pk=1)
        detail_url = f"/api/venues/{venue.pk}/"
        missing_url = "/api/venues/9999/"

        self.assertEqual(
            self.client.get(detail_url).status_code,
            status.HTTP_200_OK,
        )
        self.assertEqual(
            self.client.get(missing_url).status_code,
            status.HTTP_404_NOT_FOUND,
        )

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

        deleted = self.client.delete(detail_url)
        self.assertEqual(
            deleted.status_code,
            status.HTTP_204_NO_CONTENT,
        )
        self.assertEqual(
            self.client.delete(missing_url).status_code,
            status.HTTP_404_NOT_FOUND,
        )
