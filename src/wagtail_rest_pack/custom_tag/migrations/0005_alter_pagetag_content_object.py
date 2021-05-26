# Generated by Django 3.2.3 on 2021-05-26 18:16

from django.db import migrations
import django.db.models.deletion
import modelcluster.fields


class Migration(migrations.Migration):

    dependencies = [
        ('wagtailcore', '0062_comment_models_and_pagesubscription'),
        ('custom_tag', '0004_pagetag'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pagetag',
            name='content_object',
            field=modelcluster.fields.ParentalKey(on_delete=django.db.models.deletion.CASCADE, related_name='custom_tag_pagetag_items', to='wagtailcore.page'),
        ),
    ]
