# Generated by Django 3.1.8 on 2021-05-12 14:04

from django.db import migrations
import wagtail.fields
import wagtail.images.blocks


class Migration(migrations.Migration):

    dependencies = [
        ('streamfield', '0008_auto_20210512_1402'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gallery',
            name='stream',
            field=wagtail.fields.StreamField([('gallery_image', wagtail.images.blocks.ImageChooserBlock(icon='image', label='Image'))]),
        ),
    ]
