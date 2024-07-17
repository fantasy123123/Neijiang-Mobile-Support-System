import React, { useEffect, useState } from 'react';
import { Layout, Typography, Space, Input, Button, Avatar, List, Card, Tabs, Modal, Form, Message, Grid, Upload, Select } from '@arco-design/web-react';
import { IconMore, IconDelete } from '@arco-design/web-react/icon';
import { useUser } from '../../../Context/UserContext';
import axiosInstance from '../../../Resquest/axiosInstance';
import { useNavigate } from 'react-router-dom';
import styles from './TouristInfo.module.css';
import Footer from './Footer';
import Header from './Header';

const { Text, Title } = Typography;
const { Row, Col } = Grid;
const { Option } = Select;

const groupBy = (arr, key) => {
    return arr.reduce((acc, item) => {
        const group = item[key];
        if (!acc[group]) {
            acc[group] = [];
        }
        acc[group].push(item);
        return acc;
    }, {});
};

const TouristInfo = () => {
    const { user, setUser } = useUser();
    const navigate = useNavigate();
    const [friendGroups, setFriendGroups] = useState([]);
    const [friends, setFriends] = useState([]);
    const [groupedFriends, setGroupedFriends] = useState({});
    const [pendingRequests, setPendingRequests] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [newGroupName, setNewGroupName] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [editingUser, setEditingUser] = useState({});
    const [newImageUrl, setImageUrl] = useState(user.imageUrl);
    const [friendInfoModalVisible, setFriendInfoModalVisible] = useState(false);
    const [selectedFriend, setSelectedFriend] = useState({});
    const [changeGroupModalVisible, setChangeGroupModalVisible] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState('');
    const [selectedSearchType, setSelectedSearchType] = useState('ID');
    const [editGroupModalVisible, setEditGroupModalVisible] = useState(false);
    const [editingGroup, setEditingGroup] = useState({});
    const [selectedAddCategoryId, setSelectedAddCategoryId] = useState('');

    useEffect(() => {
        axiosInstance.get(`/users/${user.userId}`).then(res => setUser(res.data.data));

        axiosInstance.get(`/users/friends/categories/${user.userId}`)
            .then(res => {
                setFriendGroups(res.data.data);
            });

        axiosInstance.get(`/users/friends/${user.userId}`)
            .then(async res => {
                const members = res.data.data;
                const details = await Promise.all(members.map(async (member) => {
                    const detail = await axiosInstance.get(`/users/${member.friendId}`);
                    return {
                        ...detail.data.data,
                        categoryId: member.categoryId
                    };
                }));
                setFriends(details);
            })
            .catch(error => Message.error('Failed to fetch user friends'));

        axiosInstance.get(`/users/friends/applications/${user.userId}`)
            .then(async res => {
                const applications = res.data.data;
                const details = await Promise.all(applications.map(async (application) => {
                    const detail = await axiosInstance.get(`/users/${application.userId}`);
                    return {
                        ...detail.data.data,
                        categoryId: application.categoryId
                    };
                }));
                setPendingRequests(details);
            });

    }, [user.userId, setUser]);

    useEffect(() => {
        if (friendGroups.length > 0 && friends.length > 0) {
            const updatedFriends = friends.map(friend => ({
                ...friend
            }));
            setGroupedFriends(groupBy(updatedFriends, 'categoryId'));
        }
    }, [friendGroups, friends]);

    const handleEditUser = () => {
        setEditingUser(user);
        setEditModalVisible(true);
    };

    const handleSaveUser = async () => {
        const updatedUser = {
            ...editingUser,
            createdAt: new Date().toISOString(),
            imageUrl: newImageUrl
        };

        axiosInstance.put('/users', updatedUser).then(() => {
            setUser(updatedUser);
            setEditModalVisible(false);
            Message.success('用户信息更新成功');
        }).catch(() => {
            Message.error('用户信息更新失败');
        });
    };

    const handleAvatarClick = (friend) => {
        setSelectedFriend(friend);
        setFriendInfoModalVisible(true);
    };

    const handleMoreClick = (friend) => {
        setSelectedFriend(friend);
        setChangeGroupModalVisible(true);
    };

    const handleSaveGroup = () => {
        const updatedFriendData = {
            userId: user.userId,
            friendId: selectedFriend.userId,
            categoryId: selectedGroup
        };
        
        axiosInstance.put('/users/friends', updatedFriendData)
            .then(() => {
                Message.success('分组更新成功');
                setChangeGroupModalVisible(false);
                // 重新获取好友列表以更新分组信息
                axiosInstance.get(`/users/friends/${user.userId}`)
                    .then(async res => {
                        const members = res.data.data;
                        const details = await Promise.all(members.map(async (member) => {
                            const detail = await axiosInstance.get(`/users/${member.friendId}`);
                            return {
                                ...detail.data.data,
                                categoryId: member.categoryId
                            };
                        }));
                        setFriends(details);
                    })
                    .catch(error => Message.error('Failed to fetch user friends'));
            })
            .catch(() => {
                Message.error('分组更新失败');
            });
    };

    const handleDeleteFriend = (friendId) => {
        Modal.confirm({
            title: '确认删除',
            content: '您确定要删除这个好友吗？',
            onOk: () => {
                const deleteFriendData = {
                    userId: user.userId,
                    friendId: friendId
                };
    
                axiosInstance.delete('/users/friends', { data: deleteFriendData })
                    .then(() => {
                        const deleteData = {
                            userId: friendId,
                            friendId: user.userId
                        };

                        axiosInstance.delete('/users/friends', { data: deleteData })
                        .then(() => {
                            Message.success('好友删除成功');
                        // 更新好友列表
                        setFriends(friends.filter(friend => friend.userId !== friendId));
                        });
                    })
                    .catch(() => {
                        Message.error('好友删除失败');
                    });
            }
        });
    };

    const handleAddGroup = () => {
        axiosInstance.post('/users/friends/categories', { userId: user.userId, categoryName: newGroupName })
            .then(() => {
                // 获取最新的分组数据
                return axiosInstance.get(`/users/friends/categories/${user.userId}`);
            })
            .then(res => {
                // 更新分组状态
                setFriendGroups(res.data.data);
                setNewGroupName('');
                setModalVisible(false);
                Message.success('分组添加成功');
            })
            .catch(() => {
                Message.error('分组添加失败');
            });
    };

    const handleEditGroup = (group) => {
        setEditingGroup(group);
        setNewGroupName(group.categoryName);
        setEditGroupModalVisible(true);
    };
    
    const handleSaveGroupName = () => {
        const updateCategoryData = {
            userId: user.userId,
            categoryId: editingGroup.categoryId,
            categoryName: newGroupName
        };

        axiosInstance.put('/users/friends/categories', updateCategoryData)
            .then(() => {
                Message.success('分组名称更新成功');
                setEditGroupModalVisible(false);
                // 更新分组列表
                setFriendGroups(friendGroups.map(group => group.categoryId == editingGroup.categoryId ? { ...group, categoryName: newGroupName } : group));
            })
            .catch(() => {
                Message.error('分组名称更新失败');
            });
    };

    const handleDeleteGroup = (categoryId) => {
        Modal.confirm({
            title: '确认删除',
            content: '您确定要删除这个分组吗？',
            onOk: () => {
                axiosInstance.delete(`/users/friends/categories/${categoryId}`)
                    .then(() => {
                        Message.success('分组删除成功');
                        // 更新分组列表
                        setFriendGroups(friendGroups.filter(group => group.categoryId !== categoryId));
                    })
                    .catch(() => {
                        Message.error('分组删除失败 请检查分组是否仍然有好友');
                    });
            }
        });
    };

    const handleSearchFriends = () => {
        if (selectedSearchType === 'NAME') {
            axiosInstance.post('/users/search', { keyword: searchQuery })
            .then(res => {
                setSearchResults(res.data.data);
            })
            .catch(() => {
                Message.error('搜索好友失败');
            });
        } else {
            axiosInstance.get(`/users/${searchQuery}`)
            .then(res => {
                setSearchResults(prevResults => [...prevResults, res.data.data]);
            })
            .catch(() => {
                Message.error('搜索好友失败');
            });
        }
        
    };

    const handleAddFriend = (friendId) => {
        if (friendId == user.userId) {
            Message.error('不能添加自己为好友');
            return;
        }
        if (selectedGroup == null || selectedGroup === "") {
            Message.error('请选择好友分组')
            return;
        }
        axiosInstance.post('/users/friends/applications', { userId: user.userId, friendId: friendId, categoryId: selectedGroup })
            .then(() => {
                Message.success('好友申请已发送');
                setSearchResults([]);
            })
            .catch(() => {
                Message.error('好友申请已存在');
            });
    };

    const handleApproveRequest = (item) => {
        if (selectedAddCategoryId == null || selectedAddCategoryId === "") {
            Message.error('请选择好友分组')
            return;
        }

        axiosInstance.post('/users/friends', {userId : item.userId, friendId : user.userId, categoryId : item.categoryId})
        .then(() => {
            axiosInstance.post('/users/friends', {userId : user.userId, friendId : item.userId, categoryId : selectedAddCategoryId})
            .then(() => {
                setPendingRequests(pendingRequests.filter(request => request.userId !== item.userId));
                Message.success('好友申请已通过');

                axiosInstance.get(`/users/friends/${user.userId}`)
                    .then(async res => {
                        const members = res.data.data;
                        const details = await Promise.all(members.map(async (member) => {
                            const detail = await axiosInstance.get(`/users/${member.friendId}`);
                            return {
                                ...detail.data.data,
                                categoryId: member.categoryId
                            };
                        }));
                        setFriends(details);
                    })
                    .catch(error => Message.error('Failed to fetch user friends'));
            })
        });
    };

    const handleRejectRequest = (item) => {
        const deleteRequestData = {
            userId: item.userId,
            friendId: user.userId
        }

        axiosInstance.delete('/users/friends/applications', { data: deleteRequestData })
        .then(() => {
            setPendingRequests(pendingRequests.filter(request => request.userId !== item.userId));
            Message.success('好友申请已拒绝');
        });
    };

    return (
        <Layout className={styles['whole-page']} style={{ height: '100vh', overflow: 'auto' }}>
            <Header />
            <Layout style={{ padding: '0 24px 24px' }}>
                <Row gutter={16}>
                    <Col span={6}>
                        <Title heading={2}>个人中心</Title>
                        <Card style={{ marginBottom: '20px' }}>
                            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', paddingBottom: 5 }}>
                                    <Avatar size={100}>
                                        <img
                                            alt='avatar'
                                            src={user.imageUrl}
                                        />
                                    </Avatar>
                                </div>
                                <Text style={{ paddingLeft: 20 }}><strong>昵称: </strong> {user.name}</Text>
                                <Text style={{ paddingLeft: 20 }}><strong>邮箱: </strong> {user.email}</Text>
                                <Text style={{ paddingLeft: 20 }}><strong>电话: </strong> {user.phone}</Text>
                                <Text style={{ paddingLeft: 20 }}><strong>更新时间: </strong> {new Date(user.createdAt).toLocaleString()}</Text>
                                <div className={styles['right-button-container']}>
                                    <Button type="primary" onClick={handleEditUser}>
                                        编辑信息
                                    </Button>
                                </div>
                            </Space>
                        </Card>
                    </Col>
                    <Col span={18}>
                        <Tabs defaultActiveTab="1" style={{ paddingTop: 42, paddingLeft: 12 }}>
                            <Tabs.TabPane key="1" title="我的好友" style={{ marginLeft: 20 }}>
                                {Object.keys(groupedFriends).map((categoryId) => (
                                    <div key={categoryId}>
                                        <Title heading={4}>
                                            {friendGroups.find(group => group.categoryId == categoryId)?.categoryName || '未分组'}
                                        </Title>
                                        <List
                                            dataSource={groupedFriends[categoryId]}
                                            style={{ width: '80%' }}
                                            render={(item, index) => (
                                                <List.Item key={index}>
                                                    <Card
                                                        hoverable
                                                        style={{ width: '100%' }}
                                                    >
                                                        <Row gutter={16} style={{ width: '99%' }}>
                                                            <Col span={4} style={{ display: 'flex', justifyContent: 'center' }}>
                                                                <Avatar
                                                                    onClick={() => handleAvatarClick(item)}
                                                                >
                                                                    <img alt={item.name} src={item.imageUrl} />
                                                                </Avatar>
                                                            </Col>
                                                            <Col span={20}>
                                                                <div style={{ marginLeft: 8 }}><strong>{item.name}</strong></div>
                                                                <div style={{ marginLeft: 8 , display : 'flex', justifyContent : 'space-between' }}>
                                                                    {item.email}
                                                                    <span>
                                                                        <Button type="text" onClick={() => handleMoreClick(item)}><IconMore /></Button>
                                                                        <Button type="text" status='danger' onClick={() => handleDeleteFriend(item.userId)}><IconDelete /></Button>
                                                                    </span>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </Card>
                                                </List.Item>
                                            )}
                                        />
                                    </div>
                                ))}
                            </Tabs.TabPane>
                            <Tabs.TabPane key="2" title="好友分组" style={{ marginLeft: 20 }}>
                                <Title heading={4}>我的好友分组
                                    <Button type="primary" 
                                        onClick={() => setModalVisible(true)}
                                        style={{marginLeft: 488}}
                                    >
                                        增加好友分组
                                    </Button>
                                </Title>
                                <List
                                    dataSource={friendGroups}
                                    style={{width: '80%'}}
                                    render={(item, index) => (
                                        <List.Item key={index}>
                                            <Card
                                                hoverable
                                                className="two-side-card"
                                                style={{ width: '99%'}}
                                            >
                                                <Text style={{fontSize : 18, paddingLeft : 20}}>{item.categoryName}</Text>
                                                <span>
                                                    <Button type="text" onClick={() => handleEditGroup(item)} key="edit">
                                                        <IconMore/>
                                                    </Button>
                                                    <Button type="text" status='danger' onClick={() => handleDeleteGroup(item.categoryId)} key="delete">
                                                        <IconDelete/>
                                                    </Button>
                                                </span>
                                            </Card>
                                        </List.Item>
                                    )}
                                />
                            </Tabs.TabPane>
                            <Tabs.TabPane key="3" title="添加好友" style={{ marginLeft: 20 }}>
                                <Space direction="vertical" size="large" style={{ width: '80%' }}>
                                    <span>
                                        <Select
                                            value={selectedSearchType}
                                            style={{ width: 200, marginRight : 20 }}
                                            onChange={setSelectedSearchType}
                                        >
                                            <Option key={1} value={'ID'}>按账号搜索</Option>
                                            <Option key={2} value={'NAME'}>按名称搜索</Option>
                                        </Select>
                                        <Input
                                            placeholder="按名称或ID搜索好友"
                                            style={{width : 250}}
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e)}
                                        />
                                        <Button type="primary" onClick={handleSearchFriends} style={{marginLeft : 20}}>搜索</Button>
                                    </span>
                                    <span style={{marginLeft : 2}}>
                                        <Text>添加好友默认分组： </Text>
                                        <Select
                                            placeholder="选择好友分组"
                                            style={{ width: 200 }}
                                            onChange={setSelectedGroup}
                                        >
                                            {friendGroups.map(group => (
                                                <Option key={group.categoryId} value={group.categoryId}>{group.categoryName}</Option>
                                            ))}
                                        </Select>
                                    </span>
                                    
                                    <List
                                        dataSource={searchResults}
                                        render={(item, index) => (
                                            <List.Item
                                                key={index}
                                                actions={[
                                                    <Button type="primary" onClick={() => handleAddFriend(item.userId)}>添加好友</Button>
                                                ]}
                                            >
                                                <List.Item.Meta
                                                    avatar={<Avatar><img src={item.imageUrl} /></Avatar>}
                                                    title={item.name}
                                                    description={`邮箱: ${item.email}, 电话: ${item.phone}`}
                                                />
                                            </List.Item>
                                        )}
                                    />
                                </Space>
                            </Tabs.TabPane>
                            <Tabs.TabPane key="4" title="好友申请" style={{ marginLeft: 20 }}>
                                <Space direction="vertical" size="large" style={{ width: '80%' }}> 
                                    <span style={{marginLeft : 2}}>
                                        <Text>添加好友默认分组： </Text>
                                        <Select
                                            placeholder="选择好友分组"
                                            style={{ width: 200 }}
                                            onChange={setSelectedAddCategoryId}
                                        >
                                            {friendGroups.map(group => (
                                                <Option key={group.categoryId} value={group.categoryId}>{group.categoryName}</Option>
                                            ))}
                                        </Select>
                                    </span>

                                    <List
                                    dataSource={pendingRequests}
                                    render={(item, index) => (
                                        <List.Item
                                            key={index}
                                            actions={[
                                                <Button type="primary" onClick={() => handleApproveRequest(item)}>通过</Button>,
                                                <Button type="secondary" status='danger' onClick={() => handleRejectRequest(item)}>拒绝</Button>
                                            ]}
                                        >
                                            <List.Item.Meta
                                                avatar={<Avatar><img src={item.imageUrl}/></Avatar>}
                                                title={`${item.name} 请求添加你为好友`}
                                                description={`邮箱: ${item.email}, 电话: ${item.phone}`}
                                            />
                                        </List.Item>
                                    )}
                                />
                                </Space>                               
                            </Tabs.TabPane>
                        </Tabs>
                    </Col>
                </Row>
            </Layout>
            <Footer />

            <Modal
                title="增加好友分组"
                visible={modalVisible}
                onOk={handleAddGroup}
                onCancel={() => setModalVisible(false)}
            >
                <Form wrapperCol={{ span: 16, offset: 0 }}>
                    <Form.Item label="分组名称">
                        <Input value={newGroupName} onChange={(e) => setNewGroupName(e)} />
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="好友信息"
                visible={friendInfoModalVisible}
                onOk={() => setFriendInfoModalVisible(false)}
                onCancel={() => setFriendInfoModalVisible(false)}
            >
                <Form wrapperCol={{ span: 16, offset: 0 }}>
                    <Form.Item label="昵称">
                        <Text>{selectedFriend.name}</Text>
                    </Form.Item>
                    <Form.Item label="邮箱">
                        <Text>{selectedFriend.email}</Text>
                    </Form.Item>
                    <Form.Item label="电话">
                        <Text>{selectedFriend.phone}</Text>
                    </Form.Item>
                    <Form.Item label="头像">
                        <Avatar size={100}>
                            <img
                                alt='avatar'
                                src={selectedFriend.imageUrl}
                            />
                        </Avatar>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="修改好友分组"
                visible={changeGroupModalVisible}
                onOk={handleSaveGroup}
                onCancel={() => setChangeGroupModalVisible(false)}
            >
                <Form wrapperCol={{ span: 16, offset: 0 }}>
                    <Form.Item label="选择分组">
                        <Select
                            style={{width : 300}}
                            onChange={(value) => setSelectedGroup(value)}
                            placeholder="选择一个分组"
                        >
                            {friendGroups.map(group => (
                                <Option key={group.categoryId} value={group.categoryId}>{group.categoryName}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="编辑信息"
                visible={editModalVisible}
                onOk={handleSaveUser}
                onCancel={() => setEditModalVisible(false)}
            >
                <Form wrapperCol={{ span: 16, offset: 0 }}>
                    <Form.Item label="昵称">
                        <Input value={editingUser.name} onChange={(e) => setEditingUser({ ...editingUser, name: e })} />
                    </Form.Item>
                    <Form.Item label="邮箱">
                        <Input value={editingUser.email} onChange={(e) => setEditingUser({ ...editingUser, email: e })} />
                    </Form.Item>
                    <Form.Item label="电话">
                        <Input value={editingUser.phone} onChange={(e) => setEditingUser({ ...editingUser, phone: e })} />
                    </Form.Item>
                    <Form.Item label="头像">
                        <Upload
                            action={`${axiosInstance.defaults.baseURL}/users/images/${user.userId}`}
                            headers={{ token: localStorage.getItem("token") }}
                            limit={1}
                            multiple
                            imagePreview
                            defaultFileList={user.imageUrl}
                            listType='picture-card'
                            onChange={(file) => {
                                if (file[0].status === 'done') {
                                    setImageUrl(file[0].response.message)
                                }
                            }}
                        />
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="编辑分组名称"
                visible={editGroupModalVisible}
                onOk={handleSaveGroupName}
                onCancel={() => setEditGroupModalVisible(false)}
            >
                <Form wrapperCol={{ span: 16, offset: 0 }}>
                    <Form.Item label="分组名称">
                        <Input value={newGroupName} onChange={(e) => setNewGroupName(e)} />
                    </Form.Item>
                </Form>
            </Modal>
        </Layout>
    );
};

export default TouristInfo;
