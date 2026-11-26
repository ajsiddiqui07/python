# Venue Booker API — Session 4

The Django REST Framework API uses Basic, Session, and Token authentication.
Venue changes are restricted to the owner, and deleting venues is restricted
to administrators. The city list remains public.

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

Run Django locally with `python manage.py runserver`. The admin is at
`http://127.0.0.1:8000/admin/`; router root at `http://127.0.0.1:8000/api/`;
and the DRF login page at `http://127.0.0.1:8000/api-auth/login/`.

Endpoints:

- `GET` / `POST` `http://127.0.0.1:8000/api/venues/`
- `GET` / `PUT` / `PATCH` / `DELETE` `http://127.0.0.1:8000/api/venues/<id>/`
- `GET` `http://127.0.0.1:8000/api/feed/`
- Public `GET` `http://127.0.0.1:8000/api/cities/`
- Token login `POST` `http://127.0.0.1:8000/api/token/`

List filters include `search`, `ordering`, `limit`, and `offset`. For example:
`/api/venues/?search=Jaipur&ordering=-capacity&limit=3&offset=3`.

After setting Asha's password, run `python token_check.py` to verify a valid
token (200) and an invalid token (401). The script prompts for the password;
it can also read `VENUE_BOOKER_PASSWORD` from the environment.

Run FastAPI locally from `venue_fastapi` with
`uvicorn main:app --port 8001 --reload`; docs are at
`http://127.0.0.1:8001/docs`.

Run FastAPI locally from `venue_fastapi`:

```powershell
uvicorn main:app --port 8001 --reload
```

Its `/venues` endpoint supports `GET` and `POST`; interactive documentation is
at `http://127.0.0.1:8001/docs`.
