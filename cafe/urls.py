from django.urls import path
from . import views

urlpatterns = [
    path('list-create', views.list_create_product, name='list-create-products'),
    path('delete-update/<str:pk>', views.delete_update_product, name='delete-update-product'),
]