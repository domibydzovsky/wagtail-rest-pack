
from django.conf.global_settings import *
import os
DEBUG = True
SECRET_KEY='xx'
PROJECT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE_DIR = os.path.dirname(PROJECT_DIR)

REST_FRAMEWORK = {
    'DEFAULT_SCHEMA_CLASS': 'rest_framework.schemas.coreapi.AutoSchema',
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.LimitOffsetPagination',
    'PAGE_SIZE': 100
}
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME":  os.path.join(BASE_DIR, "db.sqlite3"),
    }
}

LOGGING_CONFIG = {}
LOGGING = {}
FORCE_SCRIPT_NAME = 'false'
INSTALLED_APPS = [
    'wagtail.contrib.forms',
    'wagtail.contrib.redirects',
    'wagtail.embeds',
    'wagtail.sites',
    'wagtail.users',
    'wagtail.snippets',
    'wagtail.documents',
    'wagtail.images',
    'wagtail.search',
    'wagtail.admin',
    'wagtail.core',
    'wagtail.api.v2',
    'rest_framework',
    'rest_framework_extensions',
    'rest_framework.authtoken',
    'taggit',

    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.sitemaps',
    'wagtail.contrib.modeladmin',

    'wagtail_rest_pack.sitesettings',
    'wagtail_rest_pack.page_banner',
    'wagtail_rest_pack.breadcrumps',
    'wagtail_rest_pack.comments',
    'wagtail_rest_pack.custom_tag',
]