from django.db import models
from modelcluster.fields import ParentalKey
from taggit.models import TaggedItemBase
from wagtail.core.models import Page


class PageTag(TaggedItemBase):
    content_object = ParentalKey(
        Page,
        related_name='tagged_pages',
        on_delete=models.CASCADE,
    )

    class Meta:
        app_label = 'wagtail_rest_pack'
