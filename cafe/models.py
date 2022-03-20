from django.db import models
from django.core.validators import MinValueValidator, RegexValidator
from decimal import Decimal

# Create your models here.
class Product(models.Model):
    MEALS = 'meal'
    DRINKS = 'drink'
    DESSERTS = 'dessert'
    PRODUCT_CATEGORY = [
        (MEALS, 'Meals'),
        (DRINKS, 'Drinks'),
        (DESSERTS, 'Desserts'),
    ]
    name = models.CharField(max_length=50, unique=True)
    category = models.CharField(max_length=7, choices=PRODUCT_CATEGORY)
    price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(Decimal('0.01'))])
    image = models.ImageField(upload_to='products/')
    last_modified = models.DateTimeField(auto_now_add=True)

class Testimonial(models.Model):
    name = models.CharField(max_length=50, blank=True, default='Customer')
    email = models.EmailField()
    message = models.TextField()

class Gallery(models.Model):
    image = models.ImageField(upload_to='gallery/')
    category = models.CharField(max_length= 10, choices=[('interior','Interior'),('exterior','Exterior')])

class CafeInfoQuerySet(models.QuerySet):
    def delete(self):
        pass

class CafeInfoManager(models.Manager):
    def create(self, **kwargs):
        obj = self.model(**kwargs)
        self._for_write = True
        obj.save(using=self.db)
        return obj

    def get_queryset(self):
        return CafeInfoQuerySet(self.model, using=self._db)

class CafeInfo(models.Model):
    logo = models.ImageField(upload_to='logo/')
    location = models.TextField()
    about = models.TextField()
    schedule = models.TextField()
    email = models.EmailField()
    facebook = models.URLField()
    contact_number = models.CharField(
        validators=[RegexValidator(regex=r'(09)\d{9}', 
        message="Phone number must be entered in the format: '09XXXXXXXXX'.")], 
        max_length=11)
    
    def save(self, *args, **kwargs):
        self.pk = 1
        super(CafeInfo, self).save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        pass

    objects = CafeInfoManager()

    
