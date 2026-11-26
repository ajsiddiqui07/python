"""Views for the listings app (Session 2: HttpResponse without templates/models)."""

from django.http import HttpResponse

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
    """Return an HTML list of all hard-coded PGs."""
    items = ''.join(
        f"<li>{pg['name']} — {pg['area']} — ₹{pg['monthly_rent']}/month</li>"
        for pg in PG_LIST
    )
    return HttpResponse(f'<h1>Available PGs</h1><ul>{items}</ul>')


def pg_detail(request, pg_id):
    """Return details for a 1-based PG ID or 404 when out of range."""
    if pg_id < 1 or pg_id > len(PG_LIST):
        return HttpResponse('PG not found', status=404)
    pg = PG_LIST[pg_id - 1]
    return HttpResponse(
        f"<h1>{pg['name']}</h1>"
        f"<p>Area: {pg['area']}</p>"
        f"<p>Monthly Rent: ₹{pg['monthly_rent']}</p>"
    )
