"""Authentication views for the members app."""

from django.contrib.auth import login, logout
from django.contrib.auth.forms import AuthenticationForm
from django.shortcuts import redirect, render
from .forms import SignupForm


def signup(request):
    """Register a new user using SignupForm and redirect to home."""
    if request.method == 'POST':
        form = SignupForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('home')
    else:
        form = SignupForm()

    return render(request, 'members/signup.html', {'form': form})


def login_view(request):
    """Authenticate and log in a user using AuthenticationForm."""
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            login(request, form.get_user())
            return redirect('home')
    else:
        form = AuthenticationForm(request)

    return render(request, 'members/login.html', {'form': form})


def logout_view(request):
    """Log out the current user and redirect to home."""
    logout(request)
    return redirect('home')
