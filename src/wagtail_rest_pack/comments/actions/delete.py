from django.http import HttpResponseBadRequest, HttpResponseNotFound
from rest_framework.exceptions import NotAuthenticated, NotFound
from rest_framework.request import Request
from rest_framework.response import Response

from wagtail_rest_pack.comments.models import Comment

from rest_framework import status

class CommentDeletion:
    def __init__(self, request: Request):
        self.request = request

    def verify_owner(self, comment):
        if comment.created_by is None:
            raise NotAuthenticated()
        if comment.created_by.pk != self.request.user.pk:
            raise NotAuthenticated()

    def perform_destroy(self, comment):
        comment.delete()

    def delete(self, commentId: int) -> Response:
        if not self.request.user.is_authenticated:
            raise NotAuthenticated()
        try:
            comment = Comment.objects.get(id=commentId)
        except Comment.DoesNotExist:
            raise NotFound()

        if self.request.user.is_superuser:
            self.perform_destroy(comment)
            return Response(status=status.HTTP_204_NO_CONTENT)

        self.verify_owner(comment)
        self.perform_destroy(comment)
        return Response(status=status.HTTP_204_NO_CONTENT)