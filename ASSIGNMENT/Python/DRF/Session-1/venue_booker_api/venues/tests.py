from rest_framework.test import APITestCase


class CityListViewTests(APITestCase):
    def test_returns_six_valid_city_records(self):
        response = self.client.get("/api/cities/?format=json")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 6)
        for city in response.data:
            self.assertEqual(
                set(city),
                {"name", "state", "venue_count"},
            )
            self.assertGreaterEqual(city["venue_count"], 3)
            self.assertLessEqual(city["venue_count"], 40)


class OrganiserListViewTests(APITestCase):
    def test_returns_only_safe_organiser_fields(self):
        response = self.client.get("/api/organisers/?format=json")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 3)
        self.assertEqual(
            {organiser["username"] for organiser in response.data},
            {"asha_organiser", "ravi_organiser", "meera_organiser"},
        )
        self.assertTrue(
            all(
                set(organiser) == {"id", "username"}
                for organiser in response.data
            )
        )
