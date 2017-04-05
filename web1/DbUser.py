#_*_coding:utf-8 _*_

from web1.models import *


class IPLIST:
    def __IpChose(self,EndIp):
        self.__EndIp = int(EndIp)
        if (0 < self.__EndIp < 50):
            return 1
        elif (50 <= self.__EndIp < 100):
            return 2
        elif (100 <= self.__EndIp < 150):
            return 3
        elif (150 <= self.__EndIp < 200):
            return 4
        else:
            return 5

    def IpListAdd(self,ID,IpGroup,EndIp):
        msg = {}
        HostIdAdd = HostInfo.objects.get(ID=ID)
        IpGroupAdd = IpGrouping.objects.get(IpParagraph=IpGroup)
        EndIpNum = self.__IpChose(EndIp)
        try:
            IpList.objects.create(HostId = HostIdAdd,IpGroupingId=IpGroupAdd,IpEndId=EndIpNum)
            msg['TrueBit'] = True
        except Exception as e:
            msg['TrueBit'] = False
            msg['ErrorMsg'] = e
        return msg

    def SelectHostByIpGrouping(self,arg):
        '''
           接收数组类型参数！！！
        '''
        AllInfo = []
        self.__IpGroup = arg
        for item in self.__IpGroup:
            Info = IpList.objects.filter(IpGroupingId=item)
            for i in Info:
                AllInfo.append(i)
        return AllInfo
    def SlecetHostByEndIp(self,arg):
        '''
           接收数组类型参数！！！
        '''
        AllInfo = []
        self.__IpEnd = arg
        for item in self.__IpEnd:
            Info = IpList.objects.filter(IpEndId=item)
            for i in Info:
                AllInfo.append(i)
        return AllInfo
    def SelecrHostByEndIpandIpGroup(self,IpGroupList,IpEndList):
        AllInfo = []
        self.__IpGroup = IpGroupList
        self.__IpEnd = IpEndList
        for IpGroup in self.__IpGroup:
            for IpEnd in self.__IpEnd:
                Info = IpList.objects.filter(IpGroupingId=IpGroup,IpEndId=IpEnd)
                for i in Info:
                    AllInfo.append(i)
        return AllInfo

class IPGROUPING:
    def IpGroupAdd(self,IpParagraph):
        msg={}
        try:
            IpGrouping.objects.get_or_create(IpParagraph=IpParagraph)
            msg['TrueBit'] = True
        except Exception as e:
            msg['TrueBit'] = False
            msg['ErrorMsg'] = e
        return msg

class HOSTUSERINFO:
    def HostUserAdd(self,HostId,Username,Password,LoginBit):
        msg = {}
        HostUser = HostUserInfo.objects.filter(HostID__ID=HostId,HostUser=Username).count()
        print (HostUser)
        if HostUser == 1:
            try:
                print (Password)
                HostUpdate = HostUserInfo.objects.get(HostID=HostId,HostUser=Username)
                HostUpdate.HostUser = Username
                HostUpdate.HostPwd = Password
                HostUpdate.LoginBit = LoginBit
                HostUpdate.save()
                msg['TrueBit'] = True
            except Exception as e:
                msg['TrueBit'] = False
                msg['ErrorMsg'] = e
            # msg['TrueBit'] =False
            # msg['ErrorMsg'] = {1:'这个主机的用户以存在'}
        else:
            try:
                HostUserId = HostInfo.objects.get(ID=HostId)
                HostUserInfo.objects.create(HostID=HostUserId,HostUser=Username,HostPwd=Password,LoginBit=LoginBit)
                msg['TrueBit'] = True
            except Exception as e:
                msg['TrueBit'] =False
                msg['ErrorMsg'] = e
                print (e.args[1])
        return msg

