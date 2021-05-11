from wagtail.snippets.models import register_snippet
from taggit.models import Tag as TaggitTag


@register_snippet
class Tag(TaggitTag):
    class Meta:
        verbose_name = "Klíčové slovo"
        verbose_name_plural = "Klíčová slova"
        proxy = True
