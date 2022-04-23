from rest_framework.serializers import ModelSerializer
from .models import Product, Testimonial, CafeInfo, Gallery, About

class ProductSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class TestimonialSerializer(ModelSerializer):
    class Meta:
        model = Testimonial
        fields = '__all__'

class CafeInfoSerializer(ModelSerializer):
    class Meta:
        model = CafeInfo
        fields = '__all__'

class GallerySerializer(ModelSerializer):
    class Meta:
        model = Gallery
        fields = '__all__'

class AboutSerializer(ModelSerializer):
    class Meta:
        model = About
        fields = '__all__'
