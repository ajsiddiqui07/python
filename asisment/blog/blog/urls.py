from django.urls import path
from blog.views import *

urlpatterns=[

path('blog_list',blog_list,name='blog_list'),

path('create/',create_post,name='create_post'),

path('post/<int:id>/',blog_detail, name='blog_detail'),

path('delete/<int:id>/',delete_post, name='delete_post'),

path('like/<int:post_id>/',like_post,name='like_post'),

path('comment/<int:post_id>/',add_comment,name='add_comment'),

path('register/',register_user,name='register'),

path('',login_user,name='login'),

path('logout/',logout_user,name='logout'),

path('follow/<int:user_id>/',follow_user, name='follow_user'),

path('edit/<int:post_id>/',edit_post, name='edit_post'),

]