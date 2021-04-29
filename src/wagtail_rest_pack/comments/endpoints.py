from requests import Response
from datetime import datetime

from rest_framework import status
from rest_framework.exceptions import NotAuthenticated
from rest_framework.mixins import CreateModelMixin, ListModelMixin, RetrieveModelMixin, DestroyModelMixin
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet, ViewSetMixin
from rest_framework_extensions.mixins import NestedViewSetMixin
from wagtail.api.v2.utils import BadRequestError
from wagtail.api.v2.views import BaseAPIViewSet
from wagtail.core.models import Page
from wagtail_rest_pack.comments.models import Comment
from wagtail_rest_pack.comments.serializers import CommentSerializer
from wagtail_rest_pack.recaptcha.models import get_recaptcha_instance
from django.contrib.contenttypes.models import ContentType
from rest_framework.generics import GenericAPIView, DestroyAPIView
from rest_framework.response import Response
from django.http import HttpResponseForbidden, HttpResponseBadRequest, HttpResponseNotFound


class CommentsEndpoint(GenericAPIView):
    permission_classes = [AllowAny]
    model = Comment
    serializer_class = CommentSerializer

    def verify_owner(self, comment):
        if comment.created_by is None:
            raise NotAuthenticated()
        if comment.created_by.pk != self.request.user.pk:
            raise NotAuthenticated()

    def get(self, request, format=None):
        qs = self.get_queryset()
        serializer = self.serializer_class(qs, many=True)
        return Response(serializer.data)

    def delete(self, request):
        if not self.request.user.is_authenticated:
            raise NotAuthenticated()
        commentId = request.data.get('id', None)
        if commentId is None:
            return HttpResponseBadRequest('Comment id is missing')
        try:
            comment = Comment.objects.get(id=commentId)
        except Comment.DoesNotExist:
            return HttpResponseNotFound()

        if self.request.user.is_superuser:
            self.perform_destroy()
            return Response(status=status.HTTP_204_NO_CONTENT)

        self.verify_owner(comment)
        self.perform_destroy(comment)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance: Comment):
        instance.delete()

    def get_queryset(self):
        try:
            idType = self.get_content_type_id()
        except ContentType.DoesNotExist:
            return Comment.objects.none()
        object_id = self.get_object_id()
        qs = Comment.objects.filter(content_type=idType,object_id=object_id,parent_id=None)
        return self.paginate_queryset(qs)

    def get_object_id(self):
        content_id = self.request.query_params.get('content_id',None)
        if content_id is None:
            raise BadRequestError('Content id is not valid')
        return int(content_id)

    def get_content_type_id(self):
        content_type = self.request.query_params.get('content_type',None)
        if content_type is None or not isinstance(content_type,str):
            raise BadRequestError('both content_type and content_id must be supplied.')
        content_id = self.get_object_id()
        splitted = content_type.lower().split('.')
        if len(splitted) > 2:
            raise BadRequestError('Invalid content_type.')
        app_label, model = splitted
        return ContentType.objects.values_list('id').get(app_label=app_label,model=model)[0]

    def put(self, request):
        pass

    def post(self, request):
        request.data['object_id'] = self.get_object_id()
        request.data['content_type_id'] = self.get_content_type_id()
        # if not self.request.user.is_authenticated:
        #     get_recaptcha_instance().verify(request)
        serializer = self.get_serializer(data=request.data, many=False)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
