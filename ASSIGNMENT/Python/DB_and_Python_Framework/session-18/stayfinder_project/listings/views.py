"""Views for the listings app (Session 12: DB-backed CRUD for PG)."""

import json
import stripe
from django.conf import settings
from django.contrib.auth.decorators import login_required, permission_required
from django.core.mail import EmailMultiAlternatives
from django.db import connection, reset_queries, transaction
from django.db.models import Avg, Count, Max, Min, Q
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.template.loader import render_to_string
from django.views.decorators.http import require_POST
from .forms import LocalityForm, PGForm, VisitRequestForm
from .models import Booking, Locality, PG
from .utils import haversine


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


@login_required
@require_POST
def book_pg(request, pk):
    """Create a pending Booking for a bed in the chosen PG and redirect to booking detail."""
    pg = get_object_or_404(PG, pk=pk)
    booking = Booking.objects.create(
        tenant=request.user,
        pg=pg,
        token_amount=1000,
        status='pending',
    )
    return redirect('booking_detail', pk=booking.pk)


@login_required
def booking_detail(request, pk):
    """Display booking summary and Pay Now button while pending."""
    booking = get_object_or_404(Booking, pk=pk, tenant=request.user)
    return render(request, 'listings/booking_detail.html', {'booking': booking})


@login_required
@require_POST
def create_checkout(request, pk):
    """Create a Stripe Checkout session in INR and redirect to session.url."""
    booking = get_object_or_404(Booking, pk=pk, tenant=request.user)
    stripe.api_key = settings.STRIPE_SECRET_KEY
    success_url = (
        request.build_absolute_uri(f'/bookings/{booking.pk}/success/')
        + '?session_id={CHECKOUT_SESSION_ID}'
    )
    cancel_url = request.build_absolute_uri(f'/bookings/{booking.pk}/cancel/')

    session = stripe.checkout.Session.create(
        mode='payment',
        line_items=[
            {
                'price_data': {
                    'currency': 'inr',
                    'product_data': {
                        'name': f'StayFinder Bed Reservation — {booking.pg.name}',
                    },
                    'unit_amount': booking.token_amount * 100,
                },
                'quantity': 1,
            }
        ],
        success_url=success_url,
        cancel_url=cancel_url,
    )
    booking.stripe_session_id = session.id
    booking.save(update_fields=['stripe_session_id'])
    return redirect(session.url)


@login_required
def payment_success(request, pk):
    """Verify Stripe payment status and mark booking paid (reducing beds once while pending)."""
    booking = get_object_or_404(Booking, pk=pk, tenant=request.user)
    session_id = request.GET.get('session_id') or booking.stripe_session_id
    if session_id:
        stripe.api_key = settings.STRIPE_SECRET_KEY
        session = stripe.checkout.Session.retrieve(session_id)
        if session.payment_status == 'paid':
            with transaction.atomic():
                locked_booking = Booking.objects.select_for_update().get(pk=booking.pk)
                if locked_booking.status == 'pending':
                    locked_booking.status = 'paid'
                    locked_booking.save(update_fields=['status'])
                    pg = PG.objects.select_for_update().get(pk=locked_booking.pg_id)
                    if pg.available_beds > 0:
                        pg.available_beds -= 1
                        pg.save(update_fields=['available_beds'])
            booking.refresh_from_db()

    return render(request, 'listings/payment_success.html', {'booking': booking})


@login_required
def payment_cancel(request, pk):
    """Handle canceled Stripe checkout and let the user retry."""
    booking = get_object_or_404(Booking, pk=pk, tenant=request.user)
    return render(request, 'listings/payment_cancel.html', {'booking': booking})


def nearby_pgs(request):
    """Find PGs within radius_km of (lat, lng) using haversine, nearest first."""
    default_lat = 23.0338
    default_lng = 72.5466
    default_radius = 5.0

    raw_lat = request.GET.get('lat', str(default_lat)).strip() or str(default_lat)
    raw_lng = request.GET.get('lng', str(default_lng)).strip() or str(default_lng)
    raw_radius = request.GET.get('radius_km', str(default_radius)).strip() or str(default_radius)

    error = None
    results = []
    try:
        lat = float(raw_lat)
        lng = float(raw_lng)
        radius_km = float(raw_radius)
        if radius_km < 0:
            raise ValueError('Radius must be non-negative')
    except ValueError:
        error = 'Please enter valid numeric values for latitude, longitude, and radius.'
    else:
        pgs = PG.objects.select_related('locality').exclude(
            latitude__isnull=True
        ).exclude(
            longitude__isnull=True
        )
        for pg in pgs:
            distance = haversine(lat, lng, pg.latitude, pg.longitude)
            if distance <= radius_km:
                results.append({'pg': pg, 'distance': distance})
        results.sort(key=lambda item: item['distance'])

    return render(
        request,
        'listings/nearby_pgs.html',
        {
            'results': results,
            'lat': raw_lat,
            'lng': raw_lng,
            'radius_km': raw_radius,
            'error': error,
        },
    )
