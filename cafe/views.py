from rest_framework.generics import ListCreateAPIView, RetrieveDestroyAPIView, RetrieveUpdateDestroyAPIView, RetrieveUpdateAPIView
from .models import *
from .serializers import *
from django.shortcuts import get_object_or_404

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
