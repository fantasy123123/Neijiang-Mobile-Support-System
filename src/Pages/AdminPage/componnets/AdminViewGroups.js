import {useRef, useState} from "react";
import {IconSearch} from "@arco-design/web-react/icon";
import {Button, Descriptions, Input, Message, Modal, Table} from "@arco-design/web-react";

const AdminViewGroups=()=>{
    const [ifView,setIfView]=useState(false)
    const [editObject,setEditObject]=useState({})
    const [groupData,setGroupData]=useState([
        {
            key:'1',
            id:'1',
            name:'groupname',
            description:'description',
            create:'time'
        },
        {
            key:'2',
            id:'2',
            name:'groupname',
            description:'description',
            create:'time'
        },
        {
            key:'3',
            id:'3',
            name:'groupname',
            description:'description',
            create:'time'
        },
    ])
    const inputRef1 = useRef(null);
    const group = [
        {
            title: '群组编号',
            dataIndex: 'id',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: '群组名称',
            dataIndex: 'name',
            filterIcon: <IconSearch />,
            filterDropdown: ({ filterKeys, setFilterKeys, confirm }) => {
                return (
                    <div className='arco-table-custom-filter'>
                        <Input.Search
                            style={{width:120}}
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
            onFilter: (value, row) => (value ? row.type.indexOf(value) !== -1 : true),
            onFilterDropdownVisibleChange: (visible) => {
                if (visible) {
                    setTimeout(() => inputRef1.current.focus(), 150);
                }
            },
        },
        {
            title: '描述',
            dataIndex: 'description'
        },
        {
            title: '创建时间',
            dataIndex: 'create',
            sorter: (a, b) => a.time - b.time,
        },
        {
            title: '操作',
            render: (col, record) => {
                return <div style={{display:'flex'}}>
                    <Button
                        status={'danger'}
                        type={"primary"}
                        onClick={()=>{
                            if(window.confirm('确定注销该群组？')) {
                                Message.info('注销成功!');
                                setIfView(false)
                            }
                        }}>
                        注销
                    </Button>
                </div>
            }
        }
    ];

    const [memberData,setMemberData]=useState([
        {
            key: '1',
            userId: '1',
            name:'a',
            time:'createTime',
        },
        {
            key: '2',
            userId: '2',
            name:'a',
            time:'createTime',
        },
        {
            key: '3',
            userId: '3',
            name:'a',
            time:'createTime',
        },
    ])
    const inputRef2 = useRef(null);
    const member = [
        {
            title: '成员编号',
            dataIndex: 'userId',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: '成员名字',
            dataIndex: 'name',
            filterIcon: <IconSearch />,
            filterDropdown: ({ filterKeys, setFilterKeys, confirm }) => {
                return (
                    <div className='arco-table-custom-filter'>
                        <Input.Search
                            style={{width:120}}
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
            title: '注册时间',
            dataIndex: 'time',
            sorter: (a, b) => a.time - b.time,
        },
    ];
    function expandedRowRender() {
        return <Table
            columns={member}
            data={memberData}
            pagination={false}
            borderCell={true}
        />;
    }
    return (
        <div style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <div style={{width: "90%", height: '90%'}}>
                <div style={{fontSize: 25, fontWeight: 'bold', color: '#165DFF', textAlign: 'center'}}>
                    查看群组
                </div>
                <div style={{
                    width:'95%',
                    background:'white',
                    textAlign:'right',
                    marginLeft:'2.5%',
                    marginTop:'2%',
                    borderRadius:10,
                    border:'1px solid grey',
                    maxHeight:'82%',
                    overflow:'auto'
                }}>
                    <Table
                        indentSize={60}
                        expandedRowRender={expandedRowRender}
                        columns={group}
                        data={groupData}
                        style={{margin: 30}}
                        borderCell={true}
                        pagination={{pageSize: 5}}
                    />
                </div>
            </div>
        </div>
    )
}

export default AdminViewGroups