from django.shortcuts import render,redirect,get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout
from .models import Post,Comment,Follow
from .forms import PostForm
from django.contrib.auth.decorators import login_required


@login_required
def blog_list(request):

    query = request.GET.get('q')

    if query:
        posts = Post.objects.filter(author=request.user, title__icontains=query)
    else:
        posts = Post.objects.filter(author=request.user)

    return render(request,'blog_list.html',{'posts':posts})

def create_post(request):

    if request.method=="POST":

        form=PostForm(request.POST,request.FILES)

        if form.is_valid():

            post=form.save(commit=False)
            post.author=request.user
            post.save()

            return redirect('blog_list')

    else:

        form=PostForm()

    return render(request,'create_post.html',{'form':form})

@login_required
def blog_detail(request,id):

    post=get_object_or_404(Post,id=id)

    return render(request,'blog_detail.html',{'post':post})

def like_post(request,post_id):

    post=Post.objects.get(id=post_id)

    if request.user in post.likes.all():
        post.likes.remove(request.user)
    else:
        post.likes.add(request.user)

    return redirect('blog_detail',id=post_id)

def add_comment(request,post_id):

    if request.method=="POST":

        text=request.POST.get('comment')

        post=Post.objects.get(id=post_id)

        Comment.objects.create(
            user=request.user,
            post=post,
            text=text
        )

    return redirect('blog_detail',id=post_id)

@login_required
def delete_post(request,id):

    post = Post.objects.get(id=id)

    if request.user == post.author:
        post.delete()

    return redirect('blog_list')

def register_user(request):

    if request.method=="POST":

        username=request.POST.get('username')
        email=request.POST.get('email')
        password=request.POST.get('password')

        User.objects.create_user(
            username=username,
            email=email,
            password=password
        )

        return redirect('login')

    return render(request,'register.html')

def login_user(request):

    if request.method=="POST":

        username=request.POST.get('username')
        password=request.POST.get('password')

        user=authenticate(request,username=username,password=password)

        if user is not None:

            login(request,user)

            return redirect('blog_list')

    return render(request,'login.html')

def logout_user(request):

    logout(request)

    return redirect('login')

def follow_user(request, user_id):

    user_to_follow = get_object_or_404(User, id=user_id)

    Follow.objects.get_or_create(
        follower=request.user,
        following=user_to_follow
    )

    return redirect('blog_list')

@login_required
def edit_post(request, post_id):

    post = get_object_or_404(Post, id=post_id)

    if request.method == "POST":
        post.title = request.POST.get('title')
        post.content = request.POST.get('content')

        if 'image' in request.FILES:
            post.image = request.FILES['image']

        post.save()

        return redirect('blog_detail', id=post.id)   # ✅ FIX HERE

    return render(request, 'blog_detail.html', {'post': post, 'edit_mode': True})