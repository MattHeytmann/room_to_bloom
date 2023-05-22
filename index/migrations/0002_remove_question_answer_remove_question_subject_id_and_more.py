# Generated by Django 4.2 on 2023-05-21 18:49

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('index', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='question',
            name='answer',
        ),
        migrations.RemoveField(
            model_name='question',
            name='subject_id',
        ),
        migrations.AddField(
            model_name='question',
            name='correct_answer',
            field=models.CharField(default=None, max_length=500, verbose_name='Correct answer'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='question',
            name='question_id',
            field=models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, verbose_name='question_id'),
        ),
        migrations.AddField(
            model_name='question',
            name='wrong_answer',
            field=models.CharField(default=None, max_length=500, verbose_name='Wrong answer'),
            preserve_default=False,
        ),
    ]