# Generated by Django 3.1.8 on 2021-05-12 13:54

from django.db import migrations
import wagtail.core.blocks
import wagtail.core.fields
import wagtail_rest_pack.streamfield.image


class Migration(migrations.Migration):

    dependencies = [
        ('streamfield', '0004_gallery'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gallery',
            name='stream',
            field=wagtail.core.fields.StreamField([('gallery_image', wagtail.core.blocks.StructBlock([('image', wagtail.images.blocks.ImageChooserBlock())], icon='image', label='Image'))]),
        ),
    ]
