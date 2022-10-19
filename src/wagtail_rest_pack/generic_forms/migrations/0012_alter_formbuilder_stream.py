# Generated by Django 4.1.2 on 2022-10-17 17:15

from django.db import migrations
import wagtail.blocks
import wagtail.fields
import wagtail_rest_pack.generic_forms.blocks.generic_input


class Migration(migrations.Migration):

    dependencies = [
        ('generic_forms', '0011_alter_formbuilder_stream'),
    ]

    operations = [
        migrations.AlterField(
            model_name='formbuilder',
            name='stream',
            field=wagtail.fields.StreamField([('form_text', wagtail.blocks.StructBlock([('name', wagtail.blocks.TextBlock(help_text='The field name, e.g. email_field', label='Technical name of a field', max_length=30, validators=[wagtail_rest_pack.generic_forms.blocks.generic_input.is_form_field])), ('label', wagtail.blocks.TextBlock(label='Label shown before input', max_length=50)), ('max_length', wagtail.blocks.IntegerBlock(default=100, help_text='Max length of an input', label='Max', max_value=2000, min_value=10)), ('required', wagtail.blocks.ChoiceBlock(choices=[('always', 'Always'), ('anonymous_user_only', 'Not authenticated user only')], label='Condition of field visilibity')), ('placeholder', wagtail.blocks.CharBlock(help_text='Help text shown when nothing filled yet.', max_length=80, required=False)), ('validation', wagtail.blocks.ChoiceBlock(choices=[('none', 'None'), ('email', 'Email')], label='Validation')), ('multiline', wagtail.blocks.BooleanBlock(help_text='Víceřádkový vstup.', required=False))])), ('form_group', wagtail.blocks.StructBlock([('name', wagtail.blocks.CharBlock(max_length=80)), ('row', wagtail.blocks.BooleanBlock(default=False, label='Show on a single line', required=False)), ('required', wagtail.blocks.ChoiceBlock(choices=[('always', 'Always'), ('anonymous_user_only', 'Not authenticated user only')], label='Condition of visibility')), ('stream', wagtail.blocks.StreamBlock([('form_text', wagtail.blocks.StructBlock([('name', wagtail.blocks.TextBlock(help_text='The field name, e.g. email_field', label='Technical name of a field', max_length=30, validators=[wagtail_rest_pack.generic_forms.blocks.generic_input.is_form_field])), ('label', wagtail.blocks.TextBlock(label='Label shown before input', max_length=50)), ('max_length', wagtail.blocks.IntegerBlock(default=100, help_text='Max length of an input', label='Max', max_value=2000, min_value=10)), ('required', wagtail.blocks.ChoiceBlock(choices=[('always', 'Always'), ('anonymous_user_only', 'Not authenticated user only')], label='Condition of field visilibity')), ('placeholder', wagtail.blocks.CharBlock(help_text='Help text shown when nothing filled yet.', max_length=80, required=False)), ('validation', wagtail.blocks.ChoiceBlock(choices=[('none', 'None'), ('email', 'Email')], label='Validation')), ('multiline', wagtail.blocks.BooleanBlock(help_text='Víceřádkový vstup.', required=False))]))]))])), ('form_submit', wagtail.blocks.StructBlock([('name', wagtail.blocks.TextBlock(help_text='Technical name of a field, e.g. email_field', label='Field name', max_length=30, validators=[])), ('text', wagtail.blocks.CharBlock(label='A text button label', max_length=30)), ('action', wagtail.blocks.StreamBlock([('send_email', wagtail.blocks.StructBlock([('sender', wagtail.blocks.CharBlock(label='Technical name of a field containing a sender email address', max_length=50)), ('address', wagtail.blocks.EmailBlock(label='A email address to which a email should be delived to', max_length=150))]))], label='Form action', max_num=1, min_num=1)), ('response', wagtail.blocks.StreamBlock([('form_open_dialog', wagtail.blocks.StructBlock([('title', wagtail.blocks.TextBlock(help_text='title', max_length=40, required=True)), ('text', wagtail.blocks.StreamBlock([('richtext', wagtail.blocks.RichTextBlock(features=['h2', 'h3', 'italic', 'bold', 'ol', 'ul', 'hr', 'link', 'document-link', 'image', 'embed', 'code', 'superscript', 'subscript', 'strikethrough', 'blockquote'], icon='doc-full'))]))])), ('form_open_snack', wagtail.blocks.StructBlock([('text', wagtail.blocks.TextBlock(max_length=50, required=True))]))], label='Form response', max_num=1, min_num=1))]))], use_json_field=True),
        ),
    ]