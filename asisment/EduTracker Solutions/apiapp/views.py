from django.shortcuts import render
from rest_framework import viewsets
from .models import *
from .serializers import *
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny,IsAdminUser,IsAuthenticated
from .throttles import StudentThrottle

@permission_classes ([AllowAny])
class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    throttle_classes = [StudentThrottle]


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


