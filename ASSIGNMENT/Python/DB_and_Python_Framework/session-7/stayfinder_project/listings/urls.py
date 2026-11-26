"""URL configuration for the listings app."""

from django.urls import path
from . import views

urlpatterns = [
    path('pgs/', views.pg_list, name='pg_list'),
    path('pgs/add/', views.add_pg, name='add_pg'),
    path('pgs/<int:pg_id>/', views.pg_detail, name='pg_detail'),
    path('localities/add/', views.add_locality, name='add_locality'),
    path('visit/', views.visit_request, name='visit_request'),
]
