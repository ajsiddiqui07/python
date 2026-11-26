from django.conf import settings
from django.contrib.auth.hashers import make_password
from django.db import migrations


ORGANISER_USERNAMES = ("asha_organiser", "bhavin_organiser")


def create_organisers(apps, schema_editor):
    user_model = apps.get_model(*settings.AUTH_USER_MODEL.split("."))
    unusable_password = make_password(None)
    for username in ORGANISER_USERNAMES:
        user_model.objects.get_or_create(
            username=username,
            defaults={"password": unusable_password},
        )


class Migration(migrations.Migration):
    dependencies = [
        ("venues", "0003_venue_owner"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RunPython(create_organisers, migrations.RunPython.noop),
    ]
