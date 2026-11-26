from django.conf import settings
from django.contrib.auth import get_user_model
from django.db import migrations


ORGANISERS = (
    ("asha_organiser", "Asha"),
    ("ravi_organiser", "Ravi"),
    ("meera_organiser", "Meera"),
)


def create_organisers(apps, schema_editor):
    user_model = get_user_model()
    for username, first_name in ORGANISERS:
        user, created = user_model.objects.get_or_create(
            username=username,
            defaults={"first_name": first_name},
        )
        if created:
            user.set_unusable_password()
            user.save(update_fields=["password"])


class Migration(migrations.Migration):
    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RunPython(create_organisers, migrations.RunPython.noop),
    ]
