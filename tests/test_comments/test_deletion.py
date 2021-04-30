import pytest

from rest_framework.test import APIRequestFactory

from wagtail_rest_pack.comments.models import Comment
from src.wagtail_rest_pack.comments.endpoints import CommentsEndpoint
from .factory import get_existing_related_page
from .help import cleanup_and_prepare, get_user, login_as_superuser, login_as_user

factory = APIRequestFactory()
endpoint = CommentsEndpoint()


@pytest.fixture(autouse=True)
def run_around_tests():
    cleanup_and_prepare()
    yield
    pass


@pytest.mark.django_db
def test_delete_not_existing_comment():
    # given
    comment = {
        'id': 999
    }
    request = factory.delete('/api/v2/comments/', comment)
    # when
    response = endpoint.dispatch(request)
    # then
    assert response.status_code == 404


@pytest.mark.django_db
def test_delete_comment_not_existing_page():
    # given
    comment = {
        'id': 999
    }
    request = factory.delete('/api/v2/comments/', comment)
    # when
    login_as_user(request)
    response = endpoint.dispatch(request)
    # then
    assert response.status_code == 404


@pytest.mark.django_db
def test_delete_not_existing_comment():
    # given
    comment = {
        'id': 999
    }
    related = get_existing_related_page()
    page_id = related['object_id']
    request = factory.delete('/api/v2/comments/', comment)
    # when
    login_as_user(request)
    response = endpoint.dispatch(request)
    # then
    assert response.status_code == 404


@pytest.mark.django_db
def test_delete_own_comment():
    # given
    related = get_existing_related_page()
    user = get_user()
    new_comment = Comment.objects.create(created_by=user, body='ahoj', **related)
    comment = {
        'id': new_comment.id
    }
    page_id = related['object_id']
    request = factory.delete('/api/v2/comments/', comment)
    # when
    login_as_user(request)
    response = endpoint.dispatch(request)
    # then
    assert response.status_code == 204


@pytest.mark.django_db
def test_delete_comment_as_anonymous():
    # given
    related = get_existing_related_page()
    user = get_user()
    new_comment = Comment.objects.create(created_by=user, body='ahoj', **related)
    comment = {
        'id': new_comment.id
    }
    page_id = related['object_id']
    request = factory.delete('/api/v2/comments/', comment)
    # when
    response = endpoint.dispatch(request)
    # then
    assert response.status_code == 403


@pytest.mark.django_db
def test_delete_user_comment_as_superuser():
    # given
    related = get_existing_related_page()
    user = get_user()
    new_comment = Comment.objects.create(created_by=user, body='ahoj', **related)
    comment = {
        'id': new_comment.id
    }
    page_id = related['object_id']
    request = factory.delete('/api/v2/comments/', comment)
    # when
    login_as_superuser(request)
    response = endpoint.dispatch(request)
    # then
    assert response.status_code == 204


@pytest.mark.django_db
def test_delete_anonymous_comment_as_superuser():
    # given
    related = get_existing_related_page()
    new_comment = Comment.objects.create(created_by=None, body='ahoj', **related)
    comment = {
        'id': new_comment.id
    }
    page_id = related['object_id']
    request = factory.delete('/api/v2/comments/', comment)
    # when
    login_as_superuser(request)
    response = endpoint.dispatch(request)
    # then
    assert response.status_code == 204
