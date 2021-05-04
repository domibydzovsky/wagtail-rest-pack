# Generated by Django 3.2 on 2021-05-03 18:02

from django.db import migrations
import wagtail.core.blocks
import wagtail.core.fields
import wagtail_rest_pack.generic_forms.blocks.generic_input


class Migration(migrations.Migration):

    dependencies = [
        ('generic_forms', '0003_formbuilder_content'),
    ]

    operations = [
        migrations.AlterField(
            model_name='formbuilder',
            name='content',
            field=wagtail.core.fields.StreamField([('form_text', wagtail.core.blocks.StructBlock([('name', wagtail.core.blocks.TextBlock(help_text='Název pole v ascii (např. user_email)', label='Technický název pole', max_length=30, validators=[wagtail_rest_pack.generic_forms.blocks.generic_input.is_form_field])), ('label', wagtail.core.blocks.TextBlock(label='Popisek zobrazený před inputem.', max_length=50)), ('max_length', wagtail.core.blocks.IntegerBlock(default=100, help_text='Maximální délka vstupu', label='Max', max_value=2000, min_value=10)), ('required', wagtail.core.blocks.ChoiceBlock(choices=[('always', 'Vždy'), ('anonymous_user_only', 'Pouze nepřihlášený uživatel')], label='Podmínka zobrazení pole')), ('placeholder', wagtail.core.blocks.CharBlock(help_text='Hodnota zobrazená, když nic není vyplněno.', max_length=80, required=False)), ('validation', wagtail.core.blocks.ChoiceBlock(choices=[('none', 'Žádné'), ('email', 'Email')], label='Validace')), ('multiline', wagtail.core.blocks.BooleanBlock(help_text='Víceřádkový vstup.', required=False))]))]),
        ),
    ]
