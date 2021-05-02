import pytest

from rest_framework.test import APIRequestFactory

from wagtail_rest_pack.comments.models import Comment
from src.wagtail_rest_pack.comments.update import DeleteUpdateCommentAPIView
from .factory import get_existing_related_page
from .help import cleanup_and_prepare, login_as_user, get_user, login_as_superuser

factory = APIRequestFactory()
endpoint = DeleteUpdateCommentAPIView()


@pytest.fixture(autouse=True)
def run_around_tests():
    cleanup_and_prepare()
    yield
    pass

@pytest.mark.django_db
def test_update_not_existing_comment():
    related = get_existing_related_page()
    # given
    update = {
        'body': 'something'
    }
    request = factory.put('/api/v2/comments/999/', update)
    # when
    login_as_user(request)
    response = endpoint.dispatch(request, **{'pk':999})
    # then
    assert response.status_code == 404

@pytest.mark.django_db
def test_update_as_anonymous():
    # given
    updation = {
        'body': 'xx'
    }
    request = factory.put('/api/v2/comments/999/', updation)
    # when
    response = endpoint.dispatch(request, **{'pk':999})
    # then
    assert response.status_code == 403



@pytest.mark.django_db
def test_update_own_comment():
    related = get_existing_related_page()
    # given
    page_id = related['object_id']
    user = get_user()
    new_comment = Comment.objects.create(created_by=user, body='xx',**related)
    update = {
        'body': 'zz'
    }
    request = factory.put('/api/v2/comments/' + str(new_comment.id) + '/', update)
    # when
    login_as_user(request)
    response = endpoint.dispatch(request, **{'pk':new_comment.id})
    # then
    assert response.status_code == 200
    assert Comment.objects.get(id=new_comment.id).body == 'zz'


@pytest.mark.django_db
def test_update_user_comment_as_superuser():
    related = get_existing_related_page()
    # given
    user = get_user()
    new_comment = Comment.objects.create(created_by=user, body='xx',**related)
    update = {
        'body': 'zz'
    }
    request = factory.put('/api/v2/comments/' + str(new_comment.id) + '/', update)
    # when
    login_as_superuser(request)
    response = endpoint.dispatch(request, **{'pk':new_comment.id})
    # then
    assert response.status_code == 200
    assert Comment.objects.get(id=new_comment.id).body == 'zz'
