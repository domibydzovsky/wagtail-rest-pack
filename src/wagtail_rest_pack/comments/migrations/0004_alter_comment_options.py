# Generated by Django 4.1.2 on 2022-10-17 17:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('comments', '0003_comment_updated_by'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='comment',
            options={'ordering': ['created_on', 'created_by'], 'verbose_name': 'Komentář', 'verbose_name_plural': 'Komentáře'},
        ),
    ]
