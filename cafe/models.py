from django.db import models
from django.core.validators import MinValueValidator, RegexValidator

from decimal import Decimal

# Create your models here.
class Product(models.Model):
    MEALS = 'ML'
    DRINKS = 'DK'
    DESSERTS = 'DS'
    PRODUCT_CATEGORY = [
        (MEALS, 'Meals'),
        (DRINKS, 'Drinks'),
        (DESSERTS, 'Desserts'),
    ]
    name = models.CharField(max_length=50)
    category = models.CharField(max_length=2, choices=PRODUCT_CATEGORY)
    price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(Decimal('0.01'))])
    description = models.TextField()
    image = models.ImageField(upload_to='products/', blank=True, default='products/default.svg')
    last_modified = models.DateTimeField(auto_now=True)
    class Meta:
        ordering = ['last_modified']

class Testimonial(models.Model):
    name = models.CharField(max_length=50, blank=True, default='Customer')
    email = models.EmailField(blank=True)
    message = models.TextField()

class CafeInfo(models.Model):
    logo = models.ImageField()
    location = models.CharField(max_length=200)
    about = models.TextField()
    schedule = models.CharField(max_length=100)
    email = models.EmailField()
    socials = models.URLField()
    contact_number = models.CharField(
        validators=[RegexValidator(regex=r'(09)\d{9}', 
        message="Phone number must be entered in the format: '09XXXXXXXXX'.")], 
        max_length=11)

class Gallery(models.Model):
    image = models.ImageField(upload_to='gallery/')


    
