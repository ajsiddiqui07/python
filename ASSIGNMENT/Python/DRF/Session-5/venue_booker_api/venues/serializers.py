from rest_framework import serializers

from .models import Venue


class VenueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Venue
        fields = "__all__"
        read_only_fields = ("owner",)

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


class CitySerializer(serializers.Serializer):
    name = serializers.CharField()
    state = serializers.CharField()
    venue_count = serializers.IntegerField(min_value=0)
