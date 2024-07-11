//已完成

import {useEffect, useRef, useState} from "react";
import {IconSearch} from "@arco-design/web-react/icon";
import {Button, Descriptions, Input, Message, Modal, Table} from "@arco-design/web-react";
import axiosInstance from "../../../api/AxiosApi";

const AdminViewShops=()=>{
    const inputRef1 = useRef(null);
    const inputRef2 = useRef(null);
    const inputRef3 = useRef(null);
    const [ifView,setIfView]=useState(false)
    const [editObject,setEditObject]=useState({})
    const [data,setData]=useState([])

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

    const columns = [
        {
            title: '商户名称',
            dataIndex: 'name',
            filterIcon: <IconSearch />,
            filterDropdown: ({ filterKeys, setFilterKeys, confirm }) => {
                return (
                    <div className='arco-table-custom-filter'>
                        <Input.Search
                            style={{width:150}}
                            ref={inputRef1}
                            searchButton
                            value={filterKeys[0] || ''}
                            onChange={(value) => {
                                setFilterKeys(value ? [value] : []);
                            }}
                            onSearch={() => {
                                confirm();
                            }}
                        />
                    </div>
                );
            },
            onFilter: (value, row) => (value ? row.name.indexOf(value) !== -1 : true),
            onFilterDropdownVisibleChange: (visible) => {
                if (visible) {
                    setTimeout(() => inputRef1.current.focus(), 150);
                }
            },
        },
        {
            title: '地址',
            dataIndex: 'address',
        },
        {
            title: '电话',
            dataIndex: 'phone'
        },
        {
            title: '经营类型',
            dataIndex: 'businessType',
            filterIcon: <IconSearch />,
            filterDropdown: ({ filterKeys, setFilterKeys, confirm }) => {
                return (
                    <div className='arco-table-custom-filter'>
                        <Input.Search
                            style={{width:150}}
                            ref={inputRef2}
                            searchButton
                            value={filterKeys[0] || ''}
                            onChange={(value) => {
                                setFilterKeys(value ? [value] : []);
                            }}
                            onSearch={() => {
                                confirm();
                            }}
                        />
                    </div>
                );
            },
            onFilter: (value, row) => (value ? row.type.indexOf(value) !== -1 : true),
            onFilterDropdownVisibleChange: (visible) => {
                if (visible) {
                    setTimeout(() => inputRef2.current.focus(), 150);
                }
            },
        },
        {
            title: '经营环境',
            dataIndex: 'businessEnvironment',
        },
        {
            title: '经营场所',
            dataIndex: 'businessLocation',
        },
        {
            title: '商品类别',
            dataIndex: 'productCategory',
            filterIcon: <IconSearch />,
            filterDropdown: ({ filterKeys, setFilterKeys, confirm }) => {
                return (
                    <div className='arco-table-custom-filter'>
                        <Input.Search
                            style={{width:150}}
                            ref={inputRef3}
                            searchButton
                            value={filterKeys[0] || ''}
                            onChange={(value) => {
                                setFilterKeys(value ? [value] : []);
                            }}
                            onSearch={() => {
                                confirm();
                            }}
                        />
                    </div>
                );
            },
            onFilter: (value, row) => (value ? row.category.indexOf(value) !== -1 : true),
            onFilterDropdownVisibleChange: (visible) => {
                if (visible) {
                    setTimeout(() => inputRef3.current.focus(), 150);
                }
            },
        },
        {
            title: '操作',
            render: (col, record) => {
                return <div style={{display:'flex'}}>
                    <Button
                        type={"primary"}
                        onClick={()=>{
                            setEditObject(record)
                            setIfView(true)
                        }}
                    >
                        详情
                    </Button>
                </div>
            }
        }
    ];

    const column2 = [
        {
            label: '商户id',
            value: editObject.merchantId,
        },
        {
            label: '商户名称',
            value: editObject.name,
        },
        {
            label: '地址',
            value: editObject.address,
        },
        {
            label: '联系方式',
            value: editObject.phone,
        },
        {
            label: '邮件',
            value: editObject.email,
        },
        {
            label: '经营类型',
            value: editObject.businessType,
        },
        {
            label: '经营环境',
            value: editObject.businessEnvironment,
        },
        {
            label: '经营场所',
            value: editObject.businessLocation,
        },
        {
            label: '商品类别',
            value: editObject.productCategory,
        },
        {
            label: '创建时间',
            value: editObject.createdAt?.substring(0,10),
        },
    ];

    return (
        <div style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <div style={{width:"90%",height:'90%'}}>
                <div style={{fontSize:25,fontWeight:'bold',color:'#165DFF',textAlign:'center'}}>
                    查看商户
                </div>
                <div style={{width:'95%',background:'white',textAlign:'right',marginLeft:'2.5%',marginTop:'2%',borderRadius:10,border:'1px solid grey',maxHeight:'82%',overflow:'auto'}}>
                    <Table border={true} borderCell={true} columns={columns} data={data} style={{margin:30}}/>
                </div>
                <Modal
                    footer={null}
                    title='商户详情与操作'
                    unmountOnExit={true}
                    maskClosable={false}
                    visible={ifView}
                    onOk={() => {
                        setEditObject({})
                        setIfView(false)
                    }}
                    onCancel={() => {
                        setEditObject({})
                        setIfView(false)
                    }}
                    autoFocus={false}
                >
                    <Descriptions
                        style={{width:'100%'}}
                        labelStyle={{ textAlign: 'right' }}
                        column={2}
                        colon=' : '
                        data={column2}
                    />
                    <div style={{display:'flex',justifyContent:'right',marginTop:10}}>
                        <Button
                            status={'danger'}
                            type={"primary"}
                            onClick={()=>{
                                if(window.confirm('确定注销该商户？')) {
                                    axiosInstance.delete('/merchants/'+editObject.merchantId).then(
                                        res=>{
                                            Message.info('注销成功!')
                                            setData([...data.filter(item=>item!==editObject)])
                                            setIfView(false)
                                        }
                                    ).catch(
                                        err=>{
                                            console.log(err)
                                        }
                                    )
                                }
                            }}>
                            注销
                        </Button>
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default AdminViewShops