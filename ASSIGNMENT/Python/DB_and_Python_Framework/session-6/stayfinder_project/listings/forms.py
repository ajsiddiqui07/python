"""Forms for the listings app."""

import datetime
import re
from django import forms


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
