import base64

from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from .models import Venue
from .seed_data import EXTRA_VENUES


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


class VenueAuthenticationTests(APITestCase):
    @classmethod
    def setUpTestData(cls):
        for venue_data in EXTRA_VENUES:
            Venue.objects.create(**venue_data)

        cls.asha = User.objects.get(username="asha_organiser")
        cls.asha.set_password("test-asha-password")
        cls.asha.save(update_fields=["password"])

        cls.bhavin = User.objects.get(username="bhavin_organiser")
        cls.bhavin.set_password("test-bhavin-password")
        cls.bhavin.save(update_fields=["password"])

        cls.owned_venue = Venue.objects.get(pk=1)
        cls.owned_venue.owner = cls.asha
        cls.owned_venue.save(update_fields=["owner"])

    def test_authentication_and_public_cities(self):
        anonymous_response = self.client.get("/api/venues/")
        self.assertEqual(
            anonymous_response.status_code,
            status.HTTP_401_UNAUTHORIZED,
        )

        cities_response = self.client.get("/api/cities/")
        self.assertEqual(cities_response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(cities_response.data), 6)

        basic_credentials = base64.b64encode(
            b"asha_organiser:test-asha-password"
        ).decode()
        basic_response = self.client.get(
            "/api/venues/",
            HTTP_AUTHORIZATION=f"Basic {basic_credentials}",
        )
        self.assertEqual(basic_response.status_code, status.HTTP_200_OK)

        login_response = self.client.post(
            "/api-auth/login/",
            {
                "username": "asha_organiser",
                "password": "test-asha-password",
            },
        )
        self.assertEqual(login_response.status_code, status.HTTP_302_FOUND)
        session_response = self.client.get("/api/venues/")
        self.assertEqual(session_response.status_code, status.HTTP_200_OK)

    def test_token_login_and_invalid_token(self):
        token_response = self.client.post(
            "/api/token/",
            {
                "username": "asha_organiser",
                "password": "test-asha-password",
            },
        )
        self.assertEqual(token_response.status_code, status.HTTP_200_OK)
        token = token_response.data["token"]
        self.assertTrue(Token.objects.filter(key=token, user=self.asha).exists())

        self.client.credentials(HTTP_AUTHORIZATION=f"Token {token}")
        valid_response = self.client.get("/api/venues/")
        self.assertEqual(valid_response.status_code, status.HTTP_200_OK)

        self.client.credentials(HTTP_AUTHORIZATION="Token invalid-token")
        invalid_response = self.client.get("/api/venues/")
        self.assertEqual(
            invalid_response.status_code,
            status.HTTP_401_UNAUTHORIZED,
        )

    def test_owner_is_assigned_by_server_and_controls_writes(self):
        self.client.force_authenticate(user=self.asha)
        created = self.client.post(
            "/api/venues/",
            valid_venue_data(owner=self.bhavin.pk),
            format="json",
        )
        self.assertEqual(created.status_code, status.HTTP_201_CREATED)
        created_venue = Venue.objects.get(pk=created.data["id"])
        self.assertEqual(created_venue.owner, self.asha)
        self.assertEqual(created.data["owner"], self.asha.pk)

        detail_url = f"/api/venues/{self.owned_venue.pk}/"
        self.client.force_authenticate(user=self.bhavin)
        denied_update = self.client.put(
            detail_url,
            valid_venue_data(name="Bhavin edit"),
            format="json",
        )
        self.assertEqual(
            denied_update.status_code,
            status.HTTP_403_FORBIDDEN,
        )

        self.client.force_authenticate(user=self.asha)
        owner_update = self.client.put(
            detail_url,
            valid_venue_data(name="Asha edit"),
            format="json",
        )
        self.assertEqual(owner_update.status_code, status.HTTP_200_OK)

    def test_delete_is_admin_only(self):
        detail_url = f"/api/venues/{self.owned_venue.pk}/"

        anonymous_delete = self.client.delete(detail_url)
        self.assertEqual(
            anonymous_delete.status_code,
            status.HTTP_401_UNAUTHORIZED,
        )

        self.client.force_authenticate(user=self.asha)
        owner_delete = self.client.delete(detail_url)
        self.assertEqual(
            owner_delete.status_code,
            status.HTTP_403_FORBIDDEN,
        )

        administrator = User.objects.create_superuser(
            username="venue_admin",
            email="venue-admin@example.com",
            password="test-admin-password",
        )
        self.client.force_authenticate(user=administrator)
        admin_delete = self.client.delete(detail_url)
        self.assertEqual(
            admin_delete.status_code,
            status.HTTP_204_NO_CONTENT,
        )
