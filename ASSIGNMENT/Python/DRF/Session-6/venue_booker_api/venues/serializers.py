from decimal import Decimal

from rest_framework import serializers

from .models import Venue


class VenueSerializer(serializers.ModelSerializer):
    def get_fields(self):
        fields = super().get_fields()
        request = self.context.get("request")
        if request is not None and request.version == "v2":
            fields["price_per_guest"] = serializers.SerializerMethodField()
        return fields

    def get_price_per_guest(self, venue):
        return (venue.price_per_day / venue.capacity).quantize(
            Decimal("0.01")
        )

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


class EnquirySerializer(serializers.Serializer):
    venue_id = serializers.IntegerField(min_value=1)
    name = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    phone = serializers.RegexField(regex=r"^[+()\d -]{8,20}$")
    event_date = serializers.DateField()

    def validate_venue_id(self, value):
        if not Venue.objects.filter(pk=value).exists():
            raise serializers.ValidationError("Venue does not exist.")
        return value

    def validate_phone(self, value):
        digit_count = sum(character.isdigit() for character in value)
        if not 8 <= digit_count <= 15:
            raise serializers.ValidationError(
                "Enter a phone number with 8 to 15 digits."
            )
        return value