class HOSTINFO:
    def __AddIpGroup(self,ID):
        IpGrouping = IPGROUPING()
        IpList = IPLIST()
        msg ={}
        HostIp=HostInfo.objects.get(ID=ID).HostIp
        self.__HostIp = HostIp.split('.')
        self.__NewIp = []
        self.__NewIp.append(self.__HostIp[0])
        self.__NewIp.append(self.__HostIp[1])
        self.__NewIp.append(self.__HostIp[2])
        self.__IpGroup='.'.join(self.__NewIp)
        IpGropAdd = IpGrouping.IpGroupAdd(self.__IpGroup)
        if IpGropAdd['TrueBit']==True:
            # print self.__IpGroup
            # print self.__HostIp[3]
            IpListMsg = IpList.IpListAdd(ID,self.__IpGroup,self.__HostIp[3])
            if IpListMsg['TrueBit']:
                msg['TrueBit'] = True
            else:
                msg['TrueBit'] = False
                msg['ErrorMsg'] = IpListMsg['ErrorMsg']
        else:
            msg['TrueBit'] = False
            msg['ErrorMsg'] = IpGropAdd['ErrorMsg']
        return msg

    def SelectHostAll(self):
        IpId= HostInfo.objects.all()
        return IpId

    def HostInfoAdd(self,HostIp,HostName,HostDescription):
        msg={}
        # Host = HostInfo.objects.filter(HostIp=HostIp).count()
        # if Host==1:
        #     Host = HostInfo.objects.get(HostIp=HostIp)
        #     IpGropMsg = self.__AddIpGroup(Host.ID)
        #     if IpGropMsg['TrueBit']:
        #         msg['TrueBit'] = True
        #     else:
        #         msg['TrueBit'] = False
        #         msg['ErrorMsg'] = IpGropMsg['ErrorMsg']
        #     return msg
        # else:
        try:
            Host = HostInfo.objects.create(HostIp=HostIp,HostName =HostName ,HostDescription=HostDescription)
            msg['TrueBit'] = True
            msg['Msg'] = Host
        except Exception as e:
            msg['TrueBit'] = False
            msg['ErrorMsg'] = e
        #
        # if msg['TrueBit']:
        #     UserAddMsg = HOSTUSERINFO.HostUserAdd(HostId=Host,Username=HostUser,Password=HostPwd)
        #     if UserAddMsg['TrueBit']:
        #         pass
        #     else:
        #         msg['TrueBit'] =False
        #         msg['ErrorMsg']=UserAddMsg['ErrorMsg']
        # else:
        #     pass
        # if msg['TrueBit']:
        #     #IpGropMsg = self.__AddIpGroup(Host.ID)
        #     if IpGropMsg['TrueBit']:
        #         msg['TrueBit'] = True
        #     else:
        #         msg['TrueBit'] = False
        #         msg['ErrorMsg'] = IpGropMsg['ErrorMsg']
        #     return msg
        # else:
        return msg

class DBUSERINFO:
    def Add(self,HostId,HostUser,HostPwd):
        msg={}
        try:
            IdAdd = HostInfo.objects.get(ID=HostId)
            DbUserInfo.objects.create(HostId=IdAdd,HostUser=HostUser,HostPwd=HostPwd)
            msg['TrueBit'] = True
        except Exception as e:
            msg['TrueBit'] = False
            msg['ErrorMsg'] = e
        return msg

class PROJECTINFO:
    def ProjectAdd(self,ProgectName,ProjectManager,ProjectUser,ProgecDescription):
        msg={}
        try:
            ProjectInfo.objects.create(ProgectName=ProgectName,ProjectManager=ProjectManager,ProjectUser=ProjectUser,ProgectDescription=ProgecDescription)
            msg['TrueBit'] = True
        except Exception as e:
                msg['TrueBit'] = False
                msg['ErrorMsg'] = e
        return msg
    def SelectProjectId(self):
        SelectProjectId = ProjectInfo.objects.all()
        return SelectProjectId
    def SelectProjectById(self,ProjectID):
        ProjectInfoByID = ProjectInfo.objects.get(ID= ProjectID)
        return ProjectInfoByID

class HOSTPROJECT:
    def HostProjectAdd(self,HostId,ProjectId):
        msg = {}
        try:
            HostIdAdd = HostInfo.objects.get(ID=HostId)
            ProjectIdAdd = ProjectInfo.objects.get(ID=ProjectId)
            HostProject.objects.create(HostId=HostIdAdd,ProjectId=ProjectIdAdd)
            #HostMsg.objects.update(HostId=HostIdAdd,ProjectId=ProjectIdAdd,IpGrouping=IpGroupingAdd)
            msg['TrueBit'] = True
        except Exception as e:
            msg['TrueBit'] = False
            if int(e[0])==1062:
                msg['ErrorMsg'] = '添加的IP隶属于其他项目，不能重复添加'
            else:
                msg['ErrorMsg'] = e
        return msg
    def SelectFromProjectId(self,ProjectId):
        msg={}
        HostOne = {}
        HostIpMag = []
        try:
            HostID = HostProject.objects.filter(ProjectId__ID=ProjectId)
            HostNum = HostProject.objects.filter(ProjectId__ID=ProjectId).count()
            for item in HostID:
                HostOne['Ip'] = item.HostId.HostIp
                HostOne['HostDescription'] = item.HostId.HostDescription
                HostIpMag.append(HostOne)
            msg['TrueBit'] = True
            msg['HostIp'] = HostIpMag
            msg['HostNum'] = HostNum
        except Exception as e:
            msg['TrueBit'] = False
            msg['ErrorMsg']=e
        return msg
    def SelectHostNoProject(self):
        NoProjectId = []
        HostAllID = HostInfo.objects.all()
        for item in HostAllID:
            if HostProject.objects.filter(HostId=item.ID).count():
                pass
            else:
                HostOne = HostInfo.objects.get(ID=item.ID)
                NoProjectId.append(HostOne)
        return NoProjectId

    def SelectHostByProjectAndIpGrop(self,ProjectId,IpGroupList):
        pass
    def SelectHostByProjectAndEndIp(self):
        pass
    def SelectHostByProjectAnsIpAll(self):
        pass