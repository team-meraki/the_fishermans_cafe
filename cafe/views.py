from rest_framework.generics import CreateAPIView, RetrieveUpdateAPIView, UpdateAPIView
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from .serializers import *
from rest_framework.permissions import ( IsAuthenticated, IsAuthenticatedOrReadOnly, 
BasePermission, SAFE_METHODS )
from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import requests
from rest_framework_simplejwt.views import TokenObtainPairView

# Create your views here.
class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class CustomerTestimonialPermission(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS + ('POST',)

class TestimonialViewSet(ModelViewSet):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer
    permission_classes = [CustomerTestimonialPermission]

class RetrieveUpdateCafeInfo(RetrieveUpdateAPIView):
    queryset = CafeInfo.objects.all()
    serializer_class = CafeInfoSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_object(self):
        return get_object_or_404(self.get_queryset(), pk='1')

class GalleryViewSet(ModelViewSet):
    queryset = Gallery.objects.all()
    serializer_class = GallerySerializer
    http_method_names = ['get', 'post', 'delete', 'head', 'options']
    permission_classes = [IsAuthenticatedOrReadOnly]

class RetrieveUpdateAbout(RetrieveUpdateAPIView):
    queryset = About.objects.all()
    serializer_class = AboutSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_object(self):
        return get_object_or_404(self.get_queryset(), pk='1')

class FeaturedProductViewSet(ModelViewSet):
    queryset = FeaturedProduct.objects.select_related('product_id').all()
    serializer_class = FeaturedProductSerializer
    http_method_names = ['get', 'put', 'patch', 'head', 'options']
    permission_classes = [IsAuthenticatedOrReadOnly]

class RegisterView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterUserSerializer

class ChangePasswordView(UpdateAPIView):
    serializer_class = ChangePasswordSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

class ChangeUsernameOrEmailView(UpdateAPIView):
    serializer_class = ChangeUsernameOrEmailSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

@api_view(['POST'])
def recaptcha(request):
    res = requests.post('https://www.google.com/recaptcha/api/siteverify',
      data={
        'secret': '6Le6R_YeAAAAAJepBNwXtUxrRpBp1klsk9iiqjB2',
        'response': request.data['captcha_value'],
      }
    )
    return Response(res.json())

class BlacklistToken(APIView):
    def post(request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer