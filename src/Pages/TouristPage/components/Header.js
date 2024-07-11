import React, { useEffect } from 'react';
import { Space, Input, Layout, Typography, Button, Avatar } from '@arco-design/web-react';
import { useUser } from '../../../Context/UserContext';
import styles from './Header.module.css';

const { Text } = Typography;

const Header = () => {
    const { user, setUser } = useUser();

    useEffect(() => {
        // 任何需要在加载时执行的操作
    }, []);

    return (
        <Layout className="header">
            <div className={styles['logo']}>RStarHub</div>
            <div className={styles['search-bar']}>
                <Input.Search placeholder="搜索商户、地点" style={{ width: 300 }} />
            </div>
            <div className={styles['user-info']}>
                <Space size="middle">
                    {user?.imageUrl && <Avatar size={32} src={user.imageUrl} />}
                    <Text style={{ fontSize: '15px', color: '#fff' }}>Hi, {user?.name}</Text>
                    <Button type="primary">登出</Button>
                </Space>
            </div>
        </Layout>
    );
};

export default Header;
