# _*_coding=utf-8_*_
# from __future__ import unicode_literals

from django.db import models

# Create your models here.


class UserType(models.Model):
    usertype = models.CharField(max_length=49)

class Group(models.Model):
    groupname = models.CharField(max_length=50)
    user = models.ManyToManyField('User')

class User(models.Model):
    username = models.CharField(max_length=49)
    password = models.CharField(max_length=49)
    email = models.EmailField(max_length=50)
    name = models.CharField(max_length=50)
    usertype = models.ForeignKey('UserType')

    create_date = models.DateTimeField(auto_now_add=True)
    update_date = models.DateTimeField(auto_now=True)


# Create your models here.
#主机信息表
class HostInfo(models.Model):
    ID = models.AutoField(primary_key=True)
    HostIp=models.GenericIPAddressField(unique=True)
    HostName = models.CharField(max_length=100,default=None,null=True)
    HostDescription = models.CharField(max_length=500)
    DelBit = models.BooleanField(default=False)
    AddTime=models.DateTimeField(auto_now_add=True)
#主机用户表
class HostUserInfo(models.Model):
    ID = models.AutoField(primary_key=True)
    HostID = models.ForeignKey(HostInfo)
    HostUser = models.CharField(max_length=100)
    HostPwd = models.CharField(max_length=100)
    LoginBit = models.BooleanField(default=False)
    AddTime = models.DateTimeField(auto_now_add=True)
    UpdateTime = models.DateTimeField(auto_now=True)

#项目列表
class ProjectInfo(models.Model):
    ID = models.AutoField(primary_key=True)
    ProgectName = models.CharField(max_length=255,unique=True)
    ProjectManager =models.CharField(max_length=255)
    ProjectUser = models.CharField(max_length=500)
    ProgectDescription = models.CharField(max_length=500)
    DelBit = models.BooleanField(default=False)
    AddTime=models.DateTimeField(auto_now_add=True,unique=True)
#主机项目关联表
class HostProject(models.Model):
    ID = models.AutoField(primary_key=True)
    HostId = models.OneToOneField(HostInfo)
    ProjectId = models.ForeignKey(ProjectInfo)

# 数据库用户表
class DbUserInfo(models.Model):
    ID = models.AutoField(primary_key=True)
    HostId = models.ForeignKey(HostInfo)
    HostUser = models.CharField(max_length=20)
    HostPwd = models.CharField(max_length=100)
    AddTime = models.DateTimeField(auto_now_add=True)
# 数据库检索信息表
class DbInfo(models.Model):
    ID = models.AutoField(primary_key=True)
    HostId = models.ForeignKey(DbUserInfo)
    DbName = models.CharField(max_length=50)
    TableName = models.CharField(max_length=500)
    UpTime = models.DateTimeField(auto_now=True)
#数据库备份文件路径信息表
class DbFileInfo(models.Model):
    ID = models.AutoField(primary_key=True)
    HostId = models.OneToOneField(HostInfo)
    DbPath = models.CharField(max_length=200)
    TablePath = models.CharField(max_length=200)

#IP分组表
class IpGrouping(models.Model):
    ID = models.AutoField(primary_key=True)
    IpParagraph = models.CharField(max_length=11,unique=True)
#主机IP分组表
class IpList(models.Model):
    IPEND = (
        (1,u'0-50'),
        (2,u'51-100'),
        (3,u'101-150'),
        (4,u'151-200'),
        (5,u'201-254'),
    )
    ID = models.AutoField(primary_key=True)
    HostId = models.OneToOneField(HostInfo)
    IpGroupingId = models.ForeignKey(IpGrouping)
    IpEndId = models.CharField(max_length=1,choices=IPEND)
#salt信息检索表
class SaltInfo(models.Model):
    ID=models.AutoField(primary_key=True)
    HostId = models.OneToOneField(HostInfo)
    UpTime = models.DateTimeField(auto_now=True)
    SaltId = models.CharField(max_length=100)


class TEST1(models.Model):
    name = models.CharField(max_length=100)