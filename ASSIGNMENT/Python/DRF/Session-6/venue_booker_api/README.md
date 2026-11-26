# Venue Booker API — Session 6

This Django REST Framework project exposes versioned venue endpoints, wraps
DRF errors in a consistent response, and accepts venue enquiries.

## Local setup

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python manage.py migrate
python manage.py shell -c "exec(open('seed_extra_venues.py').read())"
python manage.py createsuperuser
python manage.py runserver
```

The migrations create sample venues and organiser accounts. Set an organiser's
password with `python manage.py changepassword asha_organiser`.

## API

- `GET`, `POST` `/api/v1/venues/`
- `GET`, `PUT`, `PATCH`, `DELETE` `/api/v1/venues/<id>/`
- The v2 venue responses additionally include read-only `price_per_guest`.
- `/api/v3/venues/` is unsupported and returns 404.
- `POST` `/api/v1/enquiries/` accepts `venue_id`, `name`, `email`, `phone`,
  and `event_date` (`YYYY-MM-DD`).
- `POST` `/api/token/` obtains an authentication token.

Venue endpoints require authentication. Enquiry requests are public. API
exceptions return `success`, `status_code`, and the original `errors` data.
Email confirmation uses Django's console email backend.

To enable trial SMS, set `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`,
`TWILIO_FROM_NUMBER`, and `TWILIO_VERIFIED_NUMBER` in the environment. The
destination is always the configured verified trial number, never the phone
number submitted with an enquiry. Do not commit credentials.

Run tests with `python manage.py test venues`.

## PythonAnywhere deployment checklist

In a PythonAnywhere Bash console, clone this repository, create/activate a
virtual environment, install `requirements.txt`, then run:

```bash
python manage.py migrate
python manage.py collectstatic --noinput
python manage.py createsuperuser
```

Set `DJANGO_SECRET_KEY`, `DEBUG=False`, and `ALLOWED_HOSTS` (including the
PythonAnywhere hostname) in the web app's WSGI environment, configure the
virtualenv and static-files mapping in the Web tab, then reload the app.
Configure Twilio environment variables only if trial SMS is needed. After
deployment, use Postman to obtain a token from `/api/token/`, check the
authenticated and anonymous `/api/v1/venues/` requests, and verify that
`/api/v3/venues/` returns 404.
