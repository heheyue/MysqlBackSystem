# -*- coding: utf-8 -*-
from django import forms

class RegisterForm(forms.Form):
    username = forms.CharField()
    email = forms.EmailField(required=True)
    ip = forms.GenericIPAddressField(unpack_ipv4=True)

class ServerAdd(forms.Form):
    HostIp = forms.GenericIPAddressField(error_messages={'invalid':('IP格式错误')})
    HostName = forms.CharField()
    HostDescription = forms.CharField()
class DbUserAdd(forms.Form):
    DbUser = forms.CharField()
    DbPasword = forms.CharField()