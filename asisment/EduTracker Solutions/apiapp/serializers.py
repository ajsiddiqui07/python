from rest_framework import serializers
from .models import *

class CourseSerializer(serializers.ModelSerializer):
    def validate_video(self, value):
        limit = 5 * 1024 * 1024   # 5MB
        if value.size > limit:
            raise serializers.ValidationError("Video size must be less than 5MB")
        return value

    class Meta:
        model = Course
        fields = '__all__'

    
    class Meta:
        model = Course
        fields = '__all__'


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'