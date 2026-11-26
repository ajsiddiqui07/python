"""SMS helper using Twilio when configured, falling back to terminal output."""

import os


def send_sms(to_number, text):
    """Send SMS via Twilio if credentials exist in env; otherwise print to terminal."""
    sid = os.environ.get('TWILIO_ACCOUNT_SID', '').strip()
    token = os.environ.get('TWILIO_AUTH_TOKEN', '').strip()
    from_number = os.environ.get('TWILIO_FROM', '').strip()

    if sid and token and from_number:
        from twilio.rest import Client

        client = Client(sid, token)
        return client.messages.create(to=to_number, from_=from_number, body=text)

    print(f'[SMS to {to_number}] {text}')
    return None
