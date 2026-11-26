from rest_framework import serializers

from .models import Venue


class VenueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Venue
        fields = "__all__"

    def validate_capacity(self, value):
        if value < 10:
            raise serializers.ValidationError(
                "Capacity must be at least 10."
            )
        return value

    def validate_price_per_day(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "Price per day must be above 0."
            )
        return value
