
from rest_framework import serializers, generics
from rest_framework.permissions import AllowAny
from wagtail_rest_pack.exception.handler import custom_exception_handler
from wagtail_rest_pack.streamfield.serializers import SettingsStreamFieldSerializer

from .models import FormBuilder


class GetFormBuilderSerializer(serializers.ModelSerializer):
    stream = SettingsStreamFieldSerializer()

    class Meta:
        model = FormBuilder
        fields = ['name', 'display_name', 'security', 'stream']


class FormView(generics.RetrieveAPIView):

    permission_classes = [AllowAny]
    queryset = FormBuilder.objects.all()
    lookup_field = 'name'
    lookup_url_kwarg = 'name'
    serializer_class = GetFormBuilderSerializer

    def get_exception_handler(self):
        return custom_exception_handler
