import base64
from datetime import date
from decimal import Decimal
from unittest.mock import patch

from django.contrib.auth.models import User
from django.test import override_settings
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from .models import Venue
from .seed_data import EXTRA_VENUES
from .views import _send_enquiry_sms


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
        anonymous_response = self.client.get("/api/v1/venues/")
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
            "/api/v1/venues/",
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
        session_response = self.client.get("/api/v1/venues/")
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
        valid_response = self.client.get("/api/v1/venues/")
        self.assertEqual(valid_response.status_code, status.HTTP_200_OK)

        self.client.credentials(HTTP_AUTHORIZATION="Token invalid-token")
        invalid_response = self.client.get("/api/v1/venues/")
        self.assertEqual(
            invalid_response.status_code,
            status.HTTP_401_UNAUTHORIZED,
        )

    def test_owner_is_assigned_by_server_and_controls_writes(self):
        self.client.force_authenticate(user=self.asha)
        created = self.client.post(
            "/api/v1/venues/",
            valid_venue_data(owner=self.bhavin.pk),
            format="json",
        )
        self.assertEqual(created.status_code, status.HTTP_201_CREATED)
        created_venue = Venue.objects.get(pk=created.data["id"])
        self.assertEqual(created_venue.owner, self.asha)
        self.assertEqual(created.data["owner"], self.asha.pk)

        detail_url = f"/api/v1/venues/{self.owned_venue.pk}/"
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
        detail_url = f"/api/v1/venues/{self.owned_venue.pk}/"

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


class VersionedVenueApiTests(APITestCase):
    @classmethod
    def setUpTestData(cls):
        for venue_data in EXTRA_VENUES:
            Venue.objects.create(**venue_data)
        cls.venue = Venue.objects.get(pk=1)
        cls.user = User.objects.get(username="asha_organiser")

    def setUp(self):
        self.client.force_authenticate(user=self.user)

    def test_v1_omits_price_per_guest_and_v2_calculates_it(self):
        v1_response = self.client.get("/api/v1/venues/")
        self.assertEqual(v1_response.status_code, status.HTTP_200_OK)
        v1_venue = next(
            item
            for item in v1_response.data["results"]
            if item["id"] == self.venue.pk
        )
        self.assertNotIn("price_per_guest", v1_venue)

        v2_response = self.client.get("/api/v2/venues/")
        self.assertEqual(v2_response.status_code, status.HTTP_200_OK)
        v2_venue = next(
            item
            for item in v2_response.data["results"]
            if item["id"] == self.venue.pk
        )
        expected = (
            self.venue.price_per_day / self.venue.capacity
        ).quantize(Decimal("0.01"))
        self.assertEqual(
            Decimal(str(v2_venue["price_per_guest"])),
            expected,
        )

    def test_v3_and_old_unversioned_venue_route_are_not_available(self):
        for url in ("/api/v3/venues/", "/api/venues/"):
            with self.subTest(url=url):
                response = self.client.get(url)
                self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
                if url == "/api/v3/venues/":
                    self.assertEqual(response.data["success"], False)
                    self.assertEqual(response.data["status_code"], 404)

    def test_api_errors_preserve_status_and_original_data(self):
        missing = self.client.get("/api/v1/venues/999999/")
        self.assertEqual(missing.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(missing.data["success"], False)
        self.assertEqual(missing.data["status_code"], 404)
        self.assertIn("detail", missing.data["errors"])

        too_small = valid_venue_data(capacity=5)
        invalid = self.client.post(
            "/api/v1/venues/",
            too_small,
            format="json",
        )
        self.assertEqual(invalid.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(invalid.data["success"], False)
        self.assertEqual(invalid.data["status_code"], 400)
        self.assertIn("capacity", invalid.data["errors"])

        self.client.force_authenticate(user=None)
        anonymous = self.client.get("/api/v1/venues/")
        self.assertEqual(
            anonymous.status_code,
            status.HTTP_401_UNAUTHORIZED,
        )
        self.assertEqual(anonymous.data["success"], False)
        self.assertEqual(anonymous.data["status_code"], 401)


class EnquiryApiTests(APITestCase):
    @classmethod
    def setUpTestData(cls):
        for venue_data in EXTRA_VENUES:
            Venue.objects.create(**venue_data)
        cls.venue = Venue.objects.get(pk=1)

    def enquiry_data(self, **overrides):
        data = {
            "venue_id": self.venue.pk,
            "name": "Alex Customer",
            "email": "alex@example.com",
            "phone": "+15551234567",
            "event_date": date(2027, 5, 12).isoformat(),
        }
        data.update(overrides)
        return data

    @override_settings(
        TWILIO_ACCOUNT_SID="test-account",
        TWILIO_AUTH_TOKEN="test-auth-token",
        TWILIO_FROM_NUMBER="+15550000001",
        TWILIO_VERIFIED_NUMBER="+15550000002",
    )
    @patch("twilio.rest.Client")
    def test_sms_uses_only_the_configured_verified_trial_number(
        self,
        client_class,
    ):
        _send_enquiry_sms(
            self.venue,
            {
                "event_date": date(2027, 5, 12),
                "phone": "+15559999999",
            },
        )

        client_class.return_value.messages.create.assert_called_once()
        sms_arguments = (
            client_class.return_value.messages.create.call_args.kwargs
        )
        self.assertEqual(sms_arguments["to"], "+15550000002")

    @patch("venues.views._send_enquiry_sms")
    @patch("venues.views.send_mail")
    def test_valid_enquiry_sends_confirmation_and_returns_created(
        self,
        send_mail_mock,
        send_sms_mock,
    ):
        response = self.client.post(
            "/api/v1/enquiries/",
            self.enquiry_data(),
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(
            response.data,
            {"success": True, "message": "Enquiry received"},
        )
        send_mail_mock.assert_called_once()
        send_sms_mock.assert_called_once()

    @patch("venues.views._send_enquiry_sms")
    @patch("venues.views.send_mail")
    def test_invalid_email_returns_wrapped_validation_error(
        self,
        send_mail_mock,
        send_sms_mock,
    ):
        response = self.client.post(
            "/api/v1/enquiries/",
            self.enquiry_data(email="not-an-email"),
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["success"], False)
        self.assertEqual(response.data["status_code"], 400)
        self.assertIn("email", response.data["errors"])
        send_mail_mock.assert_not_called()
        send_sms_mock.assert_not_called()
