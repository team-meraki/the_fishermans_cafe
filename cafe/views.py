from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView, RetrieveDestroyAPIView, RetrieveUpdateDestroyAPIView, RetrieveUpdateAPIView
from .models import *
from .serializers import *

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

class ListCreateGallery(ListCreateAPIView):
    queryset = Gallery.objects.all()
    serializer_class = GallerySerializer

class RetrieveDestroyGallery(RetrieveDestroyAPIView):
    queryset = Gallery.objects.all()
    serializer_class = GallerySerializer

#@api_view(['GET','POST'])
#def list_create_product(request):
#    if request.method == 'GET':
#        return listProducts()
#    elif request.method == 'POST':
#        return createProduct(request)
#
#@api_view(['GET','DELETE','PUT'])
#def delete_update_product(request, pk):
#    try:
#        product = Product.objects.get(id=pk)
#    except Product.DoesNotExist:
#        return Response(status=status.HTTP_404_NOT_FOUND)
#    if request.method == 'GET':
#        return getProduct(product)
#    elif request.method == 'DELETE':
#        return deleteProduct(product)
#    elif request.method == 'PUT':
#        return updateProduct(request, product)
#@api_view(['GET','POST'])
#def list_create_testimonial(request):
#    if request.method == 'GET':
#        return listTestimonial()
#    elif request.method == 'POST':
#        return createTestimonial(request)
#
#@api_view(['GET','DELETE','PUT'])
#def delete_update_testimonial(request, pk):
#    try:
#        testimonial = Testimonial.objects.get(id=pk)
#    except Testimonial.DoesNotExist:
#        return Response(status=status.HTTP_404_NOT_FOUND)
#    if request.method == 'GET':
#        return getTestimonial(testimonial)
#    elif request.method == 'DELETE':
#        return deleteTestimonial(testimonial)
#    elif request.method == 'PUT':
#        return updateTestimonial(request, testimonial)
#
#@api_view(['GET','PUT'])
#def get_update_cafeInfo(request):
#    try:
#        cafeInfo = CafeInfo.objects.get(id=1)
#    except CafeInfo.DoesNotExist:
#        return Response(status=status.HTTP_404_NOT_FOUND)
#    if request.method == 'GET':
#        return getCafeInfo(cafeInfo)
#    elif request.method == 'PUT':
#        return updateCafeInfo(request, cafeInfo)