"""URL configuration for the listings app."""

from django.urls import path
from . import views

urlpatterns = [
    path('pgs/', views.pg_list, name='pg_list'),
    path('pgs/add/', views.add_pg, name='add_pg'),
    path('pgs/<int:pk>/', views.pg_detail, name='pg_detail'),
    path('pgs/<int:pk>/edit/', views.edit_pg, name='edit_pg'),
    path('pgs/<int:pk>/delete/', views.delete_pg, name='delete_pg'),
    path('pgs/<int:pk>/beds/', views.update_beds, name='update_beds'),
    path('pgs/<int:pk>/book/', views.book_pg, name='book_pg'),
    path('bookings/<int:pk>/', views.booking_detail, name='booking_detail'),
    path('bookings/<int:pk>/checkout/', views.create_checkout, name='create_checkout'),
    path('bookings/<int:pk>/success/', views.payment_success, name='payment_success'),
    path('bookings/<int:pk>/cancel/', views.payment_cancel, name='payment_cancel'),
    path('search/', views.pg_search, name='pg_search'),
    path('stats/', views.pg_stats, name='pg_stats'),
    path('nearby/', views.nearby_pgs, name='nearby_pgs'),
    path('localities/', views.locality_overview, name='locality_overview'),
    path('localities/add/', views.add_locality, name='add_locality'),
    path('visit/', views.visit_request, name='visit_request'),
]
