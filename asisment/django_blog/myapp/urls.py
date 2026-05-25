from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    RegisterViewSet,
    UserViewSet,
    CategoryViewSet,
    TagViewSet,
    PostViewSet,
    CommentViewSet,
    LikeViewSet
)

router = DefaultRouter()

router.register(r'register', RegisterViewSet, basename='register')
router.register(r'users', UserViewSet, basename='users')
router.register(r'categories', CategoryViewSet, basename='categories')
router.register(r'tags', TagViewSet, basename='tags')
router.register(r'posts', PostViewSet, basename='posts')
router.register(r'comments', CommentViewSet, basename='comments')
router.register(r'likes', LikeViewSet, basename='likes')

urlpatterns = [
    path('', include(router.urls)),
]