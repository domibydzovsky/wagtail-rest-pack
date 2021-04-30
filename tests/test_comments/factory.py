from django.contrib.contenttypes.models import ContentType
from wagtail.core.models import Page


def new_comment_data():
    return {
        'body': 'Ahoj'
    }


def get_existing_related_page():
    page_id = str(list(Page.objects.all())[0].id)
    content_type = ContentType.objects.get(app_label='wagtailcore', model='page')
    return {'content_type_id': content_type.id, 'object_id': page_id}
