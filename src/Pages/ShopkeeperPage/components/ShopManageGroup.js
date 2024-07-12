import { useEffect, useRef, useState } from 'react';
import { Button, Input, Message, Table, Modal, Form, Upload } from '@arco-design/web-react';
import { IconSearch, IconEdit, IconDelete } from '@arco-design/web-react/icon';
import axiosInstance from '../../../api/AxiosApi';

const ShopManageGroup = () => {
    const [groupData, setGroupData] = useState([]);
    const [memberData, setMemberData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [addMemberVisible, setAddMemberVisible] = useState(false);
    const [editGroupVisible, setEditGroupVisible] = useState(false);
    const [currentGroupId, setCurrentGroupId] = useState(null);
    const [uploadedFile, setUploadedFile] = useState(null); // 新增状态来存储上传的文件
    const [form] = Form.useForm();
    const [addMemberForm] = Form.useForm();
    const [editGroupForm] = Form.useForm();
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        fetchGroups();
    }, []);

    const fetchGroups = async () => {
        try {
            const response = await axiosInstance.get('/groups/accounts/' + localStorage.getItem('accountId'));
            const tempGroup = response.data.data.map(value => ({ ...value, key: value.groupId, createdAt: formatDate(value.createdAt) }));
            setGroupData(tempGroup);

            const tempMember = await Promise.all(tempGroup.map(group => axiosInstance.get(`/groups/members/${group.groupId}`).then(res => res.data.data)));
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
            filterDropdown: ({ filterKeys, setFilterKeys, confirm }) => (
                <div className='arco-table-custom-filter'>
                    <Input.Search
                        style={{ width: 120 }}
                        ref={inputRef1}
                        searchButton
                        value={filterKeys[0] || ''}
                        onChange={(value) => setFilterKeys(value ? [value] : [])}
                        onSearch={confirm}
                    />
                </div>
            ),
            onFilter: (value, row) => value ? row.groupName.indexOf(value) !== -1 : true,
            onFilterDropdownVisibleChange: (visible) => visible && setTimeout(() => inputRef1.current.focus(), 150),
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
            render: (col, record) => (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        style={{ marginLeft: 10 }}
                        type="primary"
                        onClick={() => { setCurrentGroupId(record.groupId); setAddMemberVisible(true); }}
                    >
                        添加成员
                    </Button>
                    <Button
                        style={{ width: '87.6px', marginLeft: 20 }}
                        type="primary"
                        onClick={() => { setCurrentGroupId(record.groupId); setEditGroupVisible(true); editGroupForm.setFieldsValue(record); }}
                    >
                        修改
                    </Button>
                    <Button
                        style={{ width: '87.6px', marginLeft: 20 }}
                        status={'danger'}
                        type={"primary"}
                        onClick={() => window.confirm('确定注销该群组？') && axiosInstance.delete(`/groups/${record.groupId}`).then(res => {
                            setGroupData(groupData.filter(item => item !== record));
                            Message.info('注销成功!');
                        }).catch(console.log)}
                    >
                        注销
                    </Button>
                </div>
            ),
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
            render: (imageUrl) => <img src={imageUrl} alt="member" style={{ width: 50, height: 50 }} />,
            align: 'center',
        },
        {
            title: '成员名称',
            dataIndex: 'name',
            filterIcon: <IconSearch />,
            filterDropdown: ({ filterKeys, setFilterKeys, confirm }) => (
                <div className='arco-table-custom-filter'>
                    <Input.Search
                        style={{ width: 120 }}
                        ref={inputRef2}
                        searchButton
                        value={filterKeys[0] || ''}
                        onChange={(value) => setFilterKeys(value ? [value] : [])}
                        onSearch={confirm}
                    />
                </div>
            ),
            onFilter: (value, row) => value ? row.name.indexOf(value) !== -1 : true,
            onFilterDropdownVisibleChange: (visible) => visible && setTimeout(() => inputRef2.current.focus(), 150),
            align: 'center',
        },
        {
            title: '成员角色',
            dataIndex: 'role',
            align: 'center',
        },
        {
            title: '操作',
            render: (col, record) => (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {record.role !== '管理员' && (
                        <Button
                            type="primary"
                            status="danger"
                            icon={<IconDelete />}
                            onClick={() => handleDeleteMember(record.groupId, record.accountId)}
                        />
                    )}
                </div>
            ),
            align: 'center',
        }
    ];

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return date.toLocaleDateString('en-US', options);
    };

    const expandedRowRender = (record, index) => (
        <Table
            columns={memberColumns}
            data={memberData[index]}
            pagination={false}
            borderCell={true}
        />
    );

    const handleCreateGroup = () => setVisible(true);

    const handleCancel = () => setVisible(false);

    const handleOk = async () => {
        try {
            console.log(fileList);
            const values = await form.validate();
            values.ownerId = localStorage.getItem("accountId");
            const { imageUrl, ...rest } = values;
            const response = await axiosInstance.post('/groups', rest);
            if (response.data.status === 'success') {
                Message.success('群组创建成功');
                setVisible(false);
                form.resetFields();
                const groupId = response.data.data;
                setCurrentGroupId(groupId);
                handleImageUpload(imageUrl, groupId); // 使用上传的文件
                fetchGroups();
            } else {
                Message.error('群组创建失败');
            }
        } catch (error) {
            console.error(error);
            Message.error('群组创建失败');
        }
    };

    const handleAddMemberCancel = () => setAddMemberVisible(false);

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
                fetchGroups();
            } else {
                Message.error('成员添加失败');
            }
        } catch (error) {
            console.error(error);
            Message.error('成员添加失败');
        }
    };

    const handleEditGroupCancel = () => setEditGroupVisible(false);

    const handleEditGroupOk = async () => {
        try {
            const values = await editGroupForm.validate();
            values.groupId = currentGroupId;
            const { imageUrl, ...rest } = values;
            const response = await axiosInstance.put(`/groups`, rest);
            if (response.data.status === 'success') {
                Message.success('群组信息修改成功');
                setEditGroupVisible(false);
                editGroupForm.resetFields();
                handleImageUpload(imageUrl, currentGroupId); // 使用上传的文件
                fetchGroups();
            } else {
                Message.error('群组信息修改失败');
            }
        } catch (error) {
            console.error(error);
            Message.error('群组信息修改失败');
        }
    };

    const handleImageUpload = async (file, groupId) => {
        const formData = new FormData();
        formData.append('image', file[0]);
        console.log(file[0],1)
        try {
            const response = await axiosInstance.post(`/groups/images/${groupId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.status === 'success') {
                Message.success('头像上传成功');
                fetchGroups();
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
                fetchGroups();
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
                    unmountOnExit={true}
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
                        <Form.Item label="头像" field="imageUrl">
                            <Upload
                                listType="picture-card"
                                showUploadList={true}
                                fileList={fileList}
                                onChange={setFileList}
                                limit={1}
                            >
                                <div>
                                    <div style={{ marginTop: 8 }}> <IconEdit /> 上传头像</div>
                                </div>
                            </Upload>
                        </Form.Item>
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
                                listType="picture-card"
                                showUploadList={true}
                                fileList={fileList}
                                onChange={setFileList}
                                limit={1}
                            >
                                <div>
                                    <div style={{ marginTop: 8 }}> <IconEdit /> 上传头像</div>
                                </div>
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
