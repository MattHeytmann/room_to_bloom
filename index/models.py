from django.db import models
from django.contrib.auth.models import User
import uuid
from django.core.validators import MaxValueValidator, MinValueValidator 

# Create your models here.


# class Question(models.Model):
#     author = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
#     parent_note = models.ForeignKey('Note', on_delete=models.CASCADE, blank=True, null=True)
#     title = models.CharField(max_length=100, verbose_name="Question")
#     answer = models.CharField(max_length=100, verbose_name="Answer")
#     case_strict = models.BooleanField(verbose_name="is case strict", default=True)
#     diacritic_strict = models.BooleanField(verbose_name="is diacritic strict", default=True)
#     symbol_strict = models.BooleanField(verbose_name="is symbol strict", default=True)
#     can_be_mashed = models.BooleanField(verbose_name="the result is in different order", default=True)
#     active = models.BooleanField(verbose_name="active", default=True)
#     subject_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, verbose_name="chapter_id")
#
#     class Meta:
#         ordering = ['title']
#
#     def __str__(self):
#         return self.title