import React, { useState, useEffect, useRef } from 'react';
import {useNavigate} from 'react-router-dom';
import axiosInstance from "../../api/AxiosApi";
import { Card, List, Typography, Avatar, Badge, Space } from "@arco-design/web-react";
import "@arco-design/web-react/dist/css/arco.css";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import store from './store/store'

const ManageDiscussion = () => {
    const [groups, setGroups] = useState([]);
    const [counts, setCounts] = useState([]);
    const clientRef = useRef(null);
    const navigate = useNavigate();
    const [length,setLength]=useState(0)

    useEffect(() => {
        const fetchGroups = async () => {
            axiosInstance.get('/groups/accounts/' + localStorage.getItem('accountId')).then(
                res => {
                    if (res.data.status === 'success') {
                        setGroups(res.data.data);
                        setCounts(store.getState())
                        setLength(res.data.data.length)
                    }
                }
            ).catch(
                error => {
                    console.log(error);
                }
            );
        };
        fetchGroups().then();
    }, []);

    useEffect(() => {
        if (groups.length > 0) {
            const socket = new SockJS('http://localhost:8090/chat');
            const client = new Client({
                webSocketFactory: () => socket,
                reconnectDelay: 5000,
                onConnect: () => {
                    groups.forEach(group => {
                        client.subscribe(`/topic/messages/${group.groupId}`, (message) => {
                            const receivedMessage = JSON.parse(message.body);
                            if (receivedMessage.action !== null) {
                                const index = groups.findIndex(g => g.groupId === group.groupId);
                                store.dispatch({type:'update',data:index})
                                setCounts(store.getState())
                            }
                        });
                    });
                }
            });

            client.activate();
            clientRef.current = client;

            return () => client.deactivate();
        }
    }, [groups]);

    const joinRoom = (groupId, groupName) => {
        navigate(`/shopkeeper/chat/${groupId}`, { state: { groupName } });
    };

    return (
        <div style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{marginTop: 35, fontSize: 25, fontWeight: 'bold', color: '#165DFF', textAlign: 'center'}}>
                群组讨论
            </div>
            <Card style={{
                marginTop: 24,
                width: "90%",
                height: 'auto',
                borderRadius: 12,
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                overflow: 'auto'
            }}>
                <hr style={{width: '100%', borderTop: '1px solid #e8e8e8'}}/>
                <List
                    bordered={false}
                    dataSource={groups}
                    render={(group, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                joinRoom(group.groupId, group.groupName)
                                store.dispatch({type:'init',data:length})
                                setCounts(store.getState())
                            }}
                            style={{
                                cursor: 'pointer',
                                padding: '16px',
                                borderBottom: '1px solid #e8e8e8',
                                backgroundColor: '#fff',
                                transition: 'background-color 0.3s',
                                '&:hover': {
                                    backgroundColor: '#e6f7ff',
                                },
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            {counts[index] > 0 ? (
                                <Space>
                                    <Badge
                                        count={counts[index]}
                                        maxCount={99}
                                    >
                                        <Avatar size={50} shape="square" style={{marginRight: 16}}
                                                src={group.imageUrl}/>
                                    </Badge>
                                </Space>
                            ) : (
                                <Avatar size={50} shape="square" style={{marginRight: 16}} src={group.imageUrl}/>
                            )}
                            <Typography.Text style={{fontSize: 16, color: '#333'}}>{group.groupName}</Typography.Text>
                        </div>
                    )}
                />
            </Card>
        </div>
    );
};

export default ManageDiscussion;

