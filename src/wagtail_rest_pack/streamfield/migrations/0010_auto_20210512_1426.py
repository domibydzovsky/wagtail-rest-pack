# Generated by Django 3.1.8 on 2021-05-12 14:26

from django.db import migrations
import wagtail.blocks
import wagtail.fields
import wagtail.images.blocks


class Migration(migrations.Migration):

    dependencies = [
        ('streamfield', '0009_auto_20210512_1404'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gallery',
            name='stream',
            field=wagtail.fields.StreamField([('gallery_image', wagtail.blocks.StructBlock([('id', wagtail.images.blocks.ImageChooserBlock(icon='image', label='Image'))]))]),
        ),
    ]
