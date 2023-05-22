from django.db import models
from django.contrib.auth.models import User
import uuid
from django.core.validators import MaxValueValidator, MinValueValidator 

# Create your models here.


class Question(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    title = models.CharField(max_length=500, verbose_name="Question")
    correct_answer = models.CharField(max_length=500, verbose_name="Correct answer")
    wrong_answer = models.CharField(max_length=500, verbose_name="Wrong answer")
    active = models.BooleanField(verbose_name="active", default=True)
    question_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, verbose_name="question_id")

    class Meta:
        ordering = ['title']

    def __str__(self):
        return self.title