from rest_framework.fields import SerializerMethodField
from wagtail.api.v2 import serializers

from wagtail_rest_pack.comments.models import Comment

from django.core.exceptions import ValidationError

class CommentSerializer(serializers.BaseSerializer):
    children = SerializerMethodField('_get_children')

    allow_null = True
    many = True
    meta_fields = ['created_on']

    class Meta:
        model = Comment
        fields = ('id', 'name', 'body', 'created_on', 'children', 'is_staff')

    def create(self, validated_data):
        object_id = self.context['request'].data['object_id']
        content_type_id = self.context['request'].data['content_type_id']
        user = self.context['request'].user
        if user.is_anonymous:
            user = None
        direct_parent = None
        parent_id = self.context['request'].data.get('parent_id', None)
        if parent_id is not None:
            try:
                direct_parent = Comment.objects.get(id=parent_id)
            except Comment.DoesNotExist:
                raise ValidationError('Given parent does not exist.')
            if direct_parent.parent is not None:
                raise ValidationError('Only 2 level comment structure is allowed.')
        return Comment.objects.create(**validated_data, object_id=object_id, content_type_id=content_type_id, created_by=user, parent=direct_parent)
    
    def update(self, instance, validated_data):
        super(CommentSerializer, self).update(instance, validated_data)

    def _get_children(self, obj):
        sub_comments = Comment.objects.filter(parent_id=obj.id).order_by('created_on')
        serializer = CommentSerializer(sub_comments, many=True)
        return serializer.data
