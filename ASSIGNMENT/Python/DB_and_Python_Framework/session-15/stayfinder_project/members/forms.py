"""Forms for member registration, OTP reset, and profile editing."""

from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.core.files.uploadedfile import UploadedFile
from .models import Profile


class SignupForm(UserCreationForm):
    """User registration form requiring an email address and role."""

    ROLE_CHOICES = [
        ('Owner', 'Owner'),
        ('Tenant', 'Tenant'),
    ]

    email = forms.EmailField(required=True)
    role = forms.ChoiceField(choices=ROLE_CHOICES, required=True)

    class Meta(UserCreationForm.Meta):
        fields = ('username', 'email')


class ForgotPasswordForm(forms.Form):
    """Form to request a password reset OTP by email."""

    email = forms.EmailField(label='Registered Email')


class OTPVerifyForm(forms.Form):
    """One-field form to submit the 6-digit OTP."""

    otp = forms.CharField(max_length=6, label='6-Digit OTP')


class ProfileForm(forms.ModelForm):
    """ModelForm for editing a user's profile and validating uploaded photo."""

    class Meta:
        model = Profile
        fields = ['full_name', 'phone', 'photo']

    def clean_photo(self):
        """Accept only .jpg, .jpeg, or .png files up to 1 MB when a new file is uploaded."""
        photo = self.cleaned_data.get('photo')
        if isinstance(photo, UploadedFile):
            allowed_types = {'image/jpeg', 'image/png'}
            allowed_exts = ('.jpg', '.jpeg', '.png')
            name_lower = photo.name.lower()
            if photo.content_type not in allowed_types or not name_lower.endswith(allowed_exts):
                raise forms.ValidationError('Only .jpg, .jpeg, or .png images are allowed.')
            if photo.size > 1024 * 1024:
                raise forms.ValidationError('Photo size must be 1 MB or smaller.')
        return photo
