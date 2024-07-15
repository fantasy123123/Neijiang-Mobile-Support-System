import React, { useEffect, useState } from 'react';
import { Space, Card, Layout, Typography, Button } from '@arco-design/web-react';
import { useUser } from '../../../Context/UserContext';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../../../Resquest/axiosInstance';
import { IconArrowLeft } from "@arco-design/web-react/icon";
import styles from './SearchResult.module.css';
import Footer from './Footer';
import Header from './Header';

const { Title } = Typography;
const { Content } = Layout;

const SearchResult = () => {
    const { user, setUser } = useUser();
    const navigate = useNavigate();
    const location = useLocation();
    const results = location.state?.results || [];

    useEffect(() => {
        // 任何需要在加载时执行的操作
    }, [user, setUser]);

    return (
        <Layout className={styles['whole-page']} style={{ height: '100vh', overflow: 'auto' }}>
            <Header />

            <Layout>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Content style={{ padding: '24px', margin: '0', minHeight: 280 }}>
                        <Space direction="vertical" size="large" style={{ width: '100%' }}>
                            
                            <div style={{ marginBottom: '20px' }}>
                                <span style={{display: 'flex', alignItems: 'center'}}>
                                    <Title heading={2}>匹配的商户</Title>
                                    <Button 
                                        icon={<IconArrowLeft />} 
                                        onClick={() => navigate(-1)} 
                                        style={{ marginTop: 20, width: 120, marginLeft: 20}}
                                    >
                                        返回
                                    </Button>
                                </span>
                                
                                <Space wrap size="large" style={{ width: '100%' }}>
                                    {results.map((merchant, index) => (
                                        <Card
                                            key={index}
                                            hoverable
                                            className={styles['shop-card']}
                                            cover={<img alt={merchant.name} src={merchant.imageUrl} />}
                                            onClick={() => navigate(`/tourist/merchant/${merchant.merchantId}`)}
                                        >
                                            <Card.Meta title={merchant.name} description={`${merchant.businessType} ${merchant.address}`} />
                                        </Card>
                                    ))}
                                </Space>

                            </div>
                            
                        </Space>
                    </Content>
                </Layout>
            </Layout>

            <Footer />
        </Layout>
    );
};

export default SearchResult;
