from rest_framework.request import Request
from rest_framework.response import Response

from wagtail_rest_pack.comments.models import Comment


class ViewComments:

    def __init__(self, request: Request, paginator):
        self.request= request
        self.paginator = paginator

    def get(self, content_type_id, object_id, get_serializer):
        qs = self.get_queryset(content_type_id, object_id)
        serializer = get_serializer(qs, many=True)
        return Response(serializer.data)

    def get_queryset(self, content_type_id, object_id):
        qs = Comment.objects.filter(content_type=content_type_id,object_id=object_id,parent_id=None)
        return self.paginator.paginate_queryset(qs, self.request)