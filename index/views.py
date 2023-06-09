from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
# from django.contrib.auth import authenticate, login, logout
# from django.contrib.auth.models import User
from .models import Question
# from django.urls import reverse
# from random import shuffle


# @login_required(login_url='login')
def home(request):
    """
    homepage (no chapter or section)
    """

    questions = Question.objects.all()

    context = {'questions' : questions}

    return render(request, 'home.html', context)

def restaurant(request):
    """
    homepage (no chapter or section)
    """

    questions = Question.objects.all()

    context = {'questions' : questions}

    return render(request, 'restaurant.html', context)