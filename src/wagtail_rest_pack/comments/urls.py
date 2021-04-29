from django.urls import include, path, re_path

from wagtail_rest_pack.comments.endpoints import CommentsEndpoint

urlpatterns = [
    path('', CommentsEndpoint.as_view())
]