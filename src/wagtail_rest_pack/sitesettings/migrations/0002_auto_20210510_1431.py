# Generated by Django 3.1.8 on 2021-05-10 14:31

from django.db import migrations
import wagtail.fields


class Migration(migrations.Migration):

    dependencies = [
        ('sitesettings', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='imageslideritem',
            name='text',
            field=wagtail.fields.RichTextField(default='', help_text='Text', max_length=200),
        ),
    ]
