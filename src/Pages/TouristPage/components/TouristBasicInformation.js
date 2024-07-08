import {useState} from "react";
import {Button, DatePicker, Descriptions, Input, Modal, Radio, Upload} from "@arco-design/web-react";

const TouristBasicInformation=()=>{
    const [ifEdit,setIfEdit] = useState(false);
    const [ifVisible,setIfVisible] = useState(false);
    const [initData,setInitData]=useState({
        uid:'用户id',
        name:'名字',
        sex:'女',
        birthday:'2004-12-26',
        phone:'电话',
        email:'邮件',
        text:'用户个性签名',
        image:[
            {
                uid:"1",
                name:'照片',
                url:'//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp'
            },
        ],
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
            label: '出生日期',
            value: initData.birthday,
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
            label: '个性签名',
            value: initData.text,
        },
        {
            label: '创建时间',
            value: initData.time,
        },
    ];


    return (
        <div style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <div style={{width: "90%", height: '90%'}}>
                <div style={{fontSize: 25, fontWeight: 'bold', color: '#165DFF', textAlign: 'center'}}>
                    基本信息管理
                </div>
                <div style={{
                    width: '90%',
                    background: 'white',
                    marginLeft: '5%',
                    marginTop: '3%',
                    borderRadius: 10,
                    border: '1px solid grey',
                    maxHeight: '80%',
                    overflow: 'auto'
                }}>
                    <Button
                        type={'primary'}
                        size={"large"}
                        style={{marginRight: 30, float: "right", marginTop: 30}}
                        onClick={() => {
                            setIfEdit(true)
                        }}
                    >
                        修改
                    </Button>
                    <div style={{paddingLeft: 50, paddingRight: 50, paddingBottom: 30,marginTop: 30,marginBottom: -35}}>
                        <div style={{marginBottom: 10,fontSize: 15}}>用户头像</div>
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 130, border: '1px solid #E6E6E6',borderRadius: 50}}>
                            <img src={editData.image[0].url} style={{width: 100, height: 100, borderRadius: 50}} alt='用户头像'/>
                        </div>

                    </div>
                    <Descriptions
                        column={3}
                        size={'large'}
                        style={{paddingLeft: 50, paddingRight: 50, paddingTop: 30}}
                        title='用户信息'
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
                                出生日期
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'right',display:'flex',alignItems:'center'}}>
                                电话
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'right',display:'flex',alignItems:'center'}}>
                                电子邮件
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'right',display:'flex',alignItems:'center'}}>
                                个性签名
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
                                <img src={editData.image[0].url}
                                     style={{width: 70, height: 70, borderRadius: 50, marginBottom: 10,marginRight: -110}}
                                     alt='用户头像'/>
                                <span style={{marginLeft: 130}}>
                                    <Upload
                                        action='/'
                                        multiple
                                        imagePreview
                                        listType='picture-list'
                                    />
                                </span>

                            </div>
                            <div style={{
                                height: 50,
                                width: '100%',
                                justifyContent: 'left',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <Input
                                    defaultValue={editData.name}
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
                                <Radio.Group defaultValue={editData.sex}>
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
                                <DatePicker
                                    defaultValue={editData.birthday}
                                    onChange={(value) => {
                                        setEditData({ ...editData, birthday: value });
                                    }}
                                    style={{width:'90%'}}
                                />
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'left',display:'flex',alignItems:'center'}}>
                                <Input
                                    defaultValue={editData.phone}
                                    onChange={value=>{setEditData({...editData,phone:value})}}
                                    style={{width:'90%'}}
                                />
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'left',display:'flex',alignItems:'center'}}>
                                <Input
                                    defaultValue={editData.email}
                                    onChange={value=>{setEditData({...editData,email:value})}}
                                    style={{width:'90%'}}
                                />
                            </div>
                            <div style={{height:130,width:'100%',justifyContent:'left',display:'flex',alignItems:'center'}}>
                                <Input.TextArea
                                    defaultValue={editData.text}
                                    onChange={value=>{setEditData({...editData,text:value})}}
                                    style={{width:'90%',height:100}}
                                />
                            </div>
                        </div>
                    </div>
                    <br />
                    <div style={{textAlign:'right',color:'grey',marginRight:20}}>
                        (无法修改创建时间)
                    </div>
                </Modal>
            </div>
        </div>
    )
}





export default TouristBasicInformation