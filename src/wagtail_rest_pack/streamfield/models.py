from django.db import models
from modelcluster.models import ClusterableModel
from wagtail.admin.edit_handlers import FieldPanel, StreamFieldPanel
from wagtail.core.blocks import StreamBlock
from wagtail.core.fields import StreamField
from wagtail.snippets.models import register_snippet

from wagtail_rest_pack.streamfield.image import  GalleryImageSerializer
from wagtail_rest_pack.streamfield.serializers import SettingsStreamFieldSerializer
from django.utils.translation import gettext_lazy as _

from wagtail_rest_pack.streamfield.image import gallery_image_block


@register_snippet
class Gallery(ClusterableModel):
    name = models.CharField(max_length=120, help_text=_('Gallery name'))
    stream = StreamField(block_types=[
        gallery_image_block()
    ])
    panels = [
        FieldPanel('name'),
        StreamFieldPanel('stream'),
    ]

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _('Gallery')
        verbose_name_plural = _('Galleries')
