from rest_framework import serializers
from wagtail.core import blocks
from django.utils.translation import gettext_lazy as _
from wagtail.images.blocks import ImageChooserBlock
from wagtail_rest_pack.streamfield.serializers import SettingsStreamFieldSerializer


def gallery_image_block():
    return GalleryImageSerializer.block_definition()


class GalleryImageSerializer(serializers.Serializer):
    block_name = 'gallery_image'

    @staticmethod
    def block_definition():
        return GalleryImageSerializer.block_name, GalleryImageBlock(icon='image', label=_('Image'))

    class Meta:
        fields = ('',)


class GalleryImageBlock(blocks.StructBlock):

    def __init__(self, *args, **kwargs):
        super().__init__(local_blocks=[
            ('image', ImageChooserBlock()),
        ], **kwargs)

