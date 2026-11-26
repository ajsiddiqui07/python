"""Views for the listings app (Session 7: PGForm and LocalityForm)."""

from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.http import HttpResponse
from django.shortcuts import redirect, render
from django.template.loader import render_to_string
from .forms import LocalityForm, PGForm, VisitRequestForm
from .models import PG

PG_LIST = [
    {'name': 'Saffron Residency PG', 'area': 'Satellite', 'monthly_rent': 7500},
    {'name': 'Bopal Nest Boys PG', 'area': 'Bopal', 'monthly_rent': 5500},
    {'name': 'Navrangpura Comfort Stay', 'area': 'Navrangpura', 'monthly_rent': 9500},
    {'name': 'Maninagar Metro Hostel', 'area': 'Maninagar', 'monthly_rent': 4800},
    {'name': 'Prahlad Nagar Elite PG', 'area': 'Prahlad Nagar', 'monthly_rent': 11500},
    {'name': 'Vastrapur Scholars Hub', 'area': 'Vastrapur', 'monthly_rent': 8200},
]


def home(request):
    """Render brand name and a one-line tagline."""
    return render(request, 'listings/home.html')


def pg_list(request):
    """Render all PG listings fetched from the database."""
    pgs = PG.objects.all()
    return render(request, 'listings/pg_list.html', {'pgs': pgs})


def pg_detail(request, pg_id):
    """Render details for a 1-based hard-coded PG ID or return 404."""
    if pg_id < 1 or pg_id > len(PG_LIST):
        return HttpResponse('PG not found', status=404)
    pg = PG_LIST[pg_id - 1]
    return render(request, 'listings/pg_detail.html', {'pg': pg, 'pg_id': pg_id})


def visit_request(request):
    """Handle GET/POST for scheduling a PG visit without a database model."""
    thank_you = None
    if request.method == 'POST':
        form = VisitRequestForm(request.POST)
        if form.is_valid():
            data = form.cleaned_data
            log_path = settings.BASE_DIR / 'visit_requests.txt'
            with open(log_path, 'a', encoding='utf-8') as f:
                f.write(
                    f"{data['visitor_name']} | {data['email']} | {data['phone']} | "
                    f"{data['visit_date']} | {data['people_count']}\n"
                )
            featured_pgs = PG.objects.all()[:3]
            text_body = (
                f"Hello {data['visitor_name']},\n\n"
                f"Your visit request is received.\n"
                f"Visit Date: {data['visit_date']}\n"
                f"Number of People: {data['people_count']}\n"
            )
            html_body = render_to_string(
                'listings/emails/visit_email.html',
                {
                    'visitor_name': data['visitor_name'],
                    'visit_date': data['visit_date'],
                    'people_count': data['people_count'],
                    'featured_pgs': featured_pgs,
                },
            )
            msg = EmailMultiAlternatives(
                subject='Your visit request is received',
                body=text_body,
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[data['email']],
            )
            msg.attach_alternative(html_body, 'text/html')
            msg.send()
            thank_you = f"Thank you, {data['visitor_name']}! Your visit request has been recorded."
            form = VisitRequestForm()
    else:
        form = VisitRequestForm()

    return render(
        request,
        'listings/visit_request.html',
        {'form': form, 'thank_you': thank_you},
    )


def add_pg(request):
    """Create a new PG listing using PGForm and redirect to pg_list."""
    if request.method == 'POST':
        form = PGForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('pg_list')
    else:
        form = PGForm()

    return render(request, 'listings/add_pg.html', {'form': form})


def add_locality(request):
    """Create a new Locality using LocalityForm and redirect to add_pg."""
    if request.method == 'POST':
        form = LocalityForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('add_pg')
    else:
        form = LocalityForm()

    return render(request, 'listings/add_locality.html', {'form': form})
