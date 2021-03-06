# Generated by Django 3.2 on 2021-05-03 17:46

from django.db import migrations, models
import wagtail.core.blocks
import wagtail.core.fields
import wagtail_rest_pack.generic_forms.blocks.generic_input


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='FormBuilder',
            fields=[
                ('name', models.CharField(max_length=60, primary_key=True, serialize=False)),
                ('display_name', models.TextField(default='', max_length=100)),
                ('description', models.TextField(blank=True, max_length=1000)),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('security', models.CharField(choices=[('recaptcha_or_user', 'Recaptcha nebo přihlášený uživatel.'), ('authenticated_user_only', 'Přihlášený uživatel pouze.')], default='recaptcha_or_user', max_length=30)),
                ('content', wagtail.core.fields.StreamField([('form_text', wagtail.core.blocks.StructBlock([('name', wagtail.core.blocks.TextBlock(help_text='Název pole v ascii (např. user_email)', label='Technický název pole', max_length=30, validators=[wagtail_rest_pack.generic_forms.blocks.generic_input.is_form_field])), ('label', wagtail.core.blocks.TextBlock(label='Popisek zobrazený před inputem.', max_length=50)), ('max_length', wagtail.core.blocks.IntegerBlock(default=100, help_text='Maximální délka vstupu', label='Max', max_value=2000, min_value=10)), ('required', wagtail.core.blocks.ChoiceBlock(choices=[('always', 'Vždy'), ('anonymous_user_only', 'Pouze nepřihlášený uživatel')], label='Podmínka zobrazení pole')), ('placeholder', wagtail.core.blocks.CharBlock(help_text='Hodnota zobrazená, když nic není vyplněno.', max_length=80, required=False)), ('validation', wagtail.core.blocks.ChoiceBlock(choices=[('none', 'Žádné'), ('email', 'Email')], label='Validace')), ('multiline', wagtail.core.blocks.BooleanBlock(help_text='Víceřádkový vstup.', required=False))], block_type='text', label=None)), ('form_group', wagtail.core.blocks.StructBlock([('name', wagtail.core.blocks.CharBlock(max_length=80)), ('row', wagtail.core.blocks.BooleanBlock(default=False, label='Zobrazit na jednom řádku.', required=False)), ('required', wagtail.core.blocks.ChoiceBlock(choices=[('always', 'Vždy'), ('anonymous_user_only', 'Pouze nepřihlášený uživatel')], label='Podmínka zobrazení pole')), ('stream', wagtail.core.blocks.StreamBlock([('form_text', wagtail.core.blocks.StructBlock([('name', wagtail.core.blocks.TextBlock(help_text='Název pole v ascii (např. user_email)', label='Technický název pole', max_length=30, validators=[wagtail_rest_pack.generic_forms.blocks.generic_input.is_form_field])), ('label', wagtail.core.blocks.TextBlock(label='Popisek zobrazený před inputem.', max_length=50)), ('max_length', wagtail.core.blocks.IntegerBlock(default=100, help_text='Maximální délka vstupu', label='Max', max_value=2000, min_value=10)), ('required', wagtail.core.blocks.ChoiceBlock(choices=[('always', 'Vždy'), ('anonymous_user_only', 'Pouze nepřihlášený uživatel')], label='Podmínka zobrazení pole')), ('placeholder', wagtail.core.blocks.CharBlock(help_text='Hodnota zobrazená, když nic není vyplněno.', max_length=80, required=False)), ('validation', wagtail.core.blocks.ChoiceBlock(choices=[('none', 'Žádné'), ('email', 'Email')], label='Validace')), ('multiline', wagtail.core.blocks.BooleanBlock(help_text='Víceřádkový vstup.', required=False))], block_type='text', label=None))]))])), ('form_submit', wagtail.core.blocks.StructBlock([('name', wagtail.core.blocks.TextBlock(help_text='Název pole v ascii (např. user_email)', label='Jméno', max_length=30, validators=[])), ('text', wagtail.core.blocks.CharBlock(label='Text na tlačítku', max_length=30)), ('action', wagtail.core.blocks.StreamBlock([], label='Akce', max_num=1, min_num=1)), ('response', wagtail.core.blocks.StreamBlock([('form_open_dialog', wagtail.core.blocks.StructBlock([('title', wagtail.core.blocks.TextBlock(help_text='Titulek', max_length=40, required=True)), ('text', wagtail.core.blocks.StreamBlock([]))])), ('form_open_snack', wagtail.core.blocks.StructBlock([('text', wagtail.core.blocks.TextBlock(max_length=50, required=True))]))], label='Odpověď', max_num=1, min_num=1))]))])),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
