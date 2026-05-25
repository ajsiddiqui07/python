from django.shortcuts import render

# Create your views here.


def perform_create(self, serializer):
    serializer.save(user=self.request.user)

from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import action

from .models import User, Category, Tag, Post, Comment, Like
from .sirealizer import (
    UserSerializer,
    RegisterSerializer,
    CategorySerializer,
    TagSerializer,
    PostSerializer,
    CommentSerializer,
    LikeSerializer
)


# ---------------- REGISTER VIEW ----------------
class RegisterViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]


# ---------------- USER VIEW ----------------
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    # FOLLOW / UNFOLLOW
    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def follow(self, request, pk=None):
        user_to_follow = self.get_object()

        if request.user == user_to_follow:
            return Response({"error": "You cannot follow yourself"}, status=400)

        if user_to_follow in request.user.following.all():
            request.user.following.remove(user_to_follow)
            return Response({"message": "Unfollowed"})
        else:
            request.user.following.add(user_to_follow)
            return Response({"message": "Followed"})


# ---------------- CATEGORY VIEW ----------------
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


# ---------------- TAG VIEW ----------------
class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


# ---------------- POST VIEW ----------------
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('-created_at')
    serializer_class = PostSerializer

    # Only logged-in users can create/update/delete
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAuthenticated()]
        return []

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    # FILTERS
    def get_queryset(self):
        queryset = Post.objects.all().order_by('-created_at')

        author = self.request.query_params.get('author')
        category = self.request.query_params.get('category')

        if author:
            queryset = queryset.filter(author__id=author)

        if category:
            queryset = queryset.filter(category__id=category)

        return queryset

    # LIKE / UNLIKE
    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def like(self, request, pk=None):
        post = self.get_object()

        if request.user in post.likes.all():
            post.likes.remove(request.user)
            return Response({"message": "Unliked"})
        else:
            post.likes.add(request.user)
            return Response({"message": "Liked"})


# ---------------- COMMENT VIEW ----------------
class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all().order_by('-created_at')
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# ---------------- LIKE VIEW (OPTIONAL) ----------------
class LikeViewSet(viewsets.ModelViewSet):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer

def perform_update(self, serializer):
    if self.request.user != serializer.instance.author:
        raise PermissionError("You are not allowed")
    serializer.save()

def perform_destroy(self, instance):
    if self.request.user != instance.author:
        raise PermissionError("You are not allowed")
    instance.delete()