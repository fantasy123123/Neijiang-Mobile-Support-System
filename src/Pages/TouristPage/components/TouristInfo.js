import React, { useEffect, useState } from 'react';
import { Layout, Typography, Space, Input, Button, Avatar, List, Card, Tabs, Modal, Form, Message } from '@arco-design/web-react';
import { useUser } from '../../../Context/UserContext';
import axiosInstance from '../../../Resquest/axiosInstance';
import { useNavigate } from 'react-router-dom';
import styles from './TouristInfo.module.css';
import Footer from './Footer';
import Header from './Header';

const { Text, Title } = Typography;
const { TextArea } = Input;

const TouristInfo = () => {
    const { user, setUser } = useUser();
    const navigate = useNavigate();
    const [friendGroups, setFriendGroups] = useState([]);
    const [friends, setFriends] = useState([]);
    const [pendingRequests, setPendingRequests] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newGroupName, setNewGroupName] = useState('');
    const [newFriendEmail, setNewFriendEmail] = useState('');

    useEffect(() => {
        axiosInstance.get(`/users/${user.userId}`).then(res => setUser(res.data.data));
        axiosInstance.get(`/users/friends/categories/${user.userId}`).then(res => setFriendGroups(res.data.data));
        axiosInstance.get(`/users/friends/${user.userId}`).then(res => setFriends(res.data.data));
        axiosInstance.get(`/users/friends/applications/${user.userId}`).then(res => setPendingRequests(res.data.data));
    }, [user.userId]);

    const handleAddGroup = () => {
        axiosInstance.post('/users/friends/categories', { userId: user.userId, groupName: newGroupName }).then(() => {
            setFriendGroups([...friendGroups, { groupName: newGroupName }]);
            setNewGroupName('');
            setModalVisible(false);
            Message.success('分组添加成功');
        });
    };

    const handleAddFriend = () => {
        axiosInstance.post('/users/friends/applications', { userId: user.userId, friendEmail: newFriendEmail }).then(() => {
            setNewFriendEmail('');
            Message.success('好友申请已发送');
        });
    };

    const handleApproveRequest = (requestId) => {
        axiosInstance.post('/users/friends', { requestId }).then(() => {
            setPendingRequests(pendingRequests.filter(request => request.requestId !== requestId));
            Message.success('好友申请已通过');
        });
    };

    const handleRejectRequest = (requestId) => {
        axiosInstance.delete('/users/friends/applications', { data: { requestId } }).then(() => {
            setPendingRequests(pendingRequests.filter(request => request.requestId !== requestId));
            Message.success('好友申请已拒绝');
        });
    };

    return (
        <Layout className={styles['whole-page']} style={{ height: '100vh', overflow: 'auto' }}>
            <Header />
            <Layout style={{ padding: '0 24px 24px' }}>
                <Title heading={2}>个人中心</Title>
                <Card style={{ marginBottom: '20px' }}>
                    <Space direction="vertical" size="large">
                        <Avatar size={100} src={user.imageUrl} />
                        <Text><strong>姓名:</strong> {user.name}</Text>
                        <Text><strong>邮箱:</strong> {user.email}</Text>
                        <Text><strong>电话:</strong> {user.phone}</Text>
                        <Text><strong>创建时间:</strong> {new Date(user.createdAt).toLocaleString()}</Text>
                    </Space>
                </Card>

                <Tabs defaultActiveTab="1">
                    <Tabs.TabPane key="1" title="好友分组">
                        <Button type="primary" onClick={() => setModalVisible(true)}>增加好友分组</Button>
                        <List
                            dataSource={friendGroups}
                            renderItem={item => <List.Item>{item.groupName}</List.Item>}
                        />
                    </Tabs.TabPane>
                    <Tabs.TabPane key="2" title="添加好友">
                        <Space direction="vertical" size="large">
                            <Input
                                placeholder="好友邮箱"
                                value={newFriendEmail}
                                onChange={(e) => setNewFriendEmail(e)}
                            />
                            <Button type="primary" onClick={handleAddFriend}>添加好友</Button>
                        </Space>
                    </Tabs.TabPane>
                    <Tabs.TabPane key="3" title="好友申请">
                        <List
                            dataSource={pendingRequests}
                            renderItem={item => (
                                <List.Item
                                    actions={[
                                        <Button type="primary" onClick={() => handleApproveRequest(item.requestId)}>通过</Button>,
                                        <Button type="text" onClick={() => handleRejectRequest(item.requestId)}>拒绝</Button>
                                    ]}
                                >
                                    {item.requesterName} 请求添加你为好友
                                </List.Item>
                            )}
                        />
                    </Tabs.TabPane>
                    <Tabs.TabPane key="4" title="我的好友">
                        <List
                            dataSource={friends}
                            renderItem={item => (
                                <List.Item>
                                    <Card
                                        hoverable
                                        style={{ width: '100%' }}
                                        onClick={() => navigate(`/friend/profile/${item.friendId}`)}
                                    >
                                        <Space>
                                            <Avatar src={item.friendImageUrl} />
                                            <Text>{item.friendName}</Text>
                                        </Space>
                                    </Card>
                                </List.Item>
                            )}
                        />
                    </Tabs.TabPane>
                </Tabs>
            </Layout>
            <Footer />

            <Modal
                title="增加好友分组"
                visible={modalVisible}
                onOk={handleAddGroup}
                onCancel={() => setModalVisible(false)}
            >
                <Form>
                    <Form.Item label="分组名称">
                        <Input value={newGroupName} onChange={(e) => setNewGroupName(e)} />
                    </Form.Item>
                </Form>
            </Modal>
        </Layout>
    );
};

export default TouristInfo;
