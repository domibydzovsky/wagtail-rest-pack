from django.contrib.sessions.middleware import SessionMiddleware

from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractUser
from django.contrib.auth import authenticate, login
from wagtail_rest_pack.comments.models import Comment
from django.conf import settings


def cleanup_and_prepare():
    UserModel: AbstractUser = get_user_model()
    UserModel.objects.create_user(username='user', password='pass', email="user@a.com", )
    UserModel.objects.create_superuser(username='admin', password='pass', email="admin@a.com", )
    UserModel.objects.create_user(username='staff', password='pass', email="staff@a.com", is_staff=True)
    Comment.objects.all().delete()
    settings.RECAPTCHA_VERIFIER = 'wagtail_rest_pack.recaptcha.noop.NoopRecaptchaVerifier'
    settings.ALLOWED_COMMENTED_CONTENT_TYPES = ['wagtailcore.Page']


def __login_as(request, user):
    user = authenticate(request, username=user, password='pass')
    request.user = user
    middleware = SessionMiddleware()
    middleware.process_request(request)
    login(request, user)
    request.session.save()


def login_as_staff(request):
    __login_as(request, 'staff')


def login_as_superuser(request):
    __login_as(request, 'admin')


def login_as_user(request):
    __login_as(request, 'user')


def get_user():
    UserModel: AbstractUser = get_user_model()
    return UserModel.objects.get(username='user')


def get_superuser():
    UserModel: AbstractUser = get_user_model()
    return UserModel.objects.get(username='admin')


def get_staffuser():
    UserModel: AbstractUser = get_user_model()
    return UserModel.objects.get(username='staff')
