from django.urls import path, include
from rest_framework.routers import SimpleRouter
from . import views
from rest_framework_simplejwt.views import TokenRefreshView
from django_rest_passwordreset.views import ResetPasswordRequestToken, ResetPasswordValidateToken

router = SimpleRouter()
router.register(r'product', views.ProductViewSet, basename='product')
router.register(r'testimonial', views.TestimonialViewSet, basename='testimonial')
router.register(r'gallery', views.GalleryViewSet, basename='gallery')
router.register(r'featured', views.FeaturedProductViewSet, basename='featured')
urlpatterns = router.urls

urlpatterns += [
    path('cafeinfo/', views.RetrieveUpdateCafeInfo.as_view(), name='get-update-cafeInfo'),
    path('about/', views.RetrieveUpdateAbout.as_view(), name='get-update-about'),
    path('recaptcha/', views.recaptcha, name="recaptcha"),
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    #path('user/', views.RegisterView.as_view(), name='register-user'),
    path('user/update/password/', views.ChangePasswordView.as_view(), name='change-password'),
    path('user/update/name/', views.ChangeUsernameOrEmailView.as_view(), name='change-username-or-email'),
    path('token/blacklist/', views.BlacklistToken.as_view(), name='blacklist-token'),
    path('password_reset/', ResetPasswordRequestToken.as_view(), name='password_reset'),
    path('password_reset/confirm/', views.CustomResetPasswordConfirm.as_view(), name='password_reset_confirm'),
    path('password_reset/validate_token/', ResetPasswordValidateToken.as_view(), name='password_reset_validate_token'),
]
