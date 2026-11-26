# Venue Booker API — Session 3

This project contains a Django REST Framework venue API with router-based
CRUD, search, ordering, limit-offset pagination, and a cursor-paginated feed.
It also includes the FastAPI API from the earlier sessions.

## Setup

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python manage.py migrate
python manage.py shell -c "exec(open('seed_extra_venues.py').read())"
python manage.py createsuperuser
```

The migration adds six venues. The shell command creates fourteen more venues
across five Indian cities; the script can be rerun safely.

Run Django locally with `python manage.py runserver`. The admin is at
`http://127.0.0.1:8000/admin/`. The `DefaultRouter` API root is at
`http://127.0.0.1:8000/api/`. Venue routes:

- `GET` / `POST` `http://127.0.0.1:8000/api/venues/`
- `GET` / `PUT` / `PATCH` / `DELETE` `http://127.0.0.1:8000/api/venues/<id>/`
- `GET` `http://127.0.0.1:8000/api/feed/`

List filters include `search`, `ordering`, `limit`, and `offset`. For example:
`/api/venues/?search=Jaipur&ordering=-capacity&limit=3&offset=3`.

Run FastAPI locally from `venue_fastapi`:

```powershell
uvicorn main:app --port 8001 --reload
```

Its `/venues` endpoint supports `GET` and `POST`; interactive documentation is
at `http://127.0.0.1:8001/docs`.
