import pytest

from rest_framework.test import APIRequestFactory
from django.conf import settings

from wagtail_rest_pack.comments.models import Comment
from wagtail_rest_pack.comments.endpoints import CommentsEndpoint

from .factory import get_existing_related_page
from .help import cleanup_and_prepare

factory = APIRequestFactory()
endpoint = CommentsEndpoint()


@pytest.fixture(autouse=True)
def run_around_tests():
    cleanup_and_prepare()
    yield
    pass


@pytest.mark.django_db
def test_successful_empty_get():
    # given
    Comment.objects.all().delete()
    request = factory.get('/api/v2/comments/?content_type=wagtailcore.Page&content_id=2')
    # when
    response = endpoint.dispatch(request)
    # then
    assert isinstance(response.data, list)
    assert len(response.data) == 0
    assert response.status_code == 200


@pytest.mark.django_db
def test_cannot_get_not_allowed_content_type():
    # given
    Comment.objects.all().delete()
    request = factory.get('/api/v2/comments/?content_type=wagtailcore.Page&content_id=2')
    settings.ALLOWED_COMMENTED_CONTENT_TYPES = ['wagtailcore.Image']
    # when
    response = endpoint.dispatch(request)
    # then
    assert response.status_code == 400


@pytest.mark.django_db
def test_returns_multiple_children_of_a_comment():
    # given
    Comment.objects.all().delete()
    related_page = get_existing_related_page()
    page_id = related_page['object_id']

    parent = Comment.objects.create(body="1", **related_page)
    for x in range(0, 5): Comment.objects.create(body="1", parent_id=parent.id, **related_page)
    request = factory.get('/api/v2/comments/?content_type=wagtailcore.Page&content_id=' + page_id)
    # when
    response = endpoint.dispatch(request)
    # then
    assert response.status_code == 200
    assert len(response.data[0]['children']) == 5
