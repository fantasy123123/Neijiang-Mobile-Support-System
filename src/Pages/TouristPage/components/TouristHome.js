import React, { useEffect, useState } from 'react';
import { Layout, Carousel, Card, Space, Typography, Message} from '@arco-design/web-react';
import pic1 from '../images/pic1.jpg';
import pic2 from '../images/pic2.jpg';
import pic3 from '../images/pic3.jpg';
import pic4 from '../images/pic4.jpg';
import pic5 from '../images/pic5.jpg';
import pic6 from '../images/pic6.jpg';
import { IconStar, IconStarFill } from '@arco-design/web-react/icon';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../../../Resquest/axiosInstance'
import Footer from './Footer';
import Header from './Header';
import styles from './TouristHome.module.css';

const { Content } = Layout;
const { Title } = Typography;

const TouristHome = () => {
    const navigate = useNavigate();
    const location = useLocation();
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
    }, [location]);

    const imageSrc = [
        pic1, pic2, pic3, pic4, pic5, pic6
    ];

    return (
        <Layout className={styles['whole-page']} style={{ height: '100vh', overflow: 'auto' }}>
            <Header />
            
            <Layout>
                <div style={{ marginBottom: '20px' }}>
                    <Carousel
                        style={{ width: '100%', height: '700px' }}
                        autoPlay={{interval : 5000}}
                        indicatorType='dot'
                        showArrow='hover'
                        >
                        {imageSrc.map((src, index) => (
                            <div key={index}>
                            <img
                                src={src}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                alt={`carousel-${index}`}
                            />
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
                                                cover={
                                                    <img alt={merchant.name} src={merchant.imageUrl} 
                                                    onClick={() => navigate(`/tourist/merchant/${merchant.merchantId}`)}
                                                    />
                                                }
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
