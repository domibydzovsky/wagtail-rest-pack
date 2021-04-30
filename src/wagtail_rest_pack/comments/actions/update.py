from datetime import datetime
from rest_framework.exceptions import NotAuthenticated, NotFound
from rest_framework.response import Response
from wagtail.api.v2.utils import BadRequestError

from wagtail_rest_pack.comments.models import Comment
from rest_framework import status


class CommentUpdate():
    def __init__(self, request):
        self.request = request

    def verify_owner(self, comment):
        if comment.created_by is None:
            raise NotAuthenticated()
        if comment.created_by.pk != self.request.user.pk:
            raise NotAuthenticated()

    def perform_update(self, comment):
        comment.save()

    def update(self, comment_id) -> Response:
        new_body = self.request.data.get('body', None)
        if new_body is None or not isinstance(new_body, str):
            raise BadRequestError()
        if not self.request.user.is_authenticated:
            raise NotAuthenticated()
        try:
            comment = Comment.objects.get(id=comment_id)
        except Comment.DoesNotExist:
            raise NotFound()
        comment.body = new_body
        comment.updated_on = datetime.now()
        if self.request.user.is_superuser:
            self.perform_update(comment)
            return Response(status=status.HTTP_204_NO_CONTENT)

        self.verify_owner(comment)
        self.perform_update(comment)
        return Response(status=status.HTTP_204_NO_CONTENT)
