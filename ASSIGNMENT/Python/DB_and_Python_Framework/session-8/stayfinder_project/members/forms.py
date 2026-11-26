"""Forms for member registration."""

from django import forms
from django.contrib.auth.forms import UserCreationForm


class SignupForm(UserCreationForm):
    """User registration form requiring a valid email address."""

    email = forms.EmailField(required=True)

    class Meta(UserCreationForm.Meta):
        fields = ('username', 'email')
