# Generated by Django 3.2.16 on 2022-10-23 08:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('custom_tag', '0005_alter_pagetag_content_object'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='tag',
            options={'verbose_name': 'Štítek', 'verbose_name_plural': 'Štítky'},
        ),
    ]
