import pytest

from rest_framework.test import APIRequestFactory
from wagtail.api.v2.utils import BadRequestError
from wagtail.core.models import Page
from django.conf import settings

from src.wagtail_rest_pack.comments.create import CreateCommentAPIView
from .factory import new_comment_data
from .help import cleanup_and_prepare

factory = APIRequestFactory()
endpoint = CreateCommentAPIView()


@pytest.fixture(autouse=True)
def run_around_tests():
    cleanup_and_prepare()
    yield
    pass

@pytest.mark.django_db
def test_comment_can_be_added_with_anonymous_user():
    # given
    page_id = str(list(Page.objects.all())[0].id)
    request = factory.post('/api/v2/comments/' + page_id, new_comment_data(page_id))
    # when
    response = endpoint.dispatch(request)
    # then
    assert response.status_code == 201


@pytest.mark.django_db
def test_comment_can_not_be_added_without_recaptcha():
    # given
    page_id = str(list(Page.objects.all())[0].id)
    request = factory.post('/api/v2/comments/', new_comment_data(page_id))

    # when
    response = endpoint.dispatch(request)
    # then
    assert response.status_code == 400
    assert 'recaptcha' in response.data

@pytest.mark.django_db
def test_comment_can_not_be_added_without_recaptcha():
    # given
    page_id = str(list(Page.objects.all())[0].id)
    request = factory.post('/api/v2/comments/', new_comment_data(page_id))
    settings.RECAPTCHA_VERIFIER = 'wagtail_rest_pack.recaptcha.google.GoogleRecaptchaVerifier'
    # when
    response = endpoint.dispatch(request)
    # then
    assert response.status_code == 403

@pytest.mark.django_db
def test_comment_can_not_be_added_when_model_not_allowed():
    # given
    page_id = str(list(Page.objects.all())[0].id)
    request = factory.post('/api/v2/comments/', new_comment_data(page_id))
    settings.ALLOWED_COMMENTED_CONTENT_TYPES = ['wagtailcore.Page2']
    # when
    try:
        endpoint.dispatch(request)
    except BadRequestError as e:
        assert 'Given content is not allowed to be commented' in e.args[0]
