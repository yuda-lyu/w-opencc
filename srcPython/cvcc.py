import opencc

# 檔名不能用opencc.py, 測試執行時會與腳本同名, 故改為cvcc
converter = opencc.OpenCC('s2t.json') #簡轉繁

def getError():
    import sys

    #exc_info
    type, message, traceback = sys.exc_info()

    #es
    es=[]
    while traceback:
        e={
            'name':traceback.tb_frame.f_code.co_name,
            'filename':traceback.tb_frame.f_code.co_filename,
        }
        es.append(e)
        traceback = traceback.tb_next

    #err
    err={
        'type':type,
        'message':str(message),
        'traceback':es,
    }

    return err


def j2o(v):
    #json轉物件
    import json
    return json.loads(v)


def o2j(v):
    #物件轉json
    import json
    return json.dumps(v, ensure_ascii=False)


def str2b64(v):
    #字串轉base64字串
    import base64
    v=base64.b64encode(v.encode('utf-8'))
    return str(v,'utf-8')
    

def b642str(v):
    #base64字串轉字串
    import base64
    return base64.b64decode(v)


def readText(fn):
    #讀取檔案fn內文字
    import codecs
    with codecs.open(fn,'r',encoding='utf8') as f:
        return f.read()

    
def writeText(fn,str):
    #寫出文字str至檔案fn
    import codecs
    with codecs.open(fn,'w',encoding='utf8') as f:
        f.write(str)


def cv(inp, opt):
    out = ''

    try:
        out = converter.convert(inp)
    except:
        err=getError()
        print(err)
        
    return out


def shellCv(fpIn, fpOut, opt):
    
    #readText
    sinp=readText(fpIn)
    # print(sinp)

    # #j2o
    # rinp=j2o(sinp)

    #cv
    sout=cv(sinp,opt)
    # print(sout)
    
    # #o2j
    # jout=o2j(sout)
    
    #writeText
    writeText(fpOut,sout)


def core(b64):
    state=''

    try:

        #b642str
        s=b642str(b64)
        # print(s)

        #j2o
        o=j2o(s)
        print(o)

        #params
        fpIn=o['fpIn']
        fpOut=o['fpOut']
        opt=o['opt']

        #shellCv
        shellCv(fpIn, fpOut, opt)

        state='success'
    except:
        err=getError()
        state='error: [core]'+err["message"]

    return state


def run():
    import sys

    #由外部程序呼叫或直接給予檔案路徑
    state=''
    argv=sys.argv
    #argv=['','']
    if len(argv)==2:
        
        #b64
        b64=sys.argv[1]
        
        #core
        state=core(b64)
        
    else:
        #print(sys.argv)
        state='error: [run]invalid length of argv'
    
    #print & flush
    print(state)
    sys.stdout.flush()


if True:
    #正式版
    
    #run
    run()
    
    
if False:
    #產生測試輸入b64
    
    #inp
    inp={
        'fpIn':'D:\\技術-Python-OpenCC\\src\\sinp.txt',
        'fpOut':'D:\\技術-Python-OpenCC\\src\\sout.txt',
        'opt': {},
    }
    # print(o2j(inp))
    
    #str2b64
    b64=str2b64(o2j(inp))
    print(b64)

    #core
    state=core(b64)

    print(state)

