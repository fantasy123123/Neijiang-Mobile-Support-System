import React, { useEffect, useState } from 'react';
import { Layout, Carousel, Card, Space, Typography, Message } from '@arco-design/web-react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../Resquest/axiosInstance'
import Footer from './Footer';
import Header from './Header';
import styles from './TouristHome.module.css';

const { Content } = Layout;
const { Title } = Typography;

const TouristHome = () => {
    const navigate = useNavigate();
    const [merchantsCategories, setMerchantsCategories] = useState([]);
    const [merchantsMap, setMerchantsMap] = useState(new Map());

    useEffect(() => {
        // 获取所有分类
        axiosInstance.get('/merchants/categories')
            .then(res => {
                const categories = res.data.data;
                setMerchantsCategories(categories);

                // 根据每个分类的ID获取对应的商户信息
                const fetchMerchantInfo = async () => {
                    const newMerchantsMap = new Map();
                    for (const category of categories) {
                        try {
                            const response = await axiosInstance.get(`merchants/categories/${category.categoryId}`);
                            newMerchantsMap.set(category, response.data.data);
                        } catch (error) {
                            console.error(`Failed to fetch merchants for category ${category.categoryId}:`, error);
                            Message.error('Failed to fetch merchants');
                        }
                    }
                    setMerchantsMap(newMerchantsMap);
                };
                fetchMerchantInfo();
            })
            .catch(error => {
                console.error('Failed to fetch categories:', error);
                Message.error('Failed to fetch categories');
            });
    }, []);

    const carouselItems = [
        {
            image: 'https://mobile-support-platform.oss-cn-chengdu.aliyuncs.com/pic1.jpg',
            title: '商户1',
        },
        {
            image: 'https://mobile-support-platform.oss-cn-chengdu.aliyuncs.com/pic2.jpg',
            title: '商户2',
        },
        {
            image: 'https://mobile-support-platform.oss-cn-chengdu.aliyuncs.com/pic3.jpg',
            title: '商户3',
        },
        {
            image: 'https://mobile-support-platform.oss-cn-chengdu.aliyuncs.com/pic4.jpg',
            title: '商户4',
        },
        {
            image: 'https://mobile-support-platform.oss-cn-chengdu.aliyuncs.com/pic5.jpg',
            title: '商户5',
        },
        {
            image: 'https://mobile-support-platform.oss-cn-chengdu.aliyuncs.com/pic6.jpg',
            title: '商户6',
        },
    ];

    return (
        <Layout className={styles['whole-page']} style={{ height: '100vh', overflow: 'auto' }}>
            <Header />
            
            <Layout>
                <div style={{ marginTop: '10px', marginBottom: '20px' }}>
                    <Carousel autoplay>
                        {carouselItems.map((item, index) => (
                            <div key={index} style={{ height: '700px', background: `url(${item.image}) no-repeat center center`, backgroundSize: 'cover' }}>
                                <h3 style={{ color: '#fff', textAlign: 'center', lineHeight: '600px' }}>{item.title}</h3>
                            </div>
                        ))}
                    </Carousel>
                </div>

                <Layout style={{ padding: '0 24px 24px' }}>
                    <Content style={{ padding: '24px', margin: '0', minHeight: 280 }}>
                        <Space direction="vertical" size="large" style={{ width: '100%' }}>
                            {merchantsCategories.map(category => (
                                <div key={category.categoryId} style={{ marginBottom: '20px' }}>
                                    <Title className="category-title" heading={2}>{category.categoryName}</Title>
                                    <Space wrap size="large" style={{ width: '100%' }}>
                                        {(merchantsMap.get(category) || []).map((merchant, index) => (
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
                            ))}
                        </Space>
                    </Content>
                </Layout>
            </Layout>

            <Footer />
        </Layout>

        
    );
}

export default TouristHome;
