# -*- coding: utf-8 -*-
# Generated by Django 1.11b1 on 2017-03-24 01:56
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('web1', '0002_auto_20170324_0155'),
    ]

    operations = [
        migrations.AlterField(
            model_name='projectinfo',
            name='ProgectName',
            field=models.CharField(max_length=255, unique=True),
        ),
    ]
