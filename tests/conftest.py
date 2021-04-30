from django.conf import settings, global_settings
from . import settings as mysettings

def pytest_configure():

    settings.configure(mysettings)
