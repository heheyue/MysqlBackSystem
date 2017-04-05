# -*- coding: utf-8 -*-
from django.conf.urls import url
from django.contrib import admin
from web1.views import *


urlpatterns = [
   url(r'^login/$',Login),
   url(r'^logout/$',Logout),
   url(r'^register/$',Register),
   url(r'^index.html',Index),
    url(r'^project_info.html',Project_Info),
    url(r'^project_edit.html',Project_edit),
   url(r'^server_info.html',Server_Info),
   url(r'^ajax/$',ajax),
   url(r'^fenye/(\d*)',fenye),
   url(r'^test/$',test),
]

