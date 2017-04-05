# -*- coding: utf-8 -*-
from django.shortcuts import render,render_to_response,redirect
from django.http.response import HttpResponse

from web1.models import *
import json
from web1.plug import fenye as plug_fenye
from web1.plug import *
#新月添加
from web1.command.HostAddUse import *
from web1.command.public.ServerUsed import *
from web1.DbUser import *
#from web1.forms import ServerAdd

def Login(request):
    ret = {}
    if request.method =='POST':
        ret = {}
        user = request.POST.get('LoginForm[username]',None)
        pwd = request.POST.get('LoginForm[password]',None)
        is_empty = all([user,pwd])
        if is_empty:
            result = User.objects.filter(username=user,password=pwd).count()
            if result == 1:
                request.session['is_login'] = True
                request.session['user'] = user
                return redirect('/web1/index.html')
            else:
                ret['status'] = json.dumps('用户名密码错误')
                return(render_to_response('login.html',ret))
        else:
            ret['status'] = json.dumps('用户名或密码为空')
            return(render_to_response('login.html',ret))
    return render_to_response('login.html',ret)

def Logout(request):
    try:
        del request.session['is_login']
        del request.session['user']
    except KeyError:
        pass
    return redirect('/web1/login/')

def Index(request):
    is_login = request.session.get('is_login',None)
    user = request.session.get('user',None)
    print(is_login)
    print(user)
    if is_login:
        return render_to_response('index.html',{'user':user})
    else:
        return redirect('/web1/login/')
def Register(request):
    ret = {}
    if request.method == 'POST':
        user = request.POST.get('loginUserDTO.user_name',None)
        pwd = request.POST.get('userDTO.password')
        name = request.POST.get('loginUserDTO.name')
        email = request.POST.get('userDTO.email')
        type_id= request.POST.get('type_select')
        is_empty = all([user,pwd,name,email,type_id])
        if is_empty:
            User_type = UserType.objects.get(id=type_id)
            username = User.objects.filter(username=user).count()
            if username >= 1:
                return HttpResponse('用户已存在')
            else:
                User.objects.create(username=user,password=pwd,email=email,name=name,usertype=User_type)
                return redirect('/web1/login')
        else:
            return HttpResponse('请输入必填项')
    else:
        ret['data']=UserType.objects.all()
        return render_to_response('register.html',ret)

def ajax(request):
    if request.method == 'POST':
        print(request.POST)
        data = {'status':'success','data':{'data1':'aa','data2':'bb'}}
        return HttpResponse(json.dumps(data))
    else:
        return render_to_response('ajax.html')

#------------------------------------------------------------------------------------------------
#新月更改
def Project_Info(request):
    msg = {}
    msg['TrueBit'] = False
    if request.method == 'POST':
        date = request.POST.get('ProjectAdd')
        ProjectDict = PostCheangeDict(date)
        # print (date)
        # project = date.split('&')
        # ProjectDict = {}
        # for item in project:
        #     ProjectOne = item.split('=')
        #     ProjectDict[ProjectOne[0]] = ProjectOne[1]
        ProjectName = ProjectDict['project']
        ProjectManager = ProjectDict['manager']
        ProjectDevelop = ProjectDict['develop']
        ProjectDescription = ProjectDict['description']
        print (ProjectName)
        # print(ProjectUser)
        # print(ProjectDescription)
        if ProjectDescription and ProjectName and ProjectDevelop and ProjectManager:
            ProjectInfo = PROJECTINFO()
            Msg = ProjectInfo.ProjectAdd(ProjectName,ProjectManager,ProjectDevelop,ProjectDescription)
            if Msg['TrueBit']:
                msg['TrueBit'] = 1
                return HttpResponse(json.dumps(msg))
            else:
                msg['TrueBit'] = Msg['ErrorMsg'].args[0]
                msg['msg'] = '添加失败'
                msg['ErrorMsg'] = Msg['ErrorMsg'].args[1]
                return HttpResponse(json.dumps(msg))
                #return render(request, 'web/dbuseradd.html', {'msg': Msg['ErrorMsg']})
        else:
            msg['TrueBit'] = 2
            msg['ErrorMsg'] = '必填项存在空，请从新填写'
            return HttpResponse(json.dumps(msg))
            #return render(request, 'web/progectadd.html',{'msg':'必填项存在空，请从新填写'})
    else:
        ProjectInfo  = PROJECTINFO()
        ProjectHost =HOSTPROJECT()
        AllProject = ProjectInfo.SelectProjectId()
        ProjectAll = []
        for item in AllProject:
            MsgOne = {}
            MsgOne['ID'] = item.ID
            MsgOne['PrijectName'] = item.ProgectName
            MsgOne['Manager'] = item.ProjectManager
            MsgOne['Develop'] = item.ProjectUser
            MsgOne['HostNum'] = ProjectHost.SelectFromProjectId(item.ID)['HostNum']
            ProjectAll.append(MsgOne)
        msg['ProjectHost'] = ProjectAll
        # print (msg)
        return render(request,'project_info.html',msg)

def Project_edit(request):
    msg = {}
    ProjectInfo = PROJECTINFO()
    HostProject = HOSTPROJECT()
    PathVar = GetUrlChangeDict(request.path)
    msg['ProjectInfoById'] = ProjectInfo.SelectProjectById(PathVar['ID'])
    #print (msg['ProjectInfoById'].ID)
    return render_to_response('project_edit.html',msg)

def Server_Info(request):
        msg = {}
        HostInfo = HOSTINFO()
        project = PROJECTINFO()
        HostUserInfo = HOSTUSERINFO()
        HostProject = HOSTPROJECT()
        if request.method == 'POST':
            date = request.POST.get('ServerAdd')
            ProjectDict = PostCheangeDict(date)
            ProjectChose = int(ProjectDict['ProjectChose'])
            HostIp = ProjectDict['createip']
            HostUser = ProjectDict['createuser']
            HostPwd = ProjectDict['createpwd']
            LoginUser = ProjectDict['loginuser']
            LoginUserPwd = ProjectDict['loginuserpwd']
            PostCheck = all([ProjectChose,HostIp]) and (all([HostUser,HostPwd]) or all([LoginUser and LoginUserPwd]))
            #print (PostCheck)
            if ProjectChose ==0:
                msg['TrueBit'] = 3
                msg['ErrorMsg'] = '请选择主机所属项目'
                return HttpResponse(json.dumps(msg))
            else:
                if PostCheck:
                     HostInfoMsg = HostInfo.HostInfoAdd(HostIp,'localhost','no HostDescription')
                     #print (HostInfoMsg['TrueBit'])
                     if HostInfoMsg['TrueBit'] and HostUser and HostPwd and LoginUser and LoginUserPwd:

                        #print (HostInfoMsg['Msg'].ID,HostUser,HostPwd)

                        UserAddMsg = HostUserInfo.HostUserAdd(HostId=HostInfoMsg['Msg'].ID,Username=HostUser,Password=HostPwd,LoginBit=False)

                        #print(UserAddMsg['TrueBit'])

                        if UserAddMsg['TrueBit']:
                           UserAddMsg1 = HostUserInfo.HostUserAdd(HostId=int(HostInfoMsg['Msg'].ID),Username=LoginUser,Password=LoginUserPwd,LoginBit=True)
                           if UserAddMsg1['TrueBit']:
                                msg['TrueBit'] = 1
                           else:
                               msg['TrueBit'] = 4
                               msg['ErrorMsg'] ='用户添加失败'
                     elif HostInfoMsg['TrueBit'] and HostUser and HostPwd:
                            UserAddMsg = HostUserInfo.HostUserAdd(HostId=HostInfoMsg['Msg'].ID,Username=HostUser,Password=HostPwd,LoginBit=True)
                            if UserAddMsg['TrueBit']:
                                msg['TrueBit'] = 1
                            else:
                                msg['TrueBit']=4
                                msg['ErrorMsg'] = '用户添加失败'
                     elif HostInfoMsg['TrueBit'] and LoginUser and LoginUserPwd:
                            UserAddMsg1 = HostUserInfo.HostUserAdd(HostId=int(HostInfoMsg['Msg'].ID), Username=LoginUser,Password=LoginUserPwd, LoginBit=True)
                            if UserAddMsg1['TrueBit']:
                                msg['TrueBit'] = True
                            else:
                                msg['TrueBit'] = 4
                                msg['ErrorMsg'] = '用户添加失败'
                     else:
                         msg['TrueBit'] = 6
                         msg['ErrorMsg'] = '未知错误'
                     if msg['TrueBit'] == 1:
                         HostProjectAdd = HostProject.HostProjectAdd(HostInfoMsg['Msg'].ID,ProjectChose)
                         if HostProjectAdd['TrueBit']:
                             msg['TrueBit'] = 1
                         else:
                             msg['TrueBit'] = 5
                             msg['ErrorMsg'] = '主机项目添加失败'
                     else:
                         msg['TrueBit'] = 4
                         msg['ErrorMsg'] = '用户添加失败'

                     return HttpResponse(json.dumps(msg))
                else:
                    msg['TrueBit'] = 2
                    msg['ErrorMsg'] = '请补全必填项'
                    return HttpResponse(json.dumps(msg))
        else:
            ProjecuAll = project.SelectProjectId()
            HostAll = HostInfo.SelectHostAll()
            # print (ProjecuAll)
            msg['ProjectIdName'] = ProjecuAll
            msg['HostAll'] = HostAll

            print (HostAll)
            return render(request, 'server_info.html',msg)

def Test(request):
    TEST = INSTSaltStack()
    TEST.SAlTTest()
    return  HttpResponse('ok')
    # IpGroup = [1,2]
    # EndIp = [1]
    # IpList = IPLIST()
    # IpId = IpList.SelecrHostByEndIpandIpGroup(IpGroup,EndIp)
    # #print IpId
    # return render(request,'web/test.html',{'IpId':IpId})
#-------------------------------------------------------------------------------------
def test(request):
    if request.method =='POST':
        print(request.POST)
        return HttpResponse('OK')
    else:
        return render_to_response('test.html')
