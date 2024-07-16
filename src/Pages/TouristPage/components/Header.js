import React, { useEffect, useState } from 'react';
import { Space, Input, Layout, Typography, Button, Avatar, Message } from '@arco-design/web-react';
import { useUser } from '../../../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../Resquest/axiosInstance';
import styles from './Header.module.css';

const { Text } = Typography;

const Header = () => {
    const { user, setUser } = useUser();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // 任何需要在加载时执行的操作
    }, [user, setUser]);

    const handleLogOut = () => {
        setUser({});
        navigate('/');
    }

    const handleSearch = async () => {
        if (searchQuery.trim() === '') {
            Message.warning('请输入搜索关键词');
            return;
        }

        try {
            const response = await axiosInstance.post(`/merchants/search`, { keyword: searchQuery });
            const results = response.data.data;
            if (results.length > 0) {
                navigate('/tourist/search', { state: { results } });
            } else {
                Message.info('没有找到相关结果');
            }
        } catch (error) {
            console.error('搜索失败:', error);
            Message.error('搜索失败，请稍后重试');
        }
    }

    return (
        <Layout className="header">
            <div className={styles['logo']} onClick={() => navigate('/tourist/home')}>RStarHub</div>
            <div className={styles['search-bar']}>
                <Input.Search
                    placeholder="搜索商户、商品"
                    style={{ width: 300 }}
                    value={searchQuery}
                    onChange={(value) => setSearchQuery(value)}
                    onSearch={handleSearch}
                />
            </div>
            <div className={styles['user-info']}>
                <Space size="middle">
                    {user?.imageUrl && 
                        <Avatar size={32}>
                            <img
                                alt='avatar'
                                src={user.imageUrl}
                            />
                        </Avatar>
                    }
                    <Text style={{ fontSize: '15px', color: '#fff', paddingRight : 5 }}>Hi, {user?.name}</Text>
                    <Button 
                        type="primary"
                        onClick={handleLogOut}
                    >
                        登出
                    </Button>
                </Space>
            </div>
        </Layout>
    );
};

export default Header;
