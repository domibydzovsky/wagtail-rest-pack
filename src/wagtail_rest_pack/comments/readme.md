
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

To get comments of a given object:
```bash
curl -X GET localhost:8000/comments/?content_type=wagtailcore.Page&content_id=2
```

To create a new comment:
```bash
curl -X POST localhost:8000/comments/?content_type=wagtailcore.Page&content_id=2
data: {
  'body': str,
  'parent_id': int or None
}
```
To delete a comment:
```bash
curl -X DELETE localhost:8000/comments/
data: {
  'id': int
}
```

To update a comment:
```bash
curl -X PUT localhost:8000/comments/
data: {
  'id': int,
  'body': str
}
```