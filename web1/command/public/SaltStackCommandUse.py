# _*_ coding:utf-8 _*_

import salt.client
import time

class SaltCommandUse:
    def CheckSaltMinion(self,MinionId):
        check =False
        cli = salt.client.LocalClient()
        ret = cli.cmd(MinionId, 'test.ping')
        print(ret)
        try:
            if ret[MinionId] == True:
                check = True
            else:
                check = False
        except Exception as e:
            check = False
        return check