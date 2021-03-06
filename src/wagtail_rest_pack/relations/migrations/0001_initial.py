# Generated by Django 3.2.3 on 2021-05-26 16:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('wagtailcore', '0062_comment_models_and_pagesubscription'),
    ]

    operations = [
        migrations.CreateModel(
            name='Relation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('from_page', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='from_page', to='wagtailcore.page')),
                ('to_page', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='to_page', to='wagtailcore.page')),
            ],
            options={
                'unique_together': {('from_page', 'to_page')},
            },
        ),
    ]
