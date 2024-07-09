import {useState} from "react";
import {Avatar, Button, DatePicker, Descriptions, Input, Modal, Progress, Radio, Upload} from "@arco-design/web-react";
import {IconEdit, IconPlus} from "@arco-design/web-react/icon";

const AdminBasicInformation=()=>{
    const [ifEdit,setIfEdit] = useState(false);
    const [initData,setInitData]=useState({
        uid:'用户id',
        name:'名字',
        sex:'女',
        phone:'电话',
        email:'邮件',
        image:'//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
        time:'创建时间'
    })
    const [editData,setEditData]=useState(initData)
    const column = [
        {
            label: 'uid',
            value: initData.uid,
        },
        {
            label: '用户名',
            value: initData.name,
        },
        {
            label: '性别',
            value: initData.sex,
        },
        {
            label: '手机号码',
            value: initData.phone,
        },
        {
            label: '电子邮件',
            value: initData.email,
        },
        {
            label: '创建时间',
            value: initData.time,
        },
    ];

    const [file, setFile] = useState({'url':initData.image});
    const cs = `arco-upload-list-item${file && file.status === 'error' ? ' is-error' : ''}`;

    return (
        <div style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <div style={{width:"90%",height:'90%'}}>
                <div style={{fontSize:25,fontWeight:'bold',color:'#165DFF',textAlign:'center'}}>
                    基本信息管理
                </div>
                <div style={{
                    width: '80%',
                    background: 'white',
                    marginLeft: '10%',
                    marginTop: '2%',
                    borderRadius: 10,
                    border: '1px solid grey',
                    maxHeight: '80%',
                    overflow: 'auto'
                }}>
                    <div style={{marginTop: 30}}>
                        <Button
                            type={'primary'}
                            size={"large"}
                            style={{marginRight: 50, float: "right"}}
                            onClick={() => {
                                setIfEdit(true)
                            }}
                        >
                            修改
                        </Button>
                        <div style={{display:'flex',alignItems:'center',marginLeft:50}}>
                            <div style={{marginBottom: 10,fontSize: 15,marginRight:30}}>管理员头像</div>
                            <Avatar size={80}>
                                <img
                                    alt='avatar'
                                    src={initData.image}
                                />
                            </Avatar>
                        </div>
                    </div>
                    <Descriptions
                        column={3}
                        size={'large'}
                        style={{paddingLeft: 50, paddingRight: 50, paddingTop: 30,paddingBottom:10}}
                        title='管理员信息'
                        data={column}
                        labelStyle={{textAlign: 'right'}}
                    />
                </div>
                <Modal
                    title='修改基本信息'
                    unmountOnExit={true}
                    maskClosable={false}
                    visible={ifEdit}
                    onOk={() => {
                        setIfEdit(false)
                    }}
                    onCancel={() => {
                        setIfEdit(false)
                    }}
                    autoFocus={false}
                >
                    <div style={{display:'flex',width:'100%',justifyContent:'space-between'}}>
                        <div style={{width:'27%'}}>
                            <div style={{height:100,width:'100%',justifyContent:'right',display:'flex',alignItems:'center'}}>
                                头像
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'right',display:'flex',alignItems:'center'}}>
                                用户名
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'right',display:'flex',alignItems:'center'}}>
                                性别
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'right',display:'flex',alignItems:'center'}}>
                                电话
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'right',display:'flex',alignItems:'center'}}>
                                电子邮件
                            </div>
                        </div>
                        <div style={{width:'65%'}}>
                            <div style={{
                                height: 100,
                                width: '100%',
                                justifyContent: 'left',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <Upload
                                    action='/'
                                    fileList={file ? [file] : []}
                                    showUploadList={false}
                                    onChange={(_, currentFile) => {
                                        setFile({
                                            ...currentFile,
                                            url: URL.createObjectURL(currentFile.originFile),
                                        });
                                    }}
                                    onProgress={(currentFile) => {
                                        setFile(currentFile);
                                    }}
                                >
                                    <div className={cs}>
                                        {file && file.url ? (
                                            <div className='arco-upload-list-item-picture custom-upload-avatar'>
                                                <img src={file.url} />
                                                <div className='arco-upload-list-item-picture-mask'>
                                                    <IconEdit />
                                                </div>
                                                {file.status === 'uploading' && file.percent < 100 && (
                                                    <Progress
                                                        percent={file.percent}
                                                        type='circle'
                                                        size='mini'
                                                        style={{
                                                            position: 'absolute',
                                                            left: '50%',
                                                            top: '50%',
                                                            transform: 'translateX(-50%) translateY(-50%)',
                                                        }}
                                                    />
                                                )}
                                            </div>
                                        ) : (
                                            <div className='arco-upload-trigger-picture'>
                                                <div className='arco-upload-trigger-picture-text'>
                                                    <IconPlus />
                                                    <div style={{ marginTop: 10, fontWeight: 600 }}>Upload</div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </Upload>
                            </div>
                            <div style={{
                                height: 50,
                                width: '100%',
                                justifyContent: 'left',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <Input
                                    defaultValue={initData.name}
                                    onChange={value => {
                                        setEditData({...editData, name: value})
                                    }}
                                    style={{width: '90%'}}
                                />
                            </div>
                            <div style={{
                                height: 50,
                                width: '100%',
                                justifyContent: 'left',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <Radio.Group defaultValue={initData.sex}>
                                    {['男', '女', '保密'].map((item) => {
                                        return (
                                            <Radio key={item} value={item}>
                                                {({ checked }) => {
                                                    return (
                                                        <Button tabIndex={-1} key={item} type={checked ? 'primary' : 'default'}>
                                                            {item}
                                                        </Button>
                                                    );
                                                }}
                                            </Radio>
                                        );
                                    })}
                                </Radio.Group>
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'left',display:'flex',alignItems:'center'}}>
                                <Input
                                    defaultValue={initData.phone}
                                    onChange={value=>{setEditData({...editData,phone:value})}}
                                    style={{width:'90%'}}
                                />
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'left',display:'flex',alignItems:'center'}}>
                                <Input
                                    defaultValue={initData.email}
                                    onChange={value=>{setEditData({...editData,email:value})}}
                                    style={{width:'90%'}}
                                />
                            </div>
                        </div>
                    </div>
                    <div style={{textAlign:'right',color:'grey',marginRight:20}}>
                        (无法修改创建时间)
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default AdminBasicInformation