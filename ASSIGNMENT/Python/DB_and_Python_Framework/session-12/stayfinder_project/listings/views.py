"""Views for the listings app (Session 12: DB-backed CRUD for PG)."""

from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.shortcuts import get_object_or_404, redirect, render
from django.template.loader import render_to_string
from .forms import LocalityForm, PGForm, VisitRequestForm
from .models import PG


def home(request):
    """Render brand name and a one-line tagline."""
    return render(request, 'listings/home.html')


def pg_list(request):
    """Render all PG listings fetched from the database."""
    pgs = PG.objects.all()
    return render(request, 'listings/pg_list.html', {'pgs': pgs})


def pg_detail(request, pk):
    """Render all fields of a single PG row or return 404."""
    pg = get_object_or_404(PG, pk=pk)
    return render(request, 'listings/pg_detail.html', {'pg': pg})


def edit_pg(request, pk):
    """Pre-fill PGForm with an existing PG and update it on POST."""
    pg = get_object_or_404(PG, pk=pk)
    if request.method == 'POST':
        form = PGForm(request.POST, instance=pg)
        if form.is_valid():
            form.save()
            return redirect('pg_detail', pk=pg.pk)
    else:
        form = PGForm(instance=pg)

    return render(request, 'listings/edit_pg.html', {'form': form, 'pg': pg})


def delete_pg(request, pk):
    """Show delete confirmation on GET and delete only on POST."""
    pg = get_object_or_404(PG, pk=pk)
    if request.method == 'POST':
        pg.delete()
        return redirect('pg_list')
    return render(request, 'listings/delete_pg_confirm.html', {'pg': pg})


def visit_request(request):
    """Handle GET/POST for scheduling a PG visit and sending HTML confirmation email."""
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
