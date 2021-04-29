
1. Add to installed apps
```python
INSTALLED_APPS = [
    ...,
    'wagtail_rest_pack.comments'
]
```

2. Register modeladmin in `wagtail_hook.py`
```python
from wagtail.contrib.modeladmin.options import modeladmin_register
from wagtail_rest_pack.comments.admin import CommentsModelAdmin

modeladmin_register(CommentsModelAdmin)
```

3. This model uses RecaptchaVerifier to allow not authenticated users to add a comment. Please specify your own verifier in settings.
```python
RECAPTCHA_VERIFIER = 'wagtail_rest_pack.recaptcha.google.GoogleRecaptchaVerifier'
```

4. Include Endpoint in urlpatterns:
```python
from django.conf.urls import include, url
from wagtail_rest_pack.comments import urls as comments_urls 

urlpattern = [
    ...,
    url('api/v2/comments', include(comments_urls)),
]

```

4. Migrate a database
```python
python3 manage.py migrate
```