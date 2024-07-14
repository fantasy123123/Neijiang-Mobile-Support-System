import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Card, List, Typography, Layout, Avatar, Space, Spin, Message } from "@arco-design/web-react";
import axiosInstance from '../../../Resquest/axiosInstance';
import styles from './TouristGroup.module.css';
import Footer from './Footer';
import Header from './Header';

const { Title } = Typography;

const TouristGroup = () => {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

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

    const joinRoom = (groupId, groupName) => {
        navigate(`/tourist/group/chat/${groupId}`, { state: { groupName } });
    };

    return (
        <Layout className={styles['whole-page']} style={{ display: 'flex', overflow: 'auto' }}>
            <Header />
            <div style={{ display: 'flex', width: '100%' }}>
                <div style={{ width : '25%', display: 'flex' }}>
                    <Layout style={{ padding: '0 24px 24px', display: 'flex', flexDirection: 'column' }}>
                        <Title heading={2}>群组列表</Title>
                        {loading ? (
                            <Spin style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }} />
                        ) : (
                            <List
                                dataSource={groups}
                                style={{ width: '100%' }}
                                render={(item, index) => (
                                    <List.Item
                                        key={index}
                                        style={{ backgroundColor: '#fff' }}
                                        onClick={() => joinRoom(item.groupId, item.groupName)}
                                    >
                                        <List.Item.Meta
                                            avatar={<Avatar src={item.imageUrl} />}
                                            title={item.groupName}
                                            description={item.description}
                                        />
                                    </List.Item>
                                )}
                            />
                        )}
                    </Layout>
                </div>
                <div style={{ width: '75%', display: 'flex' }}>
                    <Outlet />
                </div>
            </div>
            <Footer />
        </Layout>
    );
};

export default TouristGroup;
