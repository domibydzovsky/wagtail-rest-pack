# Generated by Django 3.1.8 on 2021-05-10 14:31

from django.db import migrations, models
import wagtail.core.blocks
import wagtail.core.fields
import wagtail_rest_pack.generic_forms.blocks.generic_input


class Migration(migrations.Migration):

    dependencies = [
        ('generic_forms', '0009_alter_formbuilder_stream'),
    ]

    operations = [
        migrations.AlterField(
            model_name='formbuilder',
            name='security',
            field=models.CharField(choices=[('recaptcha_or_user', 'Recaptcha or logged user'), ('authenticated_user_only', 'Authenticated user only')], default='recaptcha_or_user', max_length=30),
        ),
        migrations.AlterField(
            model_name='formbuilder',
            name='stream',
            field=wagtail.core.fields.StreamField([('form_text', wagtail.core.blocks.StructBlock([('name', wagtail.core.blocks.TextBlock(help_text='The field name, e.g. email_field', label='Technical name of a field', max_length=30, validators=[wagtail_rest_pack.generic_forms.blocks.generic_input.is_form_field])), ('label', wagtail.core.blocks.TextBlock(label='Label shown before input', max_length=50)), ('max_length', wagtail.core.blocks.IntegerBlock(default=100, help_text='Max length of an input', label='Max', max_value=2000, min_value=10)), ('required', wagtail.core.blocks.ChoiceBlock(choices=[('always', 'Always'), ('anonymous_user_only', 'Not authenticated user only')], label='Condition of field visilibity')), ('placeholder', wagtail.core.blocks.CharBlock(help_text='Help text shown when nothing filled yet.', max_length=80, required=False)), ('validation', wagtail.core.blocks.ChoiceBlock(choices=[('none', 'None'), ('email', 'Email')], label='Validation')), ('multiline', wagtail.core.blocks.BooleanBlock(help_text='Víceřádkový vstup.', required=False))])), ('form_group', wagtail.core.blocks.StructBlock([('name', wagtail.core.blocks.CharBlock(max_length=80)), ('row', wagtail.core.blocks.BooleanBlock(default=False, label='Show on a single line', required=False)), ('required', wagtail.core.blocks.ChoiceBlock(choices=[('always', 'Always'), ('anonymous_user_only', 'Not authenticated user only')], label='Condition of visibility')), ('stream', wagtail.core.blocks.StreamBlock([('form_text', wagtail.core.blocks.StructBlock([('name', wagtail.core.blocks.TextBlock(help_text='The field name, e.g. email_field', label='Technical name of a field', max_length=30, validators=[wagtail_rest_pack.generic_forms.blocks.generic_input.is_form_field])), ('label', wagtail.core.blocks.TextBlock(label='Label shown before input', max_length=50)), ('max_length', wagtail.core.blocks.IntegerBlock(default=100, help_text='Max length of an input', label='Max', max_value=2000, min_value=10)), ('required', wagtail.core.blocks.ChoiceBlock(choices=[('always', 'Always'), ('anonymous_user_only', 'Not authenticated user only')], label='Condition of field visilibity')), ('placeholder', wagtail.core.blocks.CharBlock(help_text='Help text shown when nothing filled yet.', max_length=80, required=False)), ('validation', wagtail.core.blocks.ChoiceBlock(choices=[('none', 'None'), ('email', 'Email')], label='Validation')), ('multiline', wagtail.core.blocks.BooleanBlock(help_text='Víceřádkový vstup.', required=False))]))]))])), ('form_submit', wagtail.core.blocks.StructBlock([('name', wagtail.core.blocks.TextBlock(help_text='Technical name of a field, e.g. email_field', label='Field name', max_length=30, validators=[])), ('text', wagtail.core.blocks.CharBlock(label='A text button label', max_length=30)), ('action', wagtail.core.blocks.StreamBlock([('send_email', wagtail.core.blocks.StructBlock([('sender', wagtail.core.blocks.CharBlock(label='Technical name of a field containing a sender email address', max_length=50)), ('address', wagtail.core.blocks.EmailBlock(label='A email address to which a email should be delived to', max_length=150))]))], label='Form action', max_num=1, min_num=1)), ('response', wagtail.core.blocks.StreamBlock([('form_open_dialog', wagtail.core.blocks.StructBlock([('title', wagtail.core.blocks.TextBlock(help_text='title', max_length=40, required=True)), ('text', wagtail.core.blocks.StreamBlock([('richtext', wagtail.core.blocks.RichTextBlock(icon='doc-full'))]))])), ('form_open_snack', wagtail.core.blocks.StructBlock([('text', wagtail.core.blocks.TextBlock(max_length=50, required=True))]))], label='Form response', max_num=1, min_num=1))]))]),
        ),
    ]
