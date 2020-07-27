from django.urls import path
from . import views

urlpatterns = [
   path('icon', views.icon)
]