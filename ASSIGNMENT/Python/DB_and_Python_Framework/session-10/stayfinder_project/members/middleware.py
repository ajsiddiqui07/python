"""Custom middleware for the members app."""

import time
from django.conf import settings
from django.contrib.auth import logout


class IdleLogoutMiddleware:
    """Log out authenticated users whose session has been idle beyond IDLE_LIMIT_SECONDS."""

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.user.is_authenticated:
            now = time.time()
            last_seen = request.session.get('last_seen')
            if last_seen is not None and (now - last_seen) > settings.IDLE_LIMIT_SECONDS:
                logout(request)
            else:
                request.session['last_seen'] = now

        return self.get_response(request)
