"""Newsletter digest helper using a single pooled Django email connection."""

from django.conf import settings
from django.core.mail import EmailMultiAlternatives, get_connection
from django.template.loader import render_to_string
from listings.models import PG


def send_digest(recipients):
    """Send an HTML digest of the 3 newest PGs over a single mail connection."""
    newest_pgs = list(PG.objects.select_related('locality').order_by('-id')[:3])
    html_body = render_to_string(
        'members/emails/digest_email.html',
        {'newest_pgs': newest_pgs},
    )
    text_body = 'Newest PGs on StayFinder:\n' + '\n'.join(
        f'- {pg.name} ({pg.locality}) — ₹{pg.monthly_rent}'
        for pg in newest_pgs
    )

    sent_count = 0
    with get_connection() as connection:
        for recipient in recipients:
            msg = EmailMultiAlternatives(
                subject='StayFinder Digest: 3 Newest PGs',
                body=text_body,
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[recipient],
                connection=connection,
            )
            msg.attach_alternative(html_body, 'text/html')
            sent_count += msg.send()

    return sent_count
