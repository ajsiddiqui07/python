"""Models for the members app."""

from django.conf import settings
from django.db import models


class Profile(models.Model):
    """Extended profile linked 1-to-1 with a Django User."""

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=80, blank=True)
    phone = models.CharField(max_length=15, blank=True)
    photo = models.ImageField(upload_to='profiles/', blank=True)

    def __str__(self):
        return self.full_name or self.user.username
