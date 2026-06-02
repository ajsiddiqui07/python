from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import *
from django.core.exceptions import ValidationError

# Create your models here.
class Course(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    video = models.FileField(upload_to='videos/', null=True, blank=True)

    def __str__(self):
        return self.title

class Student(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    age = models.IntegerField()
    courses = models.ManyToManyField(Course, related_name="students")

    def __str__(self):
        return self.name
    
@receiver(post_save, sender=Student)
def notify_enrollment(sender, instance, created, **kwargs):
    if created:
        print("New student enrolled")

def validate_video(file):
    if file.size > 5*1024*1024:
        raise ValidationError("File too large")
        

    