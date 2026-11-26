"""Authentication and OTP password reset views for the members app."""

import random
from django.conf import settings
from django.contrib.auth import get_user_model, login, logout
from django.contrib.auth.forms import AuthenticationForm, SetPasswordForm
from django.core.mail import send_mail
from django.shortcuts import redirect, render
from .forms import ForgotPasswordForm, OTPVerifyForm, SignupForm

User = get_user_model()


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


def forgot_password(request):
    """Generate a session-stored 6-digit OTP and email it when the user exists."""
    if request.method == 'POST':
        form = ForgotPasswordForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data['email']
            user = User.objects.filter(email=email).first()
            if user is not None:
                otp = str(random.randint(100000, 999999))
                request.session['reset_otp'] = otp
                request.session['reset_email'] = email
                request.session['tries'] = 0
                request.session.pop('otp_verified', None)
                request.session.set_expiry(settings.OTP_VALIDITY_SECONDS)
                verify_url = request.build_absolute_uri('/members/verify-otp/')
                send_mail(
                    subject='StayFinder Password Reset OTP',
                    message=(
                        f'Your password reset OTP is: {otp}\n'
                        f'Enter it at: {verify_url}'
                    ),
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[email],
                )
            return redirect('verify_otp')
    else:
        form = ForgotPasswordForm()

    return render(request, 'members/forgot_password.html', {'form': form})


def verify_otp(request):
    """Verify the session OTP with at most 3 wrong attempts."""
    error = None
    if request.method == 'POST':
        form = OTPVerifyForm(request.POST)
        if form.is_valid():
            entered_otp = form.cleaned_data['otp'].strip()
            session_otp = request.session.get('reset_otp')
            if session_otp and entered_otp == session_otp:
                request.session['otp_verified'] = True
                request.session.pop('tries', None)
                return redirect('reset_password')

            tries = request.session.get('tries', 0) + 1
            request.session['tries'] = tries
            if tries >= 3:
                for key in ('reset_otp', 'reset_email', 'tries', 'otp_verified'):
                    request.session.pop(key, None)
                return redirect('forgot_password')
            error = f'Invalid or expired OTP. Attempt {tries} of 3.'
    else:
        form = OTPVerifyForm()

    return render(request, 'members/verify_otp.html', {'form': form, 'error': error})


def reset_password(request):
    """Allow password reset only after OTP verification in the session."""
    if not request.session.get('otp_verified'):
        return redirect('forgot_password')

    email = request.session.get('reset_email')
    user = User.objects.filter(email=email).first()
    if user is None:
        return redirect('forgot_password')

    if request.method == 'POST':
        form = SetPasswordForm(user, request.POST)
        if form.is_valid():
            form.save()
            request.session.flush()
            return redirect('login')
    else:
        form = SetPasswordForm(user)

    return render(request, 'members/reset_password.html', {'form': form})
