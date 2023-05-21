from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('game/restaurant', views.restaurant, name='restaurant'),
]
