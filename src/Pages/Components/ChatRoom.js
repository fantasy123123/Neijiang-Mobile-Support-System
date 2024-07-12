import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import axiosInstance from "../../api/AxiosApi";
import { List, Input, Button, Typography, Avatar,Notification } from "@arco-design/web-react";
import "@arco-design/web-react/dist/css/arco.css";
import { IconArrowLeft } from "@arco-design/web-react/icon";

const { Title } = Typography;

const ChatRoom = () => {
    const [messages, setMessages] = useState([]);
    const [content, setContent] = useState('');
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    const [members, setMembers] = useState([]);
    const [showScrollToBottom, setShowScrollToBottom] = useState(false);
    const [toBottom , setToBottom]= useState(true);
    const clientRef = useRef(null);
    const listRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { groupId } = useParams();
    const groupName = location.state?.groupName;

    useEffect(()=>{
        setTimeout(scrollToBottom,10)
    },[])

    useEffect(() => {
        const fetchUserInfo = async () => {
            axiosInstance.get('/merchants/accountId/' + localStorage.getItem('accountId')).then(
                res => {
                    if (res.data.status === 'success') {
                        setUserInfo(res.data.data);
                        setUsername(res.data.data.ownerId);
                        setToBottom(true);
                    }
                }
            ).catch(
                error => {
                    console.log(error);
                }
            );
        };
        fetchUserInfo().then();

        const fetchRoomInfo = async () => {
            setRoom(groupId);
            // 获取群组消息历史记录
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
        fetchRoomInfo().then();

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
        fetchGroupMembers().then();
    }, [groupId]);

    useEffect(() => {
        if (userInfo) {
            const socket = new SockJS('http://localhost:8090/chat');
            const client = new Client({
                webSocketFactory: () => socket,
                reconnectDelay: 5000,
                onConnect: () => {
                    // 群内广播
                    client.subscribe('/topic/messages/' + room, (message) => {
                        const receivedMessage = JSON.parse(message.body);
                        const transformedMessage = {
                            accountId: receivedMessage.from,
                            action: 'common',
                            details: receivedMessage.content
                        };
                        setMessages((prevMessages) => [...prevMessages, transformedMessage]);
                        if(transformedMessage.accountId.toString() === localStorage.getItem('accountId').toString()) {
                            setToBottom(true);
                        }
                        else{
                            handleScroll();
                        }
                    });
                }
            });

            client.activate();
            clientRef.current = client;

            return () => client.deactivate();
        }
    }, [room, userInfo]);


    const handleScroll = () => {
        if (listRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = listRef.current;
            if (scrollTop + clientHeight >= scrollHeight - 10) {
                setShowScrollToBottom(false);
            } else {
                setShowScrollToBottom(true);
            }
        }
    };


    const scrollToBottom = () => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
            setToBottom(false);
            setShowScrollToBottom(false);
        }
    };

    useEffect(() => {
        if(toBottom) {
            scrollToBottom();
        }
    }, [messages]);

    const sendMessage = () => {
        if (username && content && room) {
            const message = { from: username, content, group: room };
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

    useEffect(()=>{
        const id = `${Date.now()}`;
        if(showScrollToBottom){
            Notification.info({
                id,
                title: '有新消息！',
                content: '是否跳到底部？',
                duration:5000,
                btn: (
                    <span>
                    <Button
                        type='primary'
                        size='small'
                        style={{ margin: '0 12px' }}
                        onClick={()=> {
                            scrollToBottom()
                            Notification.remove(id)
                        }}
                    >
                        跳转
                    </Button>
                    <Button
                        type='secondary'
                        size='small'
                        onClick={()=>{Notification.remove(id)}}
                    >
                        否
                    </Button>
                </span>
                ),
            });
        }
    },[showScrollToBottom])

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ position:'relative',width: '80%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    height:'10%',
                    width: '100%',
                    paddingLeft: '16px',
                    paddingRight: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#ffffff',
                    borderBottom: '1px solid #e8e8e8',
                    zIndex: 2
                }}>
                    <Button type="text" onClick={() => navigate(-1)} style={{marginRight: 8}}>
                        <IconArrowLeft style={{fontSize: '30px'}}/>
                    </Button>
                    <Title level={2} style={{margin: 0}}>{groupName}</Title>
                </div>
                <div ref={listRef} style={{
                    position: 'absolute',
                    top: '10%',
                    width: "100%",
                    height: '80%',
                    overflow: 'auto',
                    padding: '0px 16px 10px 16px',
                    border: '1px solid #e8e8e8',
                    backgroundColor:'whitesmoke'
                }}>
                        <List
                            bordered={false}
                            split={false}
                            dataSource={messages}
                            render={(message, index) => {
                                const memberInfo = getMemberInfo(message.accountId);
                                if (message.action === 'create') {
                                    return (
                                        <List.Item key={index} style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            padding: '10px 0 5px 0'
                                        }}>
                                            <div style={{
                                                color: '#888',
                                                textAlign: 'center'
                                            }}>
                                                {memberInfo?.name} {message.details}
                                            </div>
                                        </List.Item>
                                    );
                                } else if (message.action === 'add') {
                                    return (
                                        <List.Item key={index} style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            padding: '5px 0'
                                        }}>
                                            <div style={{
                                                color: '#888',
                                                textAlign: 'center'
                                            }}>
                                                {message.details} {memberInfo?.name}
                                            </div>
                                        </List.Item>
                                    );
                                } else {
                                    return (
                                        <List.Item key={index} style={{
                                            display: 'flex',
                                            justifyContent: message.accountId === username ? 'flex-end' : 'flex-start',
                                            padding: '5px 0'
                                        }}>
                                            <div style={{
                                                display: 'flex',
                                                flexDirection: message.accountId === username ? 'row-reverse' : 'row',
                                                alignItems: 'center'
                                            }}>
                                                <Avatar size={32} style={{margin: '0 8px'}} src={memberInfo?.imageUrl}/>
                                                <div style={{maxWidth: '70%'}}>
                                                    <div style={{
                                                        fontSize:12,
                                                        color:'grey',
                                                        textAlign:message.accountId === username ? 'right':'left'
                                                    }}
                                                    >
                                                        {memberInfo?.name}
                                                    </div>
                                                    <div style={{
                                                        backgroundColor: message.accountId === username ? '#e6f7ff' : '#ffffff',
                                                        borderRadius: '16px',
                                                        padding: '8px 12px',
                                                        maxWidth: '100%',
                                                        wordBreak: 'break-word',
                                                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                                                    }}>
                                                        {message.details}
                                                    </div>
                                                </div>
                                            </div>
                                        </List.Item>
                                    );
                                }
                            }}
                        />
                </div>
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    height:'calc(10% - 10px)',
                    width: '100%',
                    paddingLeft: '16px',
                    paddingRight: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#ffffff',
                    borderTop: '1px solid #e8e8e8'
                }}>
                    <Input.TextArea
                        autoSize={{minRows:1,maxRows:1}}
                        size={'large'}
                        placeholder="Enter your message"
                        value={content}
                        onChange={(e) => setContent(e)}
                        style={{marginRight: 8, flex: 1}}
                    />
                    <Button type="primary" onClick={sendMessage}>Send</Button>
                </div>
            </div>
        </div>
    );
};

export default ChatRoom;
