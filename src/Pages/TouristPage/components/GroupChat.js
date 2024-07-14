import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axiosInstance from '../../../Resquest/axiosInstance';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Card, List, Input, Button, Typography, Avatar } from "@arco-design/web-react";
import { IconArrowLeft } from "@arco-design/web-react/icon";
import { useUser } from "../../../Context/UserContext";
import styles from "./GroupChat.module.css";

const { Title } = Typography;
const { TextArea } = Input;

const GroupChat = () => {
    const [messages, setMessages] = useState([]);
    const [content, setContent] = useState('');
    const { user } = useUser();
    const [accountId, setAccountId] = useState(localStorage.getItem('accountId'));
    const [members, setMembers] = useState([]);
    const clientRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { groupId } = useParams();
    const groupName = location.state?.groupName;

    useEffect(() => {
        const fetchRoomInfo = async () => {
            axiosInstance.get(`/groups/histories/` + groupId).then(
                res => {
                    if (res.data.status === 'success') {
                        setMessages(res.data.data);
                    }
                }
            ).catch(
                error => {
                    console.log(error);
                }
            );
        };
        fetchRoomInfo();

        const fetchGroupMembers = async () => {
            axiosInstance.get(`/groups/members/` + groupId).then(
                res => {
                    if (res.data.status === 'success') {
                        setMembers(res.data.data);
                    }
                }
            ).catch(
                error => {
                    console.log(error);
                }
            );
        };
        fetchGroupMembers();
    }, [groupId, user]);

    useEffect(() => {
        if (user) {
            const socket = new SockJS('http://localhost:8090/chat');
            const client = new Client({
                webSocketFactory: () => socket,
                reconnectDelay: 5000,
                onConnect: () => {
                    client.subscribe('/topic/messages/' + groupId, (message) => {
                        const receivedMessage = JSON.parse(message.body);
                        const transformedMessage = {
                            accountId: receivedMessage.from,
                            action: 'common',
                            details: receivedMessage.content
                        };
                        setMessages((prevMessages) => [...prevMessages, transformedMessage]);
                    });
                }
            });

            client.activate();
            clientRef.current = client;

            return () => client.deactivate();
        }
    }, [groupId, user]);

    const sendMessage = () => {
        if (accountId && content && groupId) {
            const message = { from: accountId, content, group: groupId };
            if (clientRef.current && clientRef.current.connected) {
                clientRef.current.publish({
                    destination: '/app/send_group_messages',
                    body: JSON.stringify(message),
                });
                setContent('');
            }
        }
    };

    const getMemberInfo = (accountId) => {
        return members.find(member => member.accountId === accountId);
    };

    return (
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Button 
                icon={<IconArrowLeft />} 
                onClick={() => navigate(-1)} 
                style={{ marginBottom: '16px', width: 120 }}
            >
                返回
            </Button>
            <Card
                title={<Title heading={4} style={{margin : 'auto'}}>{groupName}</Title>} 
                style={{ flex: 1, overflow: 'auto' }}
                bodyStyle={{backgroundColor: '#fbfbfb'}}
            >
                <List
                    bordered={false}
                    split={false}
                    dataSource={messages}
                    render={(message, index) => {
                        const memberInfo = getMemberInfo(message.accountId);

                        if (message.action === 'create') {
                            return (
                                <List.Item 
                                    key={index} 
                                    style={{ display: 'flex',justifyContent: 'center', padding: '4px 0'}}
                                >
                                    <div style={{color: '#888',textAlign: 'center', margin: 4}}>
                                        {message.details}
                                    </div>
                                </List.Item>
                            );
                        } else if (message.action === 'add') {
                            return (
                                <List.Item 
                                    key={index}
                                    style={{ display: 'flex',justifyContent: 'center', padding: '4px 0'}}
                                >
                                    <div style={{color: '#888',textAlign: 'center', margin: 4}}>
                                        {message.details} {memberInfo?.name}
                                    </div>
                                </List.Item>
                            );
                        } else {
                            return (
                                <List.Item key={index} style={{
                                    display: 'flex',
                                    justifyContent: message.accountId == accountId ? 'flex-end' : 'flex-start',
                                    padding: '4px 0'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: message.accountId == accountId ? 'row-reverse' : 'row',
                                        alignItems: 'center',
                                        margin: 4
                                    }}>
                                        <Avatar size={32} style={{margin: '0 8px'}} src={memberInfo?.imageUrl}/>
                                        <div style={{
                                            backgroundColor: message.accountId == accountId ? '#7bee51' : '#ffffff',
                                            borderRadius: '16px',
                                            padding: '8px 12px',
                                            maxWidth: '70%',
                                            wordBreak: 'break-word',
                                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                                        }}>
                                            {message.details}
                                        </div>
                                    </div>
                                </List.Item>
                            );
                        }
                    }}
                />
            </Card>
            <div style={{ display: 'flex', marginTop: '16px' }}>
                <TextArea
                    value={content}
                    onChange={(e) => setContent(e)}
                    rows={3}
                    placeholder="输入消息..."
                    style={{ flex: 1, marginRight: '8px' }}
                />
                <Button type="primary" onClick={sendMessage}>
                    发送
                </Button>
            </div>
        </div>
    );
};

export default GroupChat;
