from rest_framework import generics
from wagtail.core.models import Page
from wagtail.search.utils import parse_query_string
from django.http import HttpResponseNotFound, HttpResponseBadRequest, HttpResponse
import json
from wagtail_rest_pack.page_banner.serializers import RFBanneredChildrenSerializer


class SearchView(generics.RetrieveAPIView):
    def get_serializer_class(self):
        return RFBanneredChildrenSerializer

    def get_queryset(self):
        return Page.objects.live().public()

    def get(self, request, *args, **kwargs):
        query_string = request.GET.get('q')
        if query_string is None:
            return HttpResponseBadRequest()
        filters, query = parse_query_string(query_string)

        # Published filter
        # An example filter that accepts either `published:yes` or `published:no` and filters the pages accordingly
        # published_filter = filters.get('published')
        # published_filter = published_filter and published_filter.lower()
        # if published_filter in ['yes', 'true']:
        #     pages = pages.filter(live=True)
        # elif published_filter in ['no', 'false']:
        #     pages = pages.filter(live=False)

        # Search
        pages = self.get_queryset().search(query)
        result = {
            'children': self.get_serializer(many=True).to_representation(pages)
        }

        return HttpResponse(json.dumps(result), content_type="application/json")