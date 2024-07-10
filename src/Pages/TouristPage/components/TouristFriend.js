import React, { useState } from 'react';
import { Button, Modal, Input, List, Avatar, Card, Tabs, Tag } from '@arco-design/web-react';
import '@arco-design/web-react/dist/css/arco.css';

const TouristFriend = () => {
    const [friends, setFriends] = useState([
        {
            userId: 1,
            friendId: 2,
            categoryId: 1,
            categoryName: "好友"
        },
        {
            userId: 1,
            friendId: 3,
            categoryId: 2,
            categoryName: "饭友"
        }
    ]);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [newFriend, setNewFriend] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [pendingRequests, setPendingRequests] = useState([
        {
            userId: 4,
            name: "用户三",
            email: "user3@example.com",
            imageUrl: "https://mobile-support-platform.oss-cn-chengdu.aliyuncs.com/another-image-3.png",
            createdAt: "2024-07-10T10:20:30"
        }
    ]);
    const [selectedRequest, setSelectedRequest] = useState(null);

    const userDetails = {
        2: {
            userId: 2,
            accountId: 3,
            name: "用户一",
            email: "user1@example.com",
            phone: "0987654321",
            imageUrl: "https://mobile-support-platform.oss-cn-chengdu.aliyuncs.com/b14a6629-5182-4d70-a169-6e4c0dc0d43a.png",
            createdAt: "2024-07-08T15:14:19"
        },
        3: {
            userId: 3,
            accountId: 4,
            name: "用户二",
            email: "user2@example.com",
            phone: "1234567890",
            imageUrl: "https://mobile-support-platform.oss-cn-chengdu.aliyuncs.com/another-image.png",
            createdAt: "2024-07-09T10:20:30"
        }
    };

    const categories = [...new Set(friends.map(friend => friend.categoryName))];

    const handleSearch = () => {
        setModalType('search');
        setShowModal(true);
    };

    const handleSearchSubmit = () => {
        const results = Object.values(userDetails).filter(user => user.name.includes(searchTerm));
        setSearchResults(results);
        setShowModal(true);
    };

    const handleAddFriend = () => {
        setModalType('add');
        setShowModal(true);
    };

    const handleModalSubmit = () => {
        if (modalType === 'add') {
            const newFriendObj = {
                userId: 1,
                friendId: friends.length + 1,
                categoryId: friends.length + 1,
                categoryName: newCategory || "好友"
            };
            setFriends([...friends, newFriendObj]);
            setNewFriend('');
            setNewCategory('');
        }
        setShowModal(false);
    };

    const handleDeleteFriend = (friendId) => {
        const updatedFriends = friends.filter(friend => friend.friendId !== friendId);
        setFriends(updatedFriends);
    };

    const handleUserDetail = (userId) => {
        setSelectedUser(userDetails[userId]);
        setShowModal(true);
    };

    const handleReviewRequests = () => {
        setModalType('review');
        setShowModal(true);
    };

    const handleRequestAction = (request, action) => {
        if (action === 'accept') {
            const newFriendObj = {
                userId: 1,
                friendId: request.userId,
                categoryId: friends.length + 1,
                categoryName: "好友"
            };
            setFriends([...friends, newFriendObj]);
        }
        const updatedRequests = pendingRequests.filter(req => req.userId !== request.userId);
        setPendingRequests(updatedRequests);
        setSelectedRequest(null);
        setShowModal(false);
    };

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card style={{ width: "90%", height: '90%', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', padding: '20px' }}>
                <div style={{ fontSize: 25, fontWeight: 'bold', color: '#165DFF', textAlign: 'center', marginBottom: '20px' }}>
                    好友管理
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <Button type="primary" onClick={handleSearch}>搜索</Button>
                    <Button type="primary" onClick={handleAddFriend}>添加好友</Button>
                    <Button type="primary" onClick={handleReviewRequests}>好友申请审核</Button>
                </div>
                <Tabs defaultActiveTab="1">
                    {categories.map(category => (
                        <Tabs.TabPane key={category} title={category}>
                            <List
                                dataSource={friends.filter(friend => friend.categoryName === category)}
                                render={(friend) => (
                                    <List.Item
                                        actions={[
                                            <Button type="text" onClick={() => handleDeleteFriend(friend.friendId)}>删除</Button>
                                        ]}
                                    >
                                        <List.Item.Meta
                                            avatar={<Avatar onClick={() => handleUserDetail(friend.friendId)} src={userDetails[friend.friendId].imageUrl} />}
                                            title={userDetails[friend.friendId].name}
                                            description={userDetails[friend.friendId].email}
                                        />
                                    </List.Item>
                                )}
                            />
                        </Tabs.TabPane>
                    ))}
                </Tabs>
                <Modal
                    visible={showModal}
                    onCancel={() => setShowModal(false)}
                    footer={null}
                    title={modalType === 'search' ? '搜索好友' : modalType === 'add' ? '添加好友' : modalType === 'review' ? '好友申请审核' : ''}
                >
                    {selectedUser ? (
                        <>
                            <h3>{selectedUser.name}</h3>
                            <p><strong>用户ID:</strong> {selectedUser.userId}</p>
                            <p><strong>邮箱:</strong> {selectedUser.email}</p>
                            <p><strong>创建时间:</strong> {selectedUser.createdAt}</p>
                            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                <Button type="primary" status="danger" onClick={() => {
                                    setShowModal(false);
                                    setSelectedUser(null);
                                    setSearchResults([]);
                                }}>关闭</Button>
                            </div>
                        </>
                    ) : modalType === 'search' ? (
                        <>
                            <Input
                                placeholder="搜索好友"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e)}
                                style={{ marginBottom: '20px' }}
                            />
                            <Button type="primary" onClick={handleSearchSubmit}>搜索</Button>
                            {searchResults.length > 0 && (
                                <List
                                    dataSource={searchResults}
                                    render={(user) => (
                                        <List.Item
                                            actions={[
                                                <Button type="text" onClick={() => handleUserDetail(user.userId)}>查看</Button>
                                            ]}
                                        >
                                            <List.Item.Meta
                                                avatar={<Avatar src={user.imageUrl} />}
                                                title={user.name}
                                                description={user.email}
                                            />
                                        </List.Item>
                                    )}
                                />
                            )}
                        </>
                    ) : modalType === 'add' ? (
                        <>
                            <Input
                                placeholder="添加好友"
                                value={newFriend}
                                onChange={(e) => setNewFriend(e)}
                                style={{ marginBottom: '10px' }}
                            />
                            <Input
                                placeholder="分类名称"
                                value={newCategory}
                                onChange={(e) => setNewCategory(e)}
                                style={{ marginBottom: '20px' }}
                            />
                            <Button type="primary" onClick={handleModalSubmit}>确定</Button>
                        </>
                    ) : modalType === 'review' ? (
                        <>
                            <List
                                dataSource={pendingRequests}
                                render={(request) => (
                                    <List.Item
                                        actions={[
                                            <Button type="primary" onClick={() => handleRequestAction(request, 'accept')}>接受</Button>,
                                            <Button type="primary" status="danger" onClick={() => handleRequestAction(request, 'reject')}>拒绝</Button>
                                        ]}
                                    >
                                        <List.Item.Meta
                                            avatar={<Avatar src={request.imageUrl} />}
                                            title={request.name}
                                            description={request.email}
                                        />
                                    </List.Item>
                                )}
                            />
                        </>
                    ) : null}
                </Modal>
            </Card>
        </div>
    );
};

export default TouristFriend;
