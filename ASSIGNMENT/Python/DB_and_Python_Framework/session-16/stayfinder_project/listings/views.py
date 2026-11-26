"""Views for the listings app (Session 12: DB-backed CRUD for PG)."""

import json
from django.conf import settings
from django.contrib.auth.decorators import login_required, permission_required
from django.core.mail import EmailMultiAlternatives
from django.db import connection, reset_queries
from django.db.models import Avg, Count, Max, Min, Q
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.template.loader import render_to_string
from django.views.decorators.http import require_POST
from .forms import LocalityForm, PGForm, VisitRequestForm
from .models import Locality, PG


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


@login_required
@permission_required('listings.change_pg', raise_exception=True)
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


@login_required
@permission_required('listings.delete_pg', raise_exception=True)
def delete_pg(request, pk):
    """Show delete confirmation on GET and delete only on POST."""
    pg = get_object_or_404(PG, pk=pk)
    if request.method == 'POST':
        pg.delete()
        return redirect('pg_list')
    return render(request, 'listings/delete_pg_confirm.html', {'pg': pg})


@require_POST
def update_beds(request, pk):
    """Update available_beds (0..20) via JSON POST and return JsonResponse."""
    pg = get_object_or_404(PG, pk=pk)
    try:
        payload = json.loads(request.body)
    except (json.JSONDecodeError, TypeError):
        return JsonResponse({'error': 'Invalid JSON payload.'}, status=400)

    n = payload.get('available_beds') if isinstance(payload, dict) else None
    if isinstance(n, bool) or not isinstance(n, int) or n < 0 or n > 20:
        return JsonResponse(
            {'error': 'Available beds must be an integer between 0 and 20.'},
            status=400,
        )

    pg.available_beds = n
    pg.save(update_fields=['available_beds'])
    return JsonResponse({'pk': pk, 'name': pg.name, 'available_beds': n})


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


@login_required
@permission_required('listings.add_pg', raise_exception=True)
def add_pg(request):
    """Create a new PG listing using PGForm, set owner, and redirect to pg_list."""
    if request.method == 'POST':
        form = PGForm(request.POST)
        if form.is_valid():
            pg = form.save(commit=False)
            pg.owner = request.user
            pg.save()
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


def pg_search(request):
    """Search available PGs using Q, filter, exclude, and select_related."""
    q = request.GET.get('q', '').strip()
    gender = request.GET.get('gender', '').strip()
    max_rent = request.GET.get('max_rent', '').strip()

    pgs = PG.objects.select_related('locality').exclude(available_beds=0)
    if q:
        pgs = pgs.filter(Q(name__icontains=q) | Q(locality__name__icontains=q))
    if gender:
        pgs = pgs.filter(gender_type=gender)
    if max_rent:
        try:
            pgs = pgs.filter(monthly_rent__lte=int(max_rent))
        except ValueError:
            pass

    return render(
        request,
        'listings/pg_search.html',
        {
            'pgs': pgs,
            'q': q,
            'gender': gender,
            'max_rent': max_rent,
        },
    )


def pg_stats(request):
    """Display aggregate rent statistics and per-locality PG counts."""
    stats = PG.objects.aggregate(
        pg_total=Count('id'),
        monthly_rent__avg=Avg('monthly_rent'),
        monthly_rent__min=Min('monthly_rent'),
        monthly_rent__max=Max('monthly_rent'),
    )
    localities = Locality.objects.annotate(pg_count=Count('pg')).order_by('-pg_count')
    return render(
        request,
        'listings/pg_stats.html',
        {'stats': stats, 'localities': localities},
    )


def locality_overview(request):
    """List all localities and their PGs with prefetch_related in 2 queries."""
    reset_queries()
    localities = list(Locality.objects.prefetch_related('pg_set'))
    print('locality_overview queries:', len(connection.queries))
    return render(
        request,
        'listings/locality_overview.html',
        {'localities': localities},
    )
