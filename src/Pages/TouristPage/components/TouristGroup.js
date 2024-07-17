import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Card, List, Typography, Layout, Avatar, Modal, Spin, Message, Button, Empty } from "@arco-design/web-react";
import { IconMinusCircle } from '@arco-design/web-react/icon';
import axiosInstance from '../../../Resquest/axiosInstance';
import styles from './TouristGroup.module.css';
import Footer from './Footer';
import Header from './Header';

const { Title } = Typography;

const TouristGroup = () => {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    const [currentGroup, setCurrentGroup] = useState(null);
    const [isEmpty, setIsEmpty] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const res = await axiosInstance.get('/groups/accounts/' + localStorage.getItem('accountId'));
                if (res.data.status === 'success') {
                    setGroups(res.data.data);
                } else {
                    Message.error('Failed to fetch groups');
                }
            } catch (error) {
                Message.error('Failed to fetch groups');
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchGroups();
    }, []);

    useEffect(() => {
        if (location.pathname === '/tourist/group') {
            setIsEmpty(true);
        }
    }, [location]);

    const joinRoom = (groupId, groupName) => {
        setIsEmpty(false);
        navigate(`/tourist/group/chat/${groupId}`, { state: { groupName } });
    };

    const confirmLeaveGroup = (group) => {
        setCurrentGroup(group);
        setVisible(true);
    };

    const leaveGroup = async () => {
        const leaveGroupData = {
            accountId: localStorage.getItem('accountId'),
            groupId: currentGroup.groupId
        }

        if (currentGroup) {
            try {
                const res = await axiosInstance.delete('/groups/members', { data: leaveGroupData });
                if (res.data.status === 'success') {
                    setGroups(groups.filter(group => group.groupId !== currentGroup.groupId));
                    Message.success('离开群组成功');
                    navigate('/tourist/group');
                } else {
                    Message.error('Failed to leave group');
                }
            } catch (error) {
                Message.error('Failed to leave group');
                console.log(error);
            } finally {
                setVisible(false);
                setCurrentGroup(null);
            }
        }
    };

    return (
        <Layout className={styles['whole-page']} style={{ overflow: 'auto' }}>
            <Header />
            <div style={{ display: 'flex', width: '100%' }}>
                <div style={{ width: '26%', display: 'flex' }}>
                    <Layout style={{ padding: '0 24px 24px', display: 'flex', flexDirection: 'column' }}>
                        <Title heading={2}>群组列表</Title>
                        {loading ? (
                            <Spin style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
                        ) : (
                            <List
                                dataSource={groups}
                                style={{ width: '100%',height:670,overflow:'auto' }}
                                render={(item, index) => (
                                    <List.Item
                                        key={index}
                                        style={{ backgroundColor: '#fff' ,cursor:'pointer'}}
                                        onClick={() => joinRoom(item.groupId, item.groupName)}
                                        actions={[
                                            <Button type="text" 
                                                status='danger'
                                                onClick={(e) => {
                                                e.stopPropagation();
                                                confirmLeaveGroup(item);
                                            }}>
                                                <IconMinusCircle />
                                            </Button>
                                        ]}
                                    >
                                        <List.Item.Meta
                                            avatar={<Avatar><img src={item.imageUrl} /></Avatar>}
                                            title={item.groupName}
                                            description={item.description}
                                        />
                                    </List.Item>
                                )}
                            />
                        )}
                    </Layout>
                </div>
                <div style={{ width: '74%', display: 'flex' }}>
                    <Outlet />
                    {isEmpty && (
                        <Empty
                            style={{display: 'flex', alignItems: 'center', height: 400}}
                            description="请选择一个群组进行聊天"
                        />
                    )}
                </div>
            </div>
            <Footer />

            <Modal
                title="确认退出"
                visible={visible}
                onOk={leaveGroup}
                onCancel={() => setVisible(false)}
                okText="确认"
                cancelText="取消"
            >
                <p>你确定要退出 {currentGroup?.groupName} 群组吗？</p>
            </Modal>
        </Layout>
    );
};

export default TouristGroup;
