from decimal import Decimal
from unittest.mock import Mock, patch

import requests
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Venue


def mock_response(status_code, payload):
    response = Mock()
    response.status_code = status_code
    response.json.return_value = payload
    return response


class ExternalServiceViewTests(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.organiser = User.objects.get(username="asha_organiser")
        cls.outdoor_venue = Venue.objects.create(
            name="Outdoor Test Venue",
            city="Mumbai",
            venue_type="LAWN",
            capacity=200,
            price_per_day="40000.00",
            is_outdoor=True,
            owner=cls.organiser,
        )
        cls.indoor_venue = Venue.objects.create(
            name="Indoor Test Venue",
            city="Mumbai",
            venue_type="HALL",
            capacity=200,
            price_per_day="40000.00",
            is_outdoor=False,
            owner=cls.organiser,
        )
        cls.unknown_city_venue = Venue.objects.create(
            name="Unknown City Venue",
            city="Xyzabad",
            venue_type="HALL",
            capacity=200,
            price_per_day="40000.00",
            is_outdoor=False,
            owner=cls.organiser,
        )

    def setUp(self):
        self.client.force_authenticate(user=self.organiser)

    @patch("venues.views.requests.get")
    def test_outdoor_venue_is_not_outdoor_safe_in_rain(self, get):
        get.return_value = mock_response(
            200,
            {
                "main": {"temp": 24.5},
                "weather": [{"main": "Rain"}],
            },
        )

        response = self.client.get(
            f"/api/venue-weather/{self.outdoor_venue.pk}/"
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["venue"], "Outdoor Test Venue")
        self.assertEqual(response.data["city"], "Mumbai")
        self.assertEqual(response.data["temp_c"], 24.5)
        self.assertEqual(response.data["condition"], "Rain")
        self.assertFalse(response.data["outdoor_ok"])
        self.assertEqual(get.call_args.kwargs["timeout"], 5)
        self.assertEqual(get.call_args.kwargs["params"]["units"], "metric")

    @patch("venues.views.requests.get")
    def test_indoor_venue_is_safe_in_rain(self, get):
        get.return_value = mock_response(
            200,
            {
                "main": {"temp": 24.5},
                "weather": [{"main": "Rain"}],
            },
        )

        response = self.client.get(
            f"/api/venue-weather/{self.indoor_venue.pk}/"
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data["outdoor_ok"])

    @patch("venues.views.requests.get")
    def test_weather_errors_and_missing_venue(self, get):
        missing_venue = self.client.get("/api/venue-weather/9999/")
        self.assertEqual(missing_venue.status_code, status.HTTP_404_NOT_FOUND)
        get.assert_not_called()

        get.return_value = mock_response(404, {})
        unknown_city = self.client.get(
            f"/api/venue-weather/{self.unknown_city_venue.pk}/"
        )
        self.assertEqual(unknown_city.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(unknown_city.data, {"detail": "City not found"})

        get.return_value = mock_response(401, {})
        wrong_key = self.client.get(
            f"/api/venue-weather/{self.outdoor_venue.pk}/"
        )
        self.assertEqual(
            wrong_key.status_code,
            status.HTTP_503_SERVICE_UNAVAILABLE,
        )
        self.assertEqual(
            wrong_key.data,
            {"detail": "Weather service unavailable"},
        )

    @patch("venues.views.requests.get")
    def test_weather_request_exception_returns_503(self, get):
        get.side_effect = requests.exceptions.Timeout

        response = self.client.get(
            f"/api/venue-weather/{self.outdoor_venue.pk}/"
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_503_SERVICE_UNAVAILABLE,
        )

    @patch("venues.views.requests.get")
    def test_github_profile_and_missing_user(self, get):
        get.return_value = mock_response(
            200,
            {
                "login": "ajsiddiqui07",
                "public_repos": 12,
                "followers": 34,
            },
        )
        own_profile = self.client.get("/api/github/ajsiddiqui07/")
        self.assertEqual(own_profile.status_code, status.HTTP_200_OK)
        self.assertEqual(
            own_profile.data,
            {
                "login": "ajsiddiqui07",
                "public_repos": 12,
                "followers": 34,
            },
        )

        get.return_value = mock_response(404, {})
        missing_profile = self.client.get(
            "/api/github/no-such-user-venue-7788/"
        )
        self.assertEqual(
            missing_profile.status_code,
            status.HTTP_404_NOT_FOUND,
        )
        self.assertEqual(
            missing_profile.data,
            {"detail": "GitHub user not found"},
        )

    @patch("venues.views.requests.post")
    def test_price_hint_for_200_outdoor_guests(self, post):
        post.return_value = mock_response(200, {"suggestion": 35000})

        response = self.client.get(
            f"/api/price-hint/{self.outdoor_venue.pk}/"
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["current_price"], Decimal("40000.00"))
        self.assertEqual(response.data["suggestion"], Decimal("35000"))
        self.assertEqual(response.data["difference"], Decimal("-5000.00"))
        self.assertEqual(
            post.call_args.kwargs["json"],
            {"capacity": 200, "is_outdoor": True},
        )
        self.assertEqual(post.call_args.kwargs["timeout"], 5)

    @patch("venues.views.requests.post")
    def test_price_hint_returns_503_when_fastapi_is_unavailable(self, post):
        post.side_effect = requests.exceptions.ConnectionError

        response = self.client.get(
            f"/api/price-hint/{self.outdoor_venue.pk}/"
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_503_SERVICE_UNAVAILABLE,
        )
        self.assertEqual(
            response.data,
            {"detail": "Price service unavailable"},
        )
