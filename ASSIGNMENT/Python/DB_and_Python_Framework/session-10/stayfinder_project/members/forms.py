"""Forms for member registration and OTP password reset."""

from django import forms
from django.contrib.auth.forms import UserCreationForm


class SignupForm(UserCreationForm):
    """User registration form requiring a valid email address."""

    email = forms.EmailField(required=True)

    class Meta(UserCreationForm.Meta):
        fields = ('username', 'email')


class ForgotPasswordForm(forms.Form):
    """Form to request a password reset OTP by email."""

    email = forms.EmailField(label='Registered Email')


class OTPVerifyForm(forms.Form):
    """One-field form to submit the 6-digit OTP."""

    otp = forms.CharField(max_length=6, label='6-Digit OTP')
