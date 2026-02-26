from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, NewsFeedViewSet, MosqueViewSet, SkillViewSet, CustomAuthToken

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'news', NewsFeedViewSet, basename='news')
router.register(r'mosques', MosqueViewSet, basename='mosque')
router.register(r'skills', SkillViewSet, basename='skill')

urlpatterns = [
    path('auth/login/', CustomAuthToken.as_view(), name='api_token_auth'),
    path('', include(router.urls)),
]
