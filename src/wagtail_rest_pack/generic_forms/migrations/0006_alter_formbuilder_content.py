# Generated by Django 3.2 on 2021-05-04 14:45

from django.db import migrations
import wagtail.blocks
import wagtail.fields
import wagtail_rest_pack.generic_forms.blocks.generic_input


class Migration(migrations.Migration):

    dependencies = [
        ('generic_forms', '0005_alter_formbuilder_content'),
    ]

    operations = [
        migrations.AlterField(
            model_name='formbuilder',
            name='content',
            field=wagtail.fields.StreamField([('form_text', wagtail.blocks.StructBlock([('name', wagtail.blocks.TextBlock(help_text='Název pole v ascii (např. user_email)', label='Technický název pole', max_length=30, validators=[wagtail_rest_pack.generic_forms.blocks.generic_input.is_form_field])), ('label', wagtail.blocks.TextBlock(label='Popisek zobrazený před inputem.', max_length=50)), ('max_length', wagtail.blocks.IntegerBlock(default=100, help_text='Maximální délka vstupu', label='Max', max_value=2000, min_value=10)), ('required', wagtail.blocks.ChoiceBlock(choices=[('always', 'Vždy'), ('anonymous_user_only', 'Pouze nepřihlášený uživatel')], label='Podmínka zobrazení pole')), ('placeholder', wagtail.blocks.CharBlock(help_text='Hodnota zobrazená, když nic není vyplněno.', max_length=80, required=False)), ('validation', wagtail.blocks.ChoiceBlock(choices=[('none', 'Žádné'), ('email', 'Email')], label='Validace')), ('multiline', wagtail.blocks.BooleanBlock(help_text='Víceřádkový vstup.', required=False))])), ('form_group', wagtail.blocks.StructBlock([('name', wagtail.blocks.CharBlock(max_length=80)), ('row', wagtail.blocks.BooleanBlock(default=False, label='Zobrazit na jednom řádku.', required=False)), ('required', wagtail.blocks.ChoiceBlock(choices=[('always', 'Vždy'), ('anonymous_user_only', 'Pouze nepřihlášený uživatel')], label='Podmínka zobrazení pole')), ('stream', wagtail.blocks.StreamBlock([('form_text', wagtail.blocks.StructBlock([('name', wagtail.blocks.TextBlock(help_text='Název pole v ascii (např. user_email)', label='Technický název pole', max_length=30, validators=[wagtail_rest_pack.generic_forms.blocks.generic_input.is_form_field])), ('label', wagtail.blocks.TextBlock(label='Popisek zobrazený před inputem.', max_length=50)), ('max_length', wagtail.blocks.IntegerBlock(default=100, help_text='Maximální délka vstupu', label='Max', max_value=2000, min_value=10)), ('required', wagtail.blocks.ChoiceBlock(choices=[('always', 'Vždy'), ('anonymous_user_only', 'Pouze nepřihlášený uživatel')], label='Podmínka zobrazení pole')), ('placeholder', wagtail.blocks.CharBlock(help_text='Hodnota zobrazená, když nic není vyplněno.', max_length=80, required=False)), ('validation', wagtail.blocks.ChoiceBlock(choices=[('none', 'Žádné'), ('email', 'Email')], label='Validace')), ('multiline', wagtail.blocks.BooleanBlock(help_text='Víceřádkový vstup.', required=False))]))]))]))]),
        ),
    ]
