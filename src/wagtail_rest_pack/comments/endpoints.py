from xml.dom import ValidationErr

from requests import Response
from datetime import datetime

from rest_framework import status
from rest_framework.exceptions import NotAuthenticated, NotFound
from django.core.exceptions import ValidationError

from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet, ViewSetMixin
from wagtail.api.v2.utils import BadRequestError
from wagtail_rest_pack.comments.models import Comment
from wagtail_rest_pack.comments.serializers import CommentSerializer
from wagtail_rest_pack.recaptcha.models import get_recaptcha_instance
from django.contrib.contenttypes.models import ContentType
from rest_framework.generics import GenericAPIView
from django.http import HttpResponseForbidden, HttpResponseBadRequest, HttpResponseNotFound
from django.conf import settings
from wagtail_rest_pack.comments.actions.create import CommentCreate
from wagtail_rest_pack.comments.actions.delete import CommentDeletion
from wagtail_rest_pack.comments.actions.view import ViewComments
from wagtail_rest_pack.comments.actions.update import CommentUpdate


class CommentsEndpoint(GenericAPIView):
    permission_classes = [AllowAny]
    model = Comment
    serializer_class = CommentSerializer
    queryset = Comment.objects.none()

    def get(self, request, format=None):
        get_view = ViewComments(request, self.paginator)
        content_type_id = self.get_content_type_id()
        object_id = self.get_object_id()
        return get_view.get(content_type_id, object_id, self.get_serializer)

    def delete(self, request):
        commentId = self.request.data.get('id', None)
        if commentId is None:
            return HttpResponseBadRequest('Comment id is missing')
        return CommentDeletion(request).delete(commentId)

    def put(self, request):
        comment_id = self.request.data.get('id', None)
        if comment_id is None:
            return HttpResponseBadRequest('Comment id is missing')
        return CommentUpdate(request).update(comment_id)

    def post(self, request):
        if hasattr(request.data, '_mutable'):
            _mutable = request.data._mutable
            request.data._mutable = True
        request.data['object_id'] = self.get_object_id()
        request.data['content_type_id'] = self.get_content_type_id()
        if hasattr(request.data, '_mutable'):
            request.data._mutable = _mutable
        return CommentCreate(request).create(self.get_serializer)

    def get_object_id(self):
        content_id = self.request.query_params.get('content_id',None)
        if content_id is None:
            raise BadRequestError('Content id is not valid')
        return int(content_id)

    def get_content_type_id(self):
        content_type = self.request.query_params.get('content_type',None)
        if content_type not in getattr(settings, 'ALLOWED_COMMENTED_CONTENT_TYPES', []):
            raise BadRequestError('Given content is not allowed to be commented.')
        if content_type is None or not isinstance(content_type,str):
            raise BadRequestError('both content_type and content_id must be supplied.')
        splitted = content_type.lower().split('.')
        if len(splitted) > 2:
            raise BadRequestError('Invalid content_type.')
        app_label, model = splitted
        object_id = self.get_object_id()
        content_type_obj = ContentType.objects.get(app_label=app_label,model=model)
        try:
            content_type_obj.get_object_for_this_type(id=object_id)
        except content_type_obj.model_class().DoesNotExist:
            raise BadRequestError('Given combination of content_type and content_id does not exist')
        return ContentType.objects.values_list('id').get(app_label=app_label,model=model)[0]

    def handle_exception(self, exc):
        if isinstance(exc, (NotFound, ContentType.DoesNotExist,)):
            data = {'message': str(exc)}
            return Response(data, status=status.HTTP_404_NOT_FOUND)
        elif isinstance(exc, BadRequestError):
            data = {'message': str(exc)}
            return Response(data, status=status.HTTP_400_BAD_REQUEST)
        elif isinstance(exc, ValidationError):
            data = {'message': str(exc)}
            return Response(data, status=status.HTTP_400_BAD_REQUEST)
        return super().handle_exception(exc)