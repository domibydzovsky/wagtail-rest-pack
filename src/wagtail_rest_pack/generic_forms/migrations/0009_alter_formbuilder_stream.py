# Generated by Django 3.2 on 2021-05-04 15:47

from django.db import migrations
import wagtail.core.blocks
import wagtail.core.fields
import wagtail_rest_pack.generic_forms.blocks.generic_input


class Migration(migrations.Migration):

    dependencies = [
        ('generic_forms', '0008_alter_formbuilder_stream'),
    ]

    operations = [
        migrations.AlterField(
            model_name='formbuilder',
            name='stream',
            field=wagtail.core.fields.StreamField([('form_text', wagtail.core.blocks.StructBlock([('name', wagtail.core.blocks.TextBlock(help_text='Název pole v ascii (např. user_email)', label='Technický název pole', max_length=30, validators=[wagtail_rest_pack.generic_forms.blocks.generic_input.is_form_field])), ('label', wagtail.core.blocks.TextBlock(label='Popisek zobrazený před inputem.', max_length=50)), ('max_length', wagtail.core.blocks.IntegerBlock(default=100, help_text='Maximální délka vstupu', label='Max', max_value=2000, min_value=10)), ('required', wagtail.core.blocks.ChoiceBlock(choices=[('always', 'Vždy'), ('anonymous_user_only', 'Pouze nepřihlášený uživatel')], label='Podmínka zobrazení pole')), ('placeholder', wagtail.core.blocks.CharBlock(help_text='Hodnota zobrazená, když nic není vyplněno.', max_length=80, required=False)), ('validation', wagtail.core.blocks.ChoiceBlock(choices=[('none', 'Žádné'), ('email', 'Email')], label='Validace')), ('multiline', wagtail.core.blocks.BooleanBlock(help_text='Víceřádkový vstup.', required=False))])), ('form_group', wagtail.core.blocks.StructBlock([('name', wagtail.core.blocks.CharBlock(max_length=80)), ('row', wagtail.core.blocks.BooleanBlock(default=False, label='Zobrazit na jednom řádku.', required=False)), ('required', wagtail.core.blocks.ChoiceBlock(choices=[('always', 'Vždy'), ('anonymous_user_only', 'Pouze nepřihlášený uživatel')], label='Podmínka zobrazení pole')), ('stream', wagtail.core.blocks.StreamBlock([('form_text', wagtail.core.blocks.StructBlock([('name', wagtail.core.blocks.TextBlock(help_text='Název pole v ascii (např. user_email)', label='Technický název pole', max_length=30, validators=[wagtail_rest_pack.generic_forms.blocks.generic_input.is_form_field])), ('label', wagtail.core.blocks.TextBlock(label='Popisek zobrazený před inputem.', max_length=50)), ('max_length', wagtail.core.blocks.IntegerBlock(default=100, help_text='Maximální délka vstupu', label='Max', max_value=2000, min_value=10)), ('required', wagtail.core.blocks.ChoiceBlock(choices=[('always', 'Vždy'), ('anonymous_user_only', 'Pouze nepřihlášený uživatel')], label='Podmínka zobrazení pole')), ('placeholder', wagtail.core.blocks.CharBlock(help_text='Hodnota zobrazená, když nic není vyplněno.', max_length=80, required=False)), ('validation', wagtail.core.blocks.ChoiceBlock(choices=[('none', 'Žádné'), ('email', 'Email')], label='Validace')), ('multiline', wagtail.core.blocks.BooleanBlock(help_text='Víceřádkový vstup.', required=False))]))]))])), ('form_submit', wagtail.core.blocks.StructBlock([('name', wagtail.core.blocks.TextBlock(help_text='Název pole v ascii (např. user_email)', label='Jméno', max_length=30, validators=[])), ('text', wagtail.core.blocks.CharBlock(label='Text na tlačítku', max_length=30)), ('action', wagtail.core.blocks.StreamBlock([('send_email', wagtail.core.blocks.StructBlock([('sender', wagtail.core.blocks.CharBlock(label='Nazev technického pole, ve kterém bude vyplněn odesílatel.', max_length=50)), ('address', wagtail.core.blocks.EmailBlock(label='Adresát.', max_length=150))]))], label='Akce', max_num=1, min_num=1)), ('response', wagtail.core.blocks.StreamBlock([('form_open_dialog', wagtail.core.blocks.StructBlock([('title', wagtail.core.blocks.TextBlock(help_text='Titulek', max_length=40, required=True)), ('text', wagtail.core.blocks.StreamBlock([('richtext', wagtail.core.blocks.RichTextBlock(icon='doc-full'))]))])), ('form_open_snack', wagtail.core.blocks.StructBlock([('text', wagtail.core.blocks.TextBlock(max_length=50, required=True))]))], label='Odpověď', max_num=1, min_num=1))]))]),
        ),
    ]
