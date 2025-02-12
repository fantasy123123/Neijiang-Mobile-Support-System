//已完成

import {useEffect, useRef, useState} from "react";
import {IconSearch} from "@arco-design/web-react/icon";
import {Button, Descriptions, Input, Message, Modal, Table} from "@arco-design/web-react";
import axiosInstance from "../../../api/AxiosApi";

const AdminViewUsers=()=>{
    const inputRef1 = useRef(null);
    const inputRef2 = useRef(null);
    const [ifView,setIfView]=useState(false)
    const [editObject,setEditObject]=useState({})
    const [data,setData]=useState([])

    useEffect(()=>{
        axiosInstance.get('/users').then(
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
            title: '用户id',
            dataIndex: 'userId',
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
            onFilter: (value, row) => (value ? row.id.indexOf(value) !== -1 : true),
            onFilterDropdownVisibleChange: (visible) => {
                if (visible) {
                    setTimeout(() => inputRef1.current.focus(), 150);
                }
            },
        },
        {
            title: '用户名称',
            dataIndex: 'name',
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
            onFilter: (value, row) => (value ? row.name.indexOf(value) !== -1 : true),
            onFilterDropdownVisibleChange: (visible) => {
                if (visible) {
                    setTimeout(() => inputRef2.current.focus(), 150);
                }
            },
        },
        {
            title: '电话',
            dataIndex: 'phone'
        },
        {
            title: '邮件',
            dataIndex: 'email'
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
            label: '用户id',
            value: editObject.userId,
        },
        {
            label: '账号id',
            value: editObject.accountId,
        },
        {
            label: '用户名称',
            value: editObject.name,
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
            label: '创建时间',
            value: editObject.createdAt?.substring(0,10),
        },
    ];

    return (
        <div style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <div style={{width:"90%",height:'90%'}}>
                <div style={{fontSize:25,fontWeight:'bold',color:'#165DFF',textAlign:'center'}}>
                    查看用户
                </div>
                <div style={{width:'95%',background:'white',textAlign:'right',marginLeft:'2.5%',marginTop:'2%',borderRadius:10,border:'1px solid grey',maxHeight:'82%',overflow:'auto'}}>
                    <Table border={true} borderCell={true} columns={columns} data={data} style={{margin:30}}/>
                </div>
                <Modal
                    footer={null}
                    title='用户详情与操作'
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
                                if(window.confirm('确定注销该用户？')) {
                                    axiosInstance.delete('/users/'+editObject.userId).then(
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

export default AdminViewUsers