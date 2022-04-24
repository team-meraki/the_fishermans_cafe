from rest_framework.generics import ListCreateAPIView, RetrieveDestroyAPIView, RetrieveUpdateDestroyAPIView, RetrieveUpdateAPIView, ListAPIView
from .models import *
from .serializers import *
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
import requests

# Create your views here.
class ListCreateProduct(ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class RetrieveUpdateDestroyProduct(RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ListCreateTestimonial(ListCreateAPIView):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer

class RetrieveUpdateDestroyTestimonial(RetrieveUpdateDestroyAPIView):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer

class RetrieveUpdateCafeInfo(RetrieveUpdateAPIView):
    queryset = CafeInfo.objects.all()
    serializer_class = CafeInfoSerializer

    def get_object(self):
        return get_object_or_404(CafeInfo, pk='1')

class ListCreateGallery(ListCreateAPIView):
    queryset = Gallery.objects.all()
    serializer_class = GallerySerializer

class RetrieveDestroyGallery(RetrieveDestroyAPIView):
    queryset = Gallery.objects.all()
    serializer_class = GallerySerializer

class RetrieveUpdateAbout(RetrieveUpdateAPIView):
    queryset = About.objects.all()
    serializer_class = AboutSerializer

    def get_object(self):
        return get_object_or_404(About, pk='1')

class ListFeaturedProduct(ListAPIView):
    queryset = FeaturedProduct.objects.all()
    serializer_class = FeaturedProductSerializer

class RetrieveUpdateFeaturedProduct(RetrieveUpdateAPIView):
    queryset = FeaturedProduct.objects.all()
    serializer_class = FeaturedProductSerializer

@api_view(['POST'])
def recaptcha(request):
    res = requests.post('https://www.google.com/recaptcha/api/siteverify',
      data={
        'secret': '6Le6R_YeAAAAAJepBNwXtUxrRpBp1klsk9iiqjB2',
        'response': request.data['captcha_value'],
      }
    )
    return Response(res.json())