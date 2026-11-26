"""URL configuration for the listings app."""

from django.urls import path
from . import views

urlpatterns = [
    path('pgs/', views.pg_list, name='pg_list'),
    path('pgs/<int:pg_id>/', views.pg_detail, name='pg_detail'),
]
