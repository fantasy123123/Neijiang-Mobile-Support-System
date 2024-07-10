//已完成

import {useEffect, useRef, useState} from "react";
import {IconSearch} from "@arco-design/web-react/icon";
import {Button,  Input, Message,  Table} from "@arco-design/web-react";
import axiosInstance from "../../../api/AxiosApi";

const AdminViewGroups=()=>{
    const [groupData,setGroupData]=useState([])
    const [memberData,setMemberData]=useState([])

    useEffect(()=>{
        axiosInstance.get('/groups').then(
            res=>{
                let tempGroup=[]
                res.data.data.forEach((value,index)=>{
                    tempGroup.push({...value,key:value.groupId})
                })
                setGroupData(tempGroup)
                let tempMember=[]
                res.data.data.forEach((value, index) => {
                    axiosInstance.get('/groups/members/'+value.groupId).then(
                        res=>{
                            tempMember.unshift(res.data.data)
                        }
                    ).catch(
                        err=>{
                            console.log(err)
                        }
                    )
                })
                setMemberData(tempMember)
            }
        ).catch(
            err=>{
                console.log(err)
            }
        )

    },[])

    const inputRef1 = useRef(null);
    const inputRef2 = useRef(null);
    const group = [
        {
            title: '群组编号',
            dataIndex: 'groupId',
            sorter: (a, b) => a.groupId - b.groupId,
        },
        {
            title: '群组名称',
            dataIndex: 'groupName',
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
            onFilter: (value, row) => (value ? row.groupName.indexOf(value) !== -1 : true),
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
            dataIndex: 'createdAt',
            sorter: (a, b) => a.createdAt - b.createdAt,
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
                                axiosInstance.delete('/groups/'+record.groupId).then(
                                    res=>{
                                        setGroupData([...groupData.filter(item=>item!==record)])
                                        Message.info('注销成功!');
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
            }
        }
    ];

    const member = [
        {
            title: '成员账号',
            dataIndex: 'accountId',
            sorter: (a, b) => a.accountId - b.accountId,
        },
        {
            title: '成员名称',
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
            onFilter: (value, row) => (value ? row.name.indexOf(value) !== -1 : true),
            onFilterDropdownVisibleChange: (visible) => {
                if (visible) {
                    setTimeout(() => inputRef2.current.focus(), 150);
                }
            },
        },
        {
            title: '成员角色',
            dataIndex: 'role',
        },
        {
            title: '注册时间',
            dataIndex: 'createdAt',
            sorter: (a, b) => a.createdAt - b.createdAt,
        },
    ];

    function expandedRowRender(record,index) {
        return <Table
            columns={member}
            data={memberData[index]}
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