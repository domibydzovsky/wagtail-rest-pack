# Generated by Django 3.1.8 on 2021-05-12 14:02

from django.db import migrations
import wagtail.core.blocks
import wagtail.core.fields
import wagtail.images.blocks


class Migration(migrations.Migration):

    dependencies = [
        ('streamfield', '0007_auto_20210512_1401'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gallery',
            name='stream',
            field=wagtail.core.fields.StreamField([('gallery_image', wagtail.core.blocks.StructBlock([('image', wagtail.images.blocks.ImageChooserBlock())], icon='image', label='Image'))]),
        ),
    ]