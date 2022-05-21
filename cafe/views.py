from rest_framework.generics import RetrieveUpdateAPIView, UpdateAPIView, GenericAPIView
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from .serializers import *
from rest_framework.permissions import (IsAuthenticated, IsAuthenticatedOrReadOnly,
                                        BasePermission, SAFE_METHODS)
from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status, exceptions
from rest_framework.parsers import MultiPartParser, FormParser  # forms
import requests
from rest_framework_simplejwt.views import TokenObtainPairView
from django.conf import settings
from django.contrib.auth.password_validation import validate_password, get_password_validators
from django.core.exceptions import ValidationError
from django_rest_passwordreset.signals import pre_password_reset, post_password_reset
from django_rest_passwordreset.models import ResetPasswordToken
from django.core.mail import EmailMultiAlternatives
from django.dispatch import receiver
from django.template.loader import render_to_string
from django_rest_passwordreset.signals import reset_password_token_created


# Create your views here.
class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [IsAuthenticatedOrReadOnly]

    # def perform_create(self, serializer):
    #     serializer.save(creator=self.request.user)


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
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_object(self):
        return get_object_or_404(self.get_queryset(), pk='1')


class GalleryViewSet(ModelViewSet):
    queryset = Gallery.objects.all()
    serializer_class = GallerySerializer
    parser_classes = (MultiPartParser, FormParser)
    http_method_names = ['get', 'post', 'delete', 'head', 'options']
    permission_classes = [IsAuthenticatedOrReadOnly]

class FeaturedProductViewSet(ModelViewSet):
    queryset = FeaturedProduct.objects.select_related('product_id').all()
    serializer_class = FeaturedProductSerializer
    http_method_names = ['get', 'put', 'patch', 'head', 'options']
    permission_classes = [IsAuthenticatedOrReadOnly]

class FeaturedReviewViewSet(ModelViewSet):
    queryset = FeaturedReview.objects.select_related('review_id').all()
    serializer_class = FeaturedReviewSerializer
    http_method_names = ['get', 'put', 'patch', 'head', 'options']
    permission_classes = [IsAuthenticatedOrReadOnly]

# class RegisterView(CreateAPIView):
#    queryset = User.objects.all()
#    serializer_class = RegisterUserSerializer


class ChangePasswordView(UpdateAPIView):
    serializer_class = ChangePasswordSerializer
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()

    def get_object(self):
        return get_object_or_404(self.get_queryset(), pk='4')


class ChangeUsernameOrEmailView(UpdateAPIView):
    serializer_class = ChangeUsernameOrEmailSerializer
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()

    def get_object(self):
        return get_object_or_404(self.get_queryset(), pk='4')


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
    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class CustomResetPasswordConfirm(GenericAPIView):
    serializer_class = CustomPasswordTokenSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        password = serializer.validated_data['password']
        token = serializer.validated_data['token']

        # find token
        reset_password_token = ResetPasswordToken.objects.filter(
            key=token).first()

        # change users password (if we got to this code it means that the user is_active)
        if reset_password_token.user.eligible_for_reset():
            pre_password_reset.send(
                sender=self.__class__, user=reset_password_token.user)
            try:
                # validate the password against existing validators
                validate_password(
                    password,
                    user=reset_password_token.user,
                    password_validators=get_password_validators(
                        settings.AUTH_PASSWORD_VALIDATORS)
                )
            except ValidationError as e:
                # raise a validation error for the serializer
                raise exceptions.ValidationError({
                    'password': e.messages
                })

            reset_password_token.user.set_password(password)
            reset_password_token.user.save()
            post_password_reset.send(
                sender=self.__class__, user=reset_password_token.user)

        # Delete all password reset tokens for this user
        ResetPasswordToken.objects.filter(
            user=reset_password_token.user).delete()

        return Response(status=status.HTTP_200_OK)


@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):

    context = {
        'username': reset_password_token.user.username,
        'email': reset_password_token.user.email,
        'token': reset_password_token.key
    }

    email_html_message = render_to_string('user_reset_password.html', context)
    email_plaintext_message = render_to_string(
        'user_reset_password.txt', context)

    msg = EmailMultiAlternatives(
        # title:
        "Password Reset for The Fisherman's Cafe",
        # message:
        email_plaintext_message,
        "The Fisherman's Cafe <noreplytfcafe@gmail.com>",
        # to:
        ['thefishermanscafe@gmail.com']
        # [reset_password_token.user.email]
    )

    msg.attach_alternative(email_html_message, "text/html")
    msg.send()
