"""Forms for the listings app."""

import datetime
import re
from django import forms
from .models import Locality, PG


class VisitRequestForm(forms.Form):
    """Form for scheduling a PG visit request."""

    visitor_name = forms.CharField(max_length=50, label='Visitor Name')
    phone = forms.CharField(max_length=10, min_length=10, label='Phone Number')
    visit_date = forms.DateField(
        label='Visit Date',
        widget=forms.DateInput(attrs={'type': 'date'}),
    )
    people_count = forms.IntegerField(min_value=1, max_value=4, label='Number of People')

    def clean_phone(self):
        """Accept only 10-digit Indian mobile numbers starting with 6, 7, 8, or 9."""
        phone = self.cleaned_data['phone'].strip()
        if not re.fullmatch(r'[6-9]\d{9}', phone):
            raise forms.ValidationError(
                'Enter a valid 10-digit mobile number starting with 6, 7, 8, or 9.'
            )
        return phone

    def clean_visit_date(self):
        """Reject visit dates earlier than today."""
        visit_date = self.cleaned_data['visit_date']
        if visit_date < datetime.date.today():
            raise forms.ValidationError('Visit date cannot be in the past.')
        return visit_date


class PGForm(forms.ModelForm):
    """ModelForm for creating a PG listing."""

    class Meta:
        model = PG
        fields = ['name', 'locality', 'monthly_rent', 'gender_type', 'available_beds']
        labels = {
            'name': 'PG Name',
            'locality': 'Locality',
            'monthly_rent': 'Monthly Rent',
            'gender_type': 'Gender Type',
            'available_beds': 'Available Beds',
        }
        help_texts = {
            'monthly_rent': 'Rent per bed in ₹',
        }
        widgets = {
            'monthly_rent': forms.NumberInput(attrs={'min': 1500, 'max': 40000}),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['monthly_rent'].widget.attrs['min'] = 1500

    def clean_monthly_rent(self):
        """Reject monthly rents below 1500 or above 40000."""
        rent = self.cleaned_data['monthly_rent']
        if rent < 1500 or rent > 40000:
            raise forms.ValidationError('Monthly rent must be between ₹1,500 and ₹40,000.')
        return rent


class LocalityForm(forms.ModelForm):
    """ModelForm for adding a city locality."""

    class Meta:
        model = Locality
        fields = ['name', 'city']
