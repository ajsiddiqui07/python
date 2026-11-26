"""Views for the listings app (Session 3: templates, CSS, and JS)."""

from django.http import HttpResponse
from django.shortcuts import render

PG_LIST = [
    {'name': 'Saffron Residency PG', 'area': 'Satellite', 'monthly_rent': 7500},
    {'name': 'Bopal Nest Boys PG', 'area': 'Bopal', 'monthly_rent': 5500},
    {'name': 'Navrangpura Comfort Stay', 'area': 'Navrangpura', 'monthly_rent': 9500},
    {'name': 'Maninagar Metro Hostel', 'area': 'Maninagar', 'monthly_rent': 4800},
    {'name': 'Prahlad Nagar Elite PG', 'area': 'Prahlad Nagar', 'monthly_rent': 11500},
    {'name': 'Vastrapur Scholars Hub', 'area': 'Vastrapur', 'monthly_rent': 8200},
]


def home(request):
    """Return brand name and a one-line tagline."""
    return HttpResponse(
        '<h1>StayFinder</h1>'
        '<p>Verified PGs and student hostels across your city, tailored to your budget.</p>'
    )


def pg_list(request):
    """Render the hard-coded PG list inside a template table."""
    return render(request, 'listings/pg_list.html', {'pgs': PG_LIST})


def pg_detail(request, pg_id):
    """Render details for a 1-based PG ID or return 404 if out of range."""
    if pg_id < 1 or pg_id > len(PG_LIST):
        return HttpResponse('PG not found', status=404)
    pg = PG_LIST[pg_id - 1]
    return render(request, 'listings/pg_detail.html', {'pg': pg, 'pg_id': pg_id})
