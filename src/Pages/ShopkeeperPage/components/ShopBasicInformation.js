
import {Button, Descriptions, Input, Modal, Image, Upload, Space} from "@arco-design/web-react";
import {useState} from "react";

const ShopBasicInformation=()=>{
    const [ifEdit,setIfEdit]=useState(false)
    const [visible, setVisible] = useState(false);

    const [initData,setInitData]=useState({
        name:'名字',
        location:'地点',
        phone:'电话',
        email:'邮件',
        type:'经营类型',
        environment:'经营环境',
        place:'经营场所',
        category:'商品类别',
        image:[
            {
                uid:"1",
                name:'照片',
                url:'//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp'
            },
            {
                uid:"2",
                name:'照片',
                url:'//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp'
            },
            {
                uid:"3",
                name:'照片',
                url:'//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp'
            },
            {
                uid:"4",
                name:'照片',
                url:'//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp'
            },
            {
                uid:"5",
                name:'照片',
                url:'//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp'
            },
        ],
        time:'创建时间'
    })
    const [editData,setEditData]=useState(initData)
    const column = [
        {
            label: '名称',
            value: initData.name,
        },
        {
            label: '地址',
            value: initData.location,
        },
        {
            label: '电话',
            value: initData.phone,
        },
        {
            label: '电子邮件',
            value: initData.email,
        },
        {
            label: '商户经营类型',
            value: initData.type,
        },
        {
            label: '商户经营环境',
            value: initData.environment
        },
        {
            label: '商户经营场所',
            value: initData.place,
        },
        {
            label: '商户产品类别',
            value: initData.category,
        },
        {
            label: '创建时间',
            value: initData.time,
        },
    ];

    return (
        <div style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <div style={{width:"90%",height:'90%'}}>
                <div style={{fontSize:25,fontWeight:'bold',color:'#165DFF',textAlign:'center'}}>
                    基本信息管理
                </div>
                <div style={{width:'90%',background:'white',marginLeft:'5%',marginTop:'3%',borderRadius:10,border:'1px solid grey',maxHeight:'80%',overflow:'auto'}}>
                    <Button
                        type={'primary'}
                        size={"large"}
                        style={{marginRight:30,float:"right",marginTop:30}}
                        onClick={()=>{setIfEdit(true)}}
                    >
                        修改
                    </Button>
                    <Descriptions
                        column={3}
                        size={'large'}
                        style={{paddingLeft:50,paddingRight:50,paddingTop:30}}
                        title='商家信息'
                        data={column}
                        labelStyle={{ textAlign: 'right' }}
                    />
                    <div  style={{paddingLeft:50,paddingRight:50,paddingBottom:30}}>
                        <div style={{color:'#86909C',marginBottom:10}}>商户照片</div>
                        <Upload
                            action='/'
                            multiple
                            imagePreview
                            defaultFileList={editData.image}
                            listType='picture-card'
                        />
                    </div>
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
                            <div style={{height:50,width:'100%',justifyContent:'right',display:'flex',alignItems:'center'}}>
                                名称
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'right',display:'flex',alignItems:'center'}}>
                                地址
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'right',display:'flex',alignItems:'center'}}>
                                电话
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'right',display:'flex',alignItems:'center'}}>
                                电子邮件
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'right',display:'flex',alignItems:'center'}}>
                                商户经营类型
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'right',display:'flex',alignItems:'center'}}>
                                商户经营环境
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'right',display:'flex',alignItems:'center'}}>
                                商户经营场所
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'right',display:'flex',alignItems:'center'}}>
                                商户产品类别
                            </div>
                        </div>
                        <div style={{width:'65%'}}>
                            <div style={{height:50,width:'100%',justifyContent:'left',display:'flex',alignItems:'center'}}>
                                <Input
                                    defaultValue={editData.name}
                                    onChange={value=>{setEditData({...editData,name:value})}}
                                    style={{width:'90%'}}
                                />
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'left',display:'flex',alignItems:'center'}}>
                                <Input
                                    defaultValue={editData.location}
                                    onChange={value=>{setEditData({...editData,location:value})}}
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
                            <div style={{height:50,width:'100%',justifyContent:'left',display:'flex',alignItems:'center'}}>
                                <Input
                                    defaultValue={editData.type}
                                    onChange={value=>{setEditData({...editData,type:value})}}
                                    style={{width:'90%'}}
                                />
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'left',display:'flex',alignItems:'center'}}>
                                <Input
                                    defaultValue={editData.environment}
                                    onChange={value=>{setEditData({...editData,environment:value})}}
                                    style={{width:'90%'}}
                                />
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'left',display:'flex',alignItems:'center'}}>
                                <Input
                                    defaultValue={editData.place}
                                    onChange={value=>{setEditData({...editData,place:value})}}
                                    style={{width:'90%'}}
                                />
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'left',display:'flex',alignItems:'center'}}>
                                <Input
                                    defaultValue={editData.category}
                                    onChange={value=>{setEditData({...editData,category:value})}}
                                    style={{width:'90%'}}
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

export default ShopBasicInformation