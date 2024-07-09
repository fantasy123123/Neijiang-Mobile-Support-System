import {useRef, useState} from "react";
import {IconSearch} from "@arco-design/web-react/icon";
import {Button, Descriptions, Input, Message, Modal, Table} from "@arco-design/web-react";

const AdminViewShops=()=>{
    const inputRef1 = useRef(null);
    const inputRef2 = useRef(null);
    const inputRef3 = useRef(null);
    const [ifView,setIfView]=useState(false)
    const [editObject,setEditObject]=useState({})

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
            dataIndex: 'location',
        },
        {
            title: '电话',
            dataIndex: 'phone'
        },
        {
            title: '经营类型',
            dataIndex: 'type',
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
            dataIndex: 'environment',
        },
        {
            title: '经营场所',
            dataIndex: 'place',
        },
        {
            title: '商品类别',
            dataIndex: 'category',
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

    const [data,setData]=useState([
        {
            name:'a',
            location:'地点',
            phone:'电话',
            email:'邮件',
            type:'type',
            environment:'环境',
            place:'地点',
            category:'类别',
            time:'创建时间',
            ifRecommend:false,
        },
        {
            name:'b',
            location:'地点',
            phone:'电话',
            email:'邮件',
            type:'type',
            environment:'环境',
            place:'地点',
            category:'类别',
            time:'创建时间',
            ifRecommend:false,
        },
        {
            name:'c',
            location:'地点',
            phone:'电话',
            email:'邮件',
            type:'type',
            environment:'环境',
            place:'地点',
            category:'类别',
            time:'创建时间',
            ifRecommend:false,
        },
    ])

    const column2 = [
        {
            label: '商户名称',
            value: editObject.name,
        },
        {
            label: '地址',
            value: editObject.location,
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
            value: editObject.type,
        },
        {
            label: '经营环境',
            value: editObject.environment,
        },
        {
            label: '经营场所',
            value: editObject.place,
        },
        {
            label: '商品类别',
            value: editObject.category,
        },
        {
            label: '创建时间',
            value: editObject.time,
        },
        {
            label: '管理员是否推荐',
            value: editObject.ifRecommend?<span style={{color:'green'}}>是</span>:<span style={{color:'red'}}>否</span>,
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
                        style={{width:'80%',marginLeft:'10%'}}
                        labelStyle={{ textAlign: 'right' }}
                        column={2}
                        colon=' : '
                        data={column2}
                    />
                    <div style={{display:'flex',justifyContent:'right',marginTop:10}}>
                        <Button
                            style={{marginRight:20}}
                            type={"primary"}
                            status={editObject.ifRecommend?'warning':'default'}
                            onClick={()=>{setEditObject({...editObject,ifRecommend:!editObject.ifRecommend})}}
                        >
                            {editObject.ifRecommend?'取消推荐':'推荐'}
                        </Button>
                        <Button
                            status={'danger'}
                            type={"primary"}
                            onClick={()=>{
                                if(window.confirm('确定注销该商户？')) {
                                    Message.info('注销成功!');
                                    setIfView(false)
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