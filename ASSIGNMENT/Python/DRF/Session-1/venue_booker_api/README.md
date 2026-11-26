# Venue Booker API

Lotus Lantern Venues operates in six Indian cities. The project includes a
Django REST Framework API for cities and organisers, plus a small FastAPI app.

## Setup

From this directory, create and activate a virtual environment, then install
the dependencies:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
```

The organiser migration creates `asha_organiser`, `ravi_organiser`, and
`meera_organiser` with unusable passwords. They are visible in Django admin
and can be managed there. The organiser API exposes only each user's `id` and
`username`.

Run Django locally:

```powershell
python manage.py runserver
```

Endpoints:

- `http://127.0.0.1:8000/api/cities/?format=json`
- `http://127.0.0.1:8000/api/organisers/?format=json`
- `http://127.0.0.1:8000/admin/`

## FastAPI

Run from the `venue_fastapi` directory:

```powershell
uvicorn main:app --port 8001 --reload
```

Open `http://127.0.0.1:8001/docs` for the interactive API documentation, or
request `http://127.0.0.1:8001/cities`. The server binds to localhost by
default and is intended for local use only.
