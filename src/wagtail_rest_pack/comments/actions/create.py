from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.serializers import Serializer
from rest_framework import status

from wagtail_rest_pack.recaptcha.models import get_recaptcha_instance


class CommentCreate:
    def __init__(self, request: Request):
        self.request = request

    def create(self, get_serializer):
        if not self.request.user.is_authenticated:
            get_recaptcha_instance().verify(self.request)
        serializer = get_serializer(data=self.request.data, many=False)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)