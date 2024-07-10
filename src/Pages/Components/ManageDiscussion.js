import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../../api/AxiosApi";
import { Card, List, Typography } from "@arco-design/web-react";
import "@arco-design/web-react/dist/css/arco.css";

const { Title } = Typography;

const ManageDiscussion = () => {
    const [groups, setGroups] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGroups = async () => {
            axiosInstance.get('/groups/accounts/' + localStorage.getItem('accountId')).then(
                res => {
                    if (res.data.status === 'success') {
                        setGroups(res.data.data);
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

    const joinRoom = (groupId, groupName) => {
        navigate(`/shopkeeper/chat/${groupId}`, { state: { groupName } });
    };

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card style={{ width: "90%", height: '90%' }}>
                <Title level={2} style={{ textAlign: 'center' }}>群组讨论</Title>
                <List
                    dataSource={groups}
                    render={(group, index) => (
                        <List.Item key={index} onClick={() => joinRoom(group.groupId, group.groupName)} style={{ cursor: 'pointer' }}>
                            {group.groupName}
                        </List.Item>
                    )}
                />
            </Card>
        </div>
    );
};

export default ManageDiscussion;
