from rest_framework import serializers
from .models import User, Category, Tag, Post, Comment, Like


# ---------------- USER SERIALIZER ----------------
class UserSerializer(serializers.ModelSerializer):
    followers_count = serializers.SerializerMethodField()
    following_count = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'role',
            'bio', 'profile_pic',
            'followers_count', 'following_count'
        ]

    def get_followers_count(self, obj):
        return obj.followers.count()

    def get_following_count(self, obj):
        return obj.following.count()


# ---------------- REGISTER SERIALIZER ----------------
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


# ---------------- CATEGORY SERIALIZER ----------------
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


# ---------------- TAG SERIALIZER ----------------
class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'


# ---------------- COMMENT SERIALIZER ----------------
class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'user', 'post', 'content', 'created_at', 'updated_at']


# ---------------- POST SERIALIZER ----------------
class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    total_likes = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = [
            'id', 'author', 'title', 'content', 'cover_image',
            'category', 'tags',
            'created_at', 'updated_at',
            'total_likes', 'comments'
        ]

    def get_total_likes(self, obj):
        return obj.likes.count()


# ---------------- LIKE SERIALIZER ----------------
class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = '__all__'