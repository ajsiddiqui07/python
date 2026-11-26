import getpass
import json
import os
from urllib.error import HTTPError
from urllib.parse import urlencode
from urllib.request import Request, urlopen


base_url = os.environ.get(
    "VENUE_BOOKER_BASE_URL",
    "http://127.0.0.1:8000",
).rstrip("/")
username = os.environ.get("VENUE_BOOKER_USERNAME", "asha_organiser")
password = os.environ.get("VENUE_BOOKER_PASSWORD")
if password is None:
    password = getpass.getpass(f"Password for {username}: ")

token_request = Request(
    f"{base_url}/api/token/",
    data=urlencode(
        {"username": username, "password": password}
    ).encode(),
)
with urlopen(token_request) as response:
    token = json.load(response)["token"]

venues_request = Request(
    f"{base_url}/api/venues/",
    headers={"Authorization": f"Token {token}"},
)
with urlopen(venues_request) as response:
    print("valid token:", response.status)

wrong_token_request = Request(
    f"{base_url}/api/venues/",
    headers={"Authorization": "Token invalid-token"},
)
try:
    with urlopen(wrong_token_request) as response:
        print("wrong token:", response.status)
except HTTPError as error:
    print("wrong token:", error.code)
