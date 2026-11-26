# Venue Booker API — Session 2

This project contains a Django REST Framework CRUD API and a FastAPI API for
venues in Indian cities.

## Setup

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python manage.py makemigrations venues
python manage.py migrate
python manage.py createsuperuser
```

The venue data migration adds six venues, which are available in Django admin
after migration.

Run Django locally with `python manage.py runserver`. The admin is at
`http://127.0.0.1:8000/admin/`; CRUD endpoints are:

- `GET` / `POST` `http://127.0.0.1:8000/api/venues/`
- `GET` / `PUT` / `PATCH` / `DELETE`
  `http://127.0.0.1:8000/api/venues/<id>/`

Run FastAPI locally from `venue_fastapi`:

```powershell
uvicorn main:app --port 8001 --reload
```

Its `/venues` endpoint supports `GET` and `POST`; interactive documentation is
at `http://127.0.0.1:8001/docs`.
