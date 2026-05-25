from django.contrib import admin
from .models import User, Category, Tag, Post, Comment, Like


# ---------------- USER ADMIN ----------------
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'role')
    search_fields = ('username', 'email')


# ---------------- CATEGORY ADMIN ----------------
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')


# ---------------- TAG ADMIN ----------------
@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')


# ---------------- POST ADMIN ----------------
@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'category', 'created_at')
    search_fields = ('title',)
    list_filter = ('category', 'created_at')


# ---------------- COMMENT ADMIN ----------------
@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('user', 'post', 'created_at')


# ---------------- LIKE ADMIN ----------------
@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):
    list_display = ('user', 'post', 'created_at')