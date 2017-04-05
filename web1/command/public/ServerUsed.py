# -*- coding: utf-8 -*-

def PostCheangeDict(data):
    '''
        把用js的 serialize()，的方法post的数据转换为字典返回。
        接受一个参数，为post的数据的值
    '''
    #print(data)
    project = data.split('&')
    ProjectDict = {}
    for item in project:
        ProjectOne = item.split('=')
        ProjectDict[ProjectOne[0]] = ProjectOne[1]
    return ProjectDict

def GetUrlChangeDict(url):
    project = url.split('&')
    ProjectDict = {}
    for item in project[1:]:
        ProjectOne = item.split('=')
        ProjectDict[ProjectOne[0]] = ProjectOne[1]
    return ProjectDict