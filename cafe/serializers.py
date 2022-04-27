from rest_framework import serializers
from .models import Product, Testimonial, CafeInfo, Gallery, About, FeaturedProduct
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from django.contrib.auth import password_validation
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = '__all__'

class CafeInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CafeInfo
        fields = '__all__'

class GallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Gallery
        fields = '__all__'

class AboutSerializer(serializers.ModelSerializer):
    class Meta:
        model = About
        fields = '__all__'

class FeaturedProductSerializer(serializers.ModelSerializer):
    product = ProductSerializer(source='product_id', read_only=True)
    class Meta:
        model =  FeaturedProduct
        fields = ('id', 'product_id', 'product')

class RegisterUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=User.objects.all())]
            )
    password = serializers.CharField(
            write_only=True, required=True, 
            validators=[password_validation.validate_password]
            )
    confirmed_password = serializers.CharField(write_only=True, required=True)
    
    class Meta:
        model = User
        fields = ('email', 'username', 'password', 'confirmed_password')
    
    def validate(self, attrs):
        if attrs['password'] != attrs['confirmed_password']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
        )
        
        user.set_password(validated_data['password'])
        user.save()
        
        return user

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(write_only=True, required=True)
    new_password = serializers.CharField(write_only=True, required=True)
    confirmed_password = serializers.CharField(write_only=True, required=True)

    def validate_old_password(self, value):
        if not self.context['request'].user.check_password(value):
            raise serializers.ValidationError(
                {'old_password': 'The old password is incorrect.'}
            )
        return value

    def validate(self, data):
        if data.get('new_password') != data.get('confirmed_password'):
            raise serializers.ValidationError({'new_password': "The two password fields didn't match."})
        password_validation.validate_password(data.get('new_password'), self.context['request'].user)
        return data

    def update(self, instance, validated_data):
        instance.set_password(validated_data['new_password'])
        instance.save()
        return instance

class ChangeUsernameOrEmailSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True)
    password = serializers.CharField(write_only=True, required=True)

    def validate_email(self, value):
        user = self.context['request'].user
        if User.objects.exclude(pk=user.pk).filter(email=value).exists():
            raise serializers.ValidationError({"email": "This email is already in use."})
        return value

    def validate_username(self, value):
        user = self.context['request'].user
        if User.objects.exclude(pk=user.pk).filter(username=value).exists():
            raise serializers.ValidationError({"username": "This username is already in use."})
        return value
    
    def validate_password(self, value):
        if not self.context['request'].user.check_password(value):
            raise serializers.ValidationError(
                {'password': 'The password is incorrect.'}
            )
        return value

    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        instance.username = validated_data.get('username', instance.username)
        instance.save()

        return instance

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        token['username'] = user.username

        return token