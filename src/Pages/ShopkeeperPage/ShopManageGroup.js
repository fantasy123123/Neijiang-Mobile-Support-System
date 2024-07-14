import { useEffect, useRef, useState } from 'react';
import { Button, Input, Message, Table, Modal, Form, Upload, Avatar } from '@arco-design/web-react';
import { IconSearch,  IconDelete } from '@arco-design/web-react/icon';
import axiosInstance from '../../api/AxiosApi';
import initGroup from './images/initGroup.png'
import initPerson from './images/initPerson.png'
import store from '../store/store'

const ShopManageGroup = () => {
    const [groupData, setGroupData] = useState([]);
    const [memberData, setMemberData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [addMemberVisible, setAddMemberVisible] = useState(false);
    const [editGroupVisible, setEditGroupVisible] = useState(false);
    const [currentGroupId, setCurrentGroupId] = useState(null);
    const [form] = Form.useForm();
    const [addMemberForm] = Form.useForm();
    const [editGroupForm] = Form.useForm();


    useEffect(() => {
        fetchGroups();
    }, []);

    const fetchGroups = async () => {
        try {
            const response = await axiosInstance.get('/groups/accounts/' + localStorage.getItem('accountId'));
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

            return tempGroup
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
            align: 'center',
        },
        {
            title: '头像',
            dataIndex: 'imageUrl',
            render: (imageUrl) => <img src={imageUrl} alt="group" style={{ width: 50, height: 50 }} />,
            align: 'center',
        },
        {
            title: '名称',
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
            align: 'center',
        },
        {
            title: '描述',
            dataIndex: 'description',
            align: 'center',
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            sorter: (a, b) => a.createdAt - b.createdAt,
            align: 'center',
        },
        {
            title: '操作',
            render: (col, record) => {
                return <div style={{ display: 'flex', justifyContent: 'center' }}>
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
                        style={{ width: '87.6px', marginLeft: 20 }}
                        type="primary"
                        onClick={() => {
                            setCurrentGroupId(record.groupId);
                            setEditGroupVisible(true);
                            editGroupForm.setFieldsValue(record);
                        }}
                    >
                        修改
                    </Button>
                    <Button
                        style={{ width: '87.6px', marginLeft: 20 }}
                        status={'danger'}
                        type={"primary"}
                        onClick={() => {
                            if (window.confirm('确定注销该群组？')) {
                                axiosInstance.delete(`/groups/${record.groupId}`).then(
                                    res => {
                                        setGroupData([...groupData.filter(item => item !== record)]);
                                        Message.info('注销成功!');
                                        store.dispatch({type:'delete',groupId:record.groupId})
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
            },
            align: 'center',
        }
    ];

    const memberColumns = [
        {
            title: '成员账号',
            dataIndex: 'accountId',
            sorter: (a, b) => a.accountId - b.accountId,
            align: 'center',
        },
        {
            title: '头像',
            dataIndex: 'imageUrl',
            render: (imageUrl) => <img src={imageUrl?imageUrl:initPerson} alt="member" style={{ width: 50, height: 50,backgroundColor:'white' }} />,
            align: 'center',
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
            align: 'center',
        },
        {
            title: '成员角色',
            dataIndex: 'role',
            align: 'center',
        },
        {
            title: '操作',
            render: (col, record) => {
                return <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {record.role !== '管理员' && (
                        <Button
                            type="primary"
                            status="danger"
                            icon={<IconDelete />}
                            onClick={() => handleDeleteMember(record.groupId, record.accountId)}
                        />
                    )}
                </div>
            },
            align: 'center',
        }
    ];

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
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
            values.ownerId = localStorage.getItem("accountId");
            values.imageUrl=initGroup
            const response = await axiosInstance.post('/groups', values);
            if (response.data.status === 'success') {
                Message.success('群组创建成功');
                setVisible(false);
                form.resetFields();
                const tempData=await fetchGroups(); // 重新获取群组数据
                store.dispatch({type:'add',groupId:tempData[tempData.length-1].groupId})
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
                role: "成员"
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

    const handleEditGroupCancel = () => {
        setEditGroupVisible(false);
    };

    const handleEditGroupOk = async () => {
        try {
            const values = await editGroupForm.validate();
            values.groupId = currentGroupId;
            const {imageUrl,...rest}=values;
            const response = await axiosInstance.put(`/groups`, rest);
            if (response.data.status === 'success') {
                Message.success('群组信息修改成功');
                setEditGroupVisible(false);
                editGroupForm.resetFields();
                fetchGroups(); // 重新获取群组数据
            } else {
                Message.error('群组信息修改失败');
            }
        } catch (error) {
            console.error(error);
            Message.error('群组信息修改失败');
        }
    };

    const handleImageUpload = async (file, fileList) => {
        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await axiosInstance.post(`/groups/images/${currentGroupId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.status === 'success') {
                Message.success('头像上传成功');
                editGroupForm.setFieldsValue({ imageUrl: response.data.message });
                fileList.push(file)
                fetchGroups(); // 重新获取群组数据
            } else {
                Message.error('头像上传失败');
            }
        } catch (error) {
            console.error(error);
            Message.error('头像上传失败');
        }
    };

    const handleDeleteMember = async (groupId, accountId) => {
        try {
            const response = await axiosInstance.delete('/groups/members', {
                data: {
                    groupId: groupId,
                    accountId: accountId
                }
            });
            if (response.data.status === 'success') {
                Message.success('成员删除成功');
                fetchGroups(); // 重新获取群组数据
            } else {
                Message.error('成员删除失败');
            }
        } catch (error) {
            console.error(error);
            Message.error('成员删除失败');
        }
    };


    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: "90%", height: '90%' }}>
                <div style={{ fontSize: 25, fontWeight: 'bold', color: '#165DFF', textAlign: 'center' }}>
                    群组管理
                </div>

                <Modal
                    title="创建群组"
                    visible={visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    autoFocus={false}
                    focusLock={true}
                >
                    <Form form={form} layout="vertical">
                        <Form.Item label="名称" field="groupName" rules={[{ required: true, message: '请输入名称' }]}>
                            <Input placeholder="请输入名称" />
                        </Form.Item>
                        <Form.Item label="描述" field="description">
                            <Input.TextArea placeholder="请输入群组描述" />
                        </Form.Item>
                        {/* 创建群组时不上传图片 */}
                    </Form>
                </Modal>
                <Modal
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
                    </Form>
                </Modal>
                <Modal
                    title="修改群组信息"
                    visible={editGroupVisible}
                    onOk={handleEditGroupOk}
                    onCancel={handleEditGroupCancel}
                    autoFocus={false}
                    focusLock={true}
                >
                    <Form form={editGroupForm} layout="vertical">
                        <Form.Item label="名称" field="groupName" rules={[{ required: true, message: '请输入名称' }]}>
                            <Input placeholder="请输入名称" />
                        </Form.Item>
                        <Form.Item label="描述" field="description">
                            <Input.TextArea placeholder="请输入群组描述" />
                        </Form.Item>
                        <Form.Item label="头像" field="imageUrl">
                            <Upload
                                imagePreview={true}
                                limit={1}
                                multiple
                                listType="picture-list"
                                beforeUpload={handleImageUpload}
                                showUploadList={true}
                            >
                                <Avatar>
                                    <img src={editGroupForm.getFieldValue('imageUrl')} />
                                </Avatar>
                            </Upload>
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
                    <div style={{ marginRight: 30, marginTop: 20 }}>
                        <Button type="primary" onClick={handleCreateGroup}>创建群组</Button>
                    </div>
                    <Table
                        indentSize={60}
                        expandedRowRender={expandedRowRender}
                        columns={groupColumns}
                        data={groupData}
                        style={{ margin: 30 }}
                        borderCell={true}
                        pagination={{ pageSize: 5 }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ShopManageGroup;
