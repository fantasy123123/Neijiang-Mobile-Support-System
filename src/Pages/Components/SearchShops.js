//已完成

import {Button, Descriptions, Image, Input, Message, Modal, Table} from "@arco-design/web-react";
import {useEffect, useState} from "react";
import axiosInstance from "../../api/AxiosApi";
const InputSearch = Input.Search;

const SearchShops=()=>{
    const [data,setData]=useState([])
    const [ifView,setIfView]=useState(false)
    const [viewObject,setViewObject]=useState({})

    useEffect(()=>{
       axiosInstance.get('/merchants').then(
           res=>{
               setData(res.data.data)
           }
       ).catch(
           err=>{
               console.log(err)
           }
       )
    },[])

    const column=[
        {
            title: '名称',
            dataIndex: 'name'
        },
        {
            title: '地址',
            dataIndex: 'address'
        },
        {
            title: '联系方式',
            dataIndex: 'phone'
        },
        {
            title: '经营类型',
            dataIndex: 'businessType'
        },
        {
            title: '经营环境',
            dataIndex: 'businessEnvironment'
        },
        {
            title: '经营场所',
            dataIndex: 'businessLocation'
        },
        {
            title: '商品类别',
            dataIndex: 'productCategory'
        },
        {
            title: '操作',
            render: (col, record) => {
                return <Button
                        type={"primary"}
                        onClick={()=>{
                            setViewObject(record)
                            setIfView(true)
                        }}
                    >
                        详情
                    </Button>
            }
        }
    ]

    const column2 = [
        {
            label: '商户名称',
            value: viewObject.name,
        },
        {
            label: '地址',
            value: viewObject.address,
        },
        {
            label: '联系方式',
            value: viewObject.phone,
        },
        {
            label: '邮件',
            value: viewObject.email,
        },
        {
            label: '经营类型',
            value: viewObject.businessType,
        },
        {
            label: '经营环境',
            value: viewObject.businessEnvironment,
        },
        {
            label: '经营场所',
            value: viewObject.businessLocation,
        },
        {
            label: '商品类别',
            value: viewObject.productCategory,
        },
        {
            label: '商户类别',
            value: viewObject.categoryName,
        },
        {
            label: '创建时间',
            value: viewObject.createdAt?.substring(0,10),
        },
    ];

    return (
        <div style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <div style={{width:"90%",height:'90%'}}>
                <div style={{fontSize:25,fontWeight:'bold',color:'#165DFF',textAlign:'center'}}>
                    搜索商户
                </div>
                <div style={{width:'90%',background:'white',marginLeft:'5%',marginTop:'2%',borderRadius:10,border:'1px solid grey',maxHeight:'90%',overflow:'auto'}}>
                    <div style={{width:'90%',marginLeft:'5%',marginTop:22,marginBottom:25,textAlign:'center'}}>
                        <InputSearch
                            size={"large"}
                            allowClear
                            searchButton='搜索'
                            placeholder='请输入商户名称关键词......'
                            style={{ width: 350 }}
                            onSearch={value => {
                                axiosInstance.post('/merchants/search',{
                                    keyword:value
                                }).then(
                                    res=>{
                                        setData(res.data.data)
                                        Message.info('搜索成功！')
                                    }
                                ).catch(
                                    err=>{
                                        console.log(err)
                                    }
                                )
                            }}
                        />
                        <div style={{marginTop:10,textAlign:'left',fontSize:17,color:'grey',marginLeft:10}}>搜索结果</div>
                        <Table columns={column} data={data} style={{marginTop:8}}/>
                    </div>
                </div>

                <Modal
                    title='商户详情'
                    unmountOnExit={true}
                    maskClosable={false}
                    visible={ifView}
                    onOk={() => {
                        setViewObject({})
                        setIfView(false)
                    }}
                    onCancel={() => {
                        setViewObject({})
                        setIfView(false)
                    }}
                    autoFocus={false}
                >
                    <Descriptions
                        style={{width:'80%',marginLeft:'10%'}}
                        labelStyle={{ textAlign: 'right' }}
                        column={2}
                        colon=' : '
                        data={column2}
                    />
                    <div style={{color:'darkgray',marginLeft:'10%'}}>
                        商户照片
                    </div>
                    <Image src={viewObject.imageUrl} width={'80%'} style={{marginLeft:'10%',marginTop:10}} alt={'image'} />
                </Modal>
                </div>
        </div>
    )
}

export default SearchShops