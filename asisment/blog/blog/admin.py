from django.contrib import admin
from blog.models import *

class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'created_at')

class CommentAdmin(admin.ModelAdmin):
    list_display = ('post', 'user', 'created_at')

admin.site.register(Post, PostAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(Follow)