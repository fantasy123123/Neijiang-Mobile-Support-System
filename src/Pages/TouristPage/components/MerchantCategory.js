import React, { useEffect, useState } from 'react';
import { Layout, Card, Space, Typography, Message } from '@arco-design/web-react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../../Resquest/axiosInstance'
import Footer from './Footer';
import Header from './Header';
import styles from './MerchantCategory.module.css';

const { Content } = Layout;
const { Title } = Typography;

const MerchantCatrgory = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { categoryName } = location.state || {};
    const { categoryId } = useParams();
    const [merchants, setMerchants] = useState([]);

    useEffect(() => {

        const fetchMerchantInfo = async () => {
            try {
                const response = await axiosInstance.get(`merchants/categories/${categoryId}`);
                setMerchants(response.data.data);
            } catch (error) {
                console.error(`Failed to fetch merchants for category ${categoryId}:`, error);
                Message.error('Failed to fetch merchants');
            }
        }
        fetchMerchantInfo();
        
    }, [categoryId]);

    return (
        <Layout className={styles['whole-page']} style={{ height: '100vh', overflow: 'auto' }}>
            <Header />
            
            <Layout>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Content style={{ padding: '24px', margin: '0', minHeight: 280 }}>
                        <Space direction="vertical" size="large" style={{ width: '100%' }}>
                            
                            <div style={{ marginBottom: '20px' }}>
                                <Title heading={2}>{categoryName}</Title>

                                <Space wrap size="medium" style={{ width: '100%' }}>
                                    {merchants.map((merchant, index) => (
                                        <Card
                                            key={merchant.merchantId}
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
}

export default MerchantCatrgory;
