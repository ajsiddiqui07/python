# Venue Booker API — Session 5

The Django REST Framework API uses Basic, Session, and Token authentication.
Venue changes are restricted to the owner, and deleting venues is restricted
to administrators. It also integrates OpenWeatherMap, GitHub's public profile
API, and a local FastAPI price-hint service.

## Setup

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python manage.py migrate
python manage.py shell -c "exec(open('seed_extra_venues.py').read())"
python manage.py createsuperuser
```

Migrations create six venues and the organiser accounts
`asha_organiser` and `bhavin_organiser`. Their passwords are unusable until you
set them; for example, run `python manage.py changepassword asha_organiser`
and `python manage.py changepassword bhavin_organiser`. The shell command adds
fourteen more venues across five Indian cities and is safe to rerun.

Set your OpenWeatherMap key in the git-ignored `local_secrets.py`:

```python
OPENWEATHER_API_KEY = "your-key"
```

Without a valid key, weather requests return 503. Set organiser passwords with
`python manage.py changepassword asha_organiser` and
`python manage.py changepassword bhavin_organiser` before token/session login.

Run Django locally with `python manage.py runserver`. The admin is at
`http://127.0.0.1:8000/admin/`; router root at `http://127.0.0.1:8000/api/`;
and the DRF login page at `http://127.0.0.1:8000/api-auth/login/`.

Endpoints:

- `GET` / `POST` `http://127.0.0.1:8000/api/venues/`
- `GET` / `PUT` / `PATCH` / `DELETE` `http://127.0.0.1:8000/api/venues/<id>/`
- `GET` `http://127.0.0.1:8000/api/feed/`
- Public `GET` `http://127.0.0.1:8000/api/cities/`
- Weather `GET` `http://127.0.0.1:8000/api/venue-weather/<id>/`
- GitHub profile `GET` `http://127.0.0.1:8000/api/github/ajsiddiqui07/`
- Price hint `GET` `http://127.0.0.1:8000/api/price-hint/<id>/`
- Token login `POST` `http://127.0.0.1:8000/api/token/`

List filters include `search`, `ordering`, `limit`, and `offset`. For example:
`/api/venues/?search=Jaipur&ordering=-capacity&limit=3&offset=3`.

After setting Asha's password, run `python token_check.py` to verify a valid
token (200) and an invalid token (401). The script prompts for the password;
it can also read `VENUE_BOOKER_PASSWORD` from the environment.

Run FastAPI locally from `venue_fastapi`:

```powershell
uvicorn main:app --port 8001 --reload
```

Its `/venues` endpoint supports `GET` and `POST`; `/price-hint` accepts
`capacity` and `is_outdoor`. For example, 200 outdoor guests suggests ₹35,000.
Interactive documentation is at `http://127.0.0.1:8001/docs`.
