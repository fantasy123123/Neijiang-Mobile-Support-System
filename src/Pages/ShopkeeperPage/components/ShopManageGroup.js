import { useEffect, useRef, useState } from 'react';
import { Button, Input, Message, Table, Modal, Form } from '@arco-design/web-react';
import { IconSearch } from '@arco-design/web-react/icon';
import axiosInstance from '../../../api/AxiosApi';

const ShopManageGroup = () => {
    const [groupData, setGroupData] = useState([]);
    const [memberData, setMemberData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [addMemberVisible, setAddMemberVisible] = useState(false);
    const [currentGroupId, setCurrentGroupId] = useState(null);
    const [form] = Form.useForm();
    const [addMemberForm] = Form.useForm();

    useEffect(() => {
        fetchGroups();
    }, []);

    const fetchGroups = async () => {
        try {
            const response = await axiosInstance.get('/groups');
            let tempGroup = response.data.data.map(value => ({ ...value, key: value.groupId }));
            tempGroup.forEach((group, index) => {
                tempGroup[index].createdAt = formatDate(group.createdAt);
            });
            setGroupData(tempGroup);

            let tempMember = [];
            for (let group of response.data.data) {
                const memberResponse = await axiosInstance.get(`/groups/members/${group.groupId}`);
                tempMember.push(memberResponse.data.data);
            }
            setMemberData(tempMember);
        } catch (error) {
            console.error(error);
        }
    };

    const inputRef1 = useRef(null);
    const inputRef2 = useRef(null);

    const groupColumns = [
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
                            style={{ width: 120 }}
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
                return <div style={{ display: 'flex' }}>
                    <Button
                        style={{ marginLeft: 10 }}
                        type="primary"
                        onClick={() => {
                            setCurrentGroupId(record.groupId);
                            setAddMemberVisible(true);
                        }}
                    >
                        添加成员
                    </Button>
                    <Button
                        style={{width:'87.6px', marginLeft: 20}}
                        status={'danger'}
                        type={"primary"}
                        onClick={() => {
                            if (window.confirm('确定注销该群组？')) {
                                axiosInstance.delete(`/groups/${record.groupId}`).then(
                                    res => {
                                        setGroupData([...groupData.filter(item => item !== record)]);
                                        Message.info('注销成功!');
                                    }
                                ).catch(
                                    err => {
                                        console.log(err);
                                    }
                                );
                            }
                        }}>
                        注销
                    </Button>
                </div>
            }
        }
    ];

    const memberColumns = [
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
                            style={{ width: 120 }}
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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' };
        return date.toLocaleDateString('en-US', options);
    };

    const expandedRowRender = (record, index) => {
        return <Table
            columns={memberColumns}
            data={memberData[index]}
            pagination={false}
            borderCell={true}
        />;
    };

    const handleCreateGroup = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const handleOk = async () => {
        try {
            const values = await form.validate();
            const response = await axiosInstance.post('/groups', values);
            if (response.data.status === 'success') {
                Message.success('群组创建成功');
                setVisible(false);
                form.resetFields();
                fetchGroups(); // 重新获取群组数据
            } else {
                Message.error('群组创建失败');
            }
        } catch (error) {
            console.error(error);
            Message.error('群组创建失败');
        }
    };

    const handleAddMemberCancel = () => {
        setAddMemberVisible(false);
    };

    const handleAddMemberOk = async () => {
        try {
            const values = await addMemberForm.validate();
            const response = await axiosInstance.post('/groups/members', {
                groupId: currentGroupId,
                accountId: values.accountId,
                role: values.role
            });
            if (response.data.status === 'success') {
                Message.success('成员添加成功');
                setAddMemberVisible(false);
                addMemberForm.resetFields();
                fetchGroups(); // 重新获取群组数据
            } else {
                Message.error('成员添加失败');
            }
        } catch (error) {
            console.error(error);
            Message.error('成员添加失败');
        }
    };

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: "90%", height: '90%' }}>
                <div style={{ fontSize: 25, fontWeight: 'bold', color: '#165DFF', textAlign: 'center' }}>
                    群组管理
                </div>

                <Modal
                    unmountOnExit={true}
                    title="创建群组"
                    visible={visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    autoFocus={false}
                    focusLock={true}
                >
                    <Form form={form} layout="vertical">
                        <Form.Item label="群组名称" field="groupName" rules={[{ required: true, message: '请输入群组名称' }]}>
                            <Input placeholder="请输入群组名称" />
                        </Form.Item>
                        <Form.Item label="描述" field="description">
                            <Input.TextArea placeholder="请输入群组描述" />
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    unmountOnExit={true}
                    title="添加成员"
                    visible={addMemberVisible}
                    onOk={handleAddMemberOk}
                    onCancel={handleAddMemberCancel}
                    autoFocus={false}
                    focusLock={true}
                >
                    <Form form={addMemberForm} layout="vertical">
                        <Form.Item label="成员账号" field="accountId" rules={[{ required: true, message: '请输入成员账号' }]}>
                            <Input placeholder="请输入成员账号" />
                        </Form.Item>
                        <Form.Item label="成员角色" field="role" rules={[{ required: true, message: '请输入成员角色' }]}>
                            <Input placeholder="请输入成员角色" />
                        </Form.Item>
                    </Form>
                </Modal>
                <div style={{
                    width: '95%',
                    background: 'white',
                    textAlign: 'right',
                    marginLeft: '2.5%',
                    marginTop: '2%',
                    borderRadius: 10,
                    border: '1px solid grey',
                    maxHeight: '82%',
                    overflow: 'auto'
                }}>
                    <div style={{marginRight: 30, marginTop: 20}}>
                        <Button type="primary" onClick={handleCreateGroup}>创建群组</Button>
                    </div>
                    <Table
                        indentSize={60}
                        expandedRowRender={expandedRowRender}
                        columns={groupColumns}
                        data={groupData}
                        style={{margin: 30}}
                        borderCell={true}
                        pagination={{pageSize: 5}}
                    />
                </div>
            </div>
        </div>
    );
};

export default ShopManageGroup;
