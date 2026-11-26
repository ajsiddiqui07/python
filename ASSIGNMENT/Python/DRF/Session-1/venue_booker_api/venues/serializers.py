from django.contrib.auth.models import User
from rest_framework import serializers


class CitySerializer(serializers.Serializer):
    name = serializers.CharField()
    state = serializers.CharField()
    venue_count = serializers.IntegerField(min_value=0)


class OrganiserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username"]
