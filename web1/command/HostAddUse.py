# _*_ coding:utf-8 _*_

import subprocess
#import paramiko
#import salt.client
import time

class INSTSaltStack:
    # def InstallSaltStackMaster(self):
    #     tem = subprocess.Popen(['cd','/'],shell=True)
    #     tem.wait()
    #     print tem.stdout
    #     tem = subprocess.Popen(['ls',])
    #     tem.wait()
    #     print tem.stdout
    # def Paramiko(self):
    #     ssh = paramiko.SSHClient()
    #     ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    #     ssh.connect('192.168.130.10', 22, 'root', '9288sTTQ')
    #     stdin, stdout, stderr = ssh.exec_command('df')
    #     print stdout.read()
    #     ssh.close()
    def TestHostTrue(self,HostId):
        host = False
        while host == False:
            cli = salt.client.LocalClient()
            #ret = cli.cmd(HostId, 'test.ping',timeout=3)
            ret = cli.cmd('192.168.130.10-mdmtest','cmd.run', ['uptime'],timeout=1)
            #print ret
            #if ret[] and 'load' in ret:
            # try:
            #     if ret[HostId] == True:
            #         host = True
            #     else:
            #         time.sleep(5)
            #         host = False
            # except Exception,e:
            #     time.sleep(5)
            #     host = False

    def SAlTTest(self):
        #p = subprocess.Popen('ls', shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
        str = '''
        salt '*' test.ping
        '''
        retcode = subprocess.call(str,shell=True)
        print (retcode)


        # for line in p.stdout.readlines():
        #     print
        #     line,
        # retval = p.wait()



        #self.TestHostTrue('192.168.130.10-mdmtest')
        # cli = salt.client.LocalClient()
        # ret = cli.cmd('192.168.130.11-storetest','test.ping')
        #ret =cli.cmd('192.168.130.11-storetest','grains.items',timeout=1)
        #print ret['192.168.130.11-storetest']['SSDs']
        # for item in ret:
        #     print item.fqdn_ip4