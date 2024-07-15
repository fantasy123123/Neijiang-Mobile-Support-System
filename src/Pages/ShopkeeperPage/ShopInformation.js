import {Avatar, Button, Card, Descriptions, Input, Message, Modal, Upload} from "@arco-design/web-react";
import './ShopkeeperPage.css'
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosInstance from "../../api/AxiosApi";

const ShopInformation=()=>{
    const navigate=useNavigate()
    const [ifEdit,setIfEdit]=useState(false)
    const [initData,setInitData]=useState({})
    const [editData,setEditData]=useState(initData)

    useEffect(()=>{
        axiosInstance.get('/merchants/accountId/'+localStorage.getItem('accountId')).then(
            res=>{
                setInitData(res.data.data)
                setEditData(res.data.data)
            }
        ).catch(
            err=>{
                console.log(err)
            }
        )
    },[])


    const column = [
        {
            label: '名称',
            value: initData.name,
        },
        {
            label: '创建时间',
            value: initData.createdAt?.substring(0,10),
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
            value: initData.businessType,
        },
        {
            label: '商户经营环境',
            value: initData.businessEnvironment
        },
        {
            label: '商户经营场所',
            value: initData.businessLocation,
        },
        {
            label: '商户产品类别',
            value: initData.productCategory,
        },
        {
            label: '商户类别',
            value: initData.categoryName,
        },
        {
            label: '地址',
            value: initData.address,
        },
    ];
    return (
        <div style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <div style={{width:"90%",height:'90%'}}>
                <div style={{fontSize:25,fontWeight:'bold',color:'#165DFF',textAlign:'center'}}>
                    设置商户信息
                </div>
                <div style={{width:'90%',background:'white',marginLeft:'5%',marginTop:'2%',borderRadius:10,border:'1px solid grey',maxHeight:'80%',overflow:'auto'}}>
                    <Button
                        type={'primary'}
                        size={"large"}
                        style={{marginRight:50,float:"right",marginTop:30}}
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
                    <div style={{paddingLeft:50,paddingRight:50,paddingBottom:30}}>
                        <div style={{color:'#86909C',marginBottom:10}}>商户照片</div>
                        <Upload
                            action={`${axiosInstance.defaults.baseURL}/merchants/images/` + initData.merchantId}
                            headers={{ token: localStorage.getItem("token") }}
                            limit={1}
                            multiple
                            imagePreview
                            listType='picture-card'
                        >
                            <Avatar size={80} shape={'square'}>
                                <img src={initData.imageUrl}/>
                            </Avatar>
                        </Upload>
                    </div>
                </div>
                <div style={{width:'100%',display:'flex',justifyContent:'space-around',marginTop:30}}>
                    <Card
                        onClick={()=>{navigate('/shopkeeper/shopInformation/discount',{state:initData.merchantId})}}
                        style={{ width: '28%',cursor:'pointer' }}
                        title='折扣管理'
                        className='card-custom-hover-style'
                        hoverable
                    >
                        <div style={{fontSize:17}}>
                            管理商户的打折活动。
                        </div>
                    </Card>
                    <Card
                        onClick={()=>{navigate('/shopkeeper/shopInformation/map')}}
                        style={{ width: '28%',cursor:'pointer' }}
                        title='商户地图'
                        className='card-custom-hover-style'
                        hoverable
                    >
                        <div style={{fontSize:17}}>
                            将商户所在的地理位置在地图上标示出来。
                        </div>
                    </Card>
                    <Card
                        onClick={()=>{navigate('/shopkeeper/shopInformation/image')}}
                        style={{ width: '28%',cursor:'pointer' }}
                        title='商户相册'
                        className='card-custom-hover-style'
                        hoverable
                    >
                        <div style={{fontSize:17}}>
                            为商户提供的照片管理系统。
                        </div>
                    </Card>
                </div>
                <Modal
                    title='修改基本信息'
                    unmountOnExit={true}
                    maskClosable={false}
                    visible={ifEdit}
                    onOk={() => {
                        axiosInstance.put('/merchants',editData).then(
                            res=>{
                                Message.info('修改成功！')
                                setIfEdit(false)
                                setInitData(editData)
                            }
                        ).catch(
                            err=>{
                                Message.error('修改失败！')
                            }
                        )
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
                            <div style={{height:50,width:'100%',justifyContent:'right',display:'flex',alignItems:'center'}}>
                                商户类别
                            </div>
                        </div>
                        <div style={{width:'65%'}}>
                            <div style={{height:50,width:'100%',justifyContent:'left',display:'flex',alignItems:'center'}}>
                                <Input
                                    defaultValue={initData.name}
                                    onChange={value=>{setEditData({...editData,name:value})}}
                                    style={{width:'90%'}}
                                />
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'left',display:'flex',alignItems:'center'}}>
                                <Input
                                    defaultValue={initData.address}
                                    onChange={value=>{setEditData({...editData,address:value})}}
                                    style={{width:'90%'}}
                                />
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
                            <div style={{height:50,width:'100%',justifyContent:'left',display:'flex',alignItems:'center'}}>
                                <Input
                                    defaultValue={initData.businessType}
                                    onChange={value=>{setEditData({...editData,type:value})}}
                                    style={{width:'90%'}}
                                />
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'left',display:'flex',alignItems:'center'}}>
                                <Input
                                    defaultValue={initData.businessEnvironment}
                                    onChange={value=>{setEditData({...editData,environment:value})}}
                                    style={{width:'90%'}}
                                />
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'left',display:'flex',alignItems:'center'}}>
                                <Input
                                    defaultValue={initData.businessLocation}
                                    onChange={value=>{setEditData({...editData,place:value})}}
                                    style={{width:'90%'}}
                                />
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'left',display:'flex',alignItems:'center'}}>
                                <Input
                                    defaultValue={initData.productCategory}
                                    onChange={value=>{setEditData({...editData,category:value})}}
                                    style={{width:'90%'}}
                                />
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'left',display:'flex',alignItems:'center'}}>
                                <Input
                                    defaultValue={initData.categoryName}
                                    onChange={value=>{setEditData({...editData,categoryName:value})}}
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

export default ShopInformation