import React, { useEffect, useState } from 'react';
import { Layout, Tabs, List, Card, Typography, Spin, Message, Avatar, Grid, Button } from '@arco-design/web-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../Context/UserContext';
import axiosInstance from '../../../Resquest/axiosInstance';
import Footer from './Footer';
import Header from './Header';
import styles from './TouristFavorite.module.css';

const { Title, Text } = Typography;
const { Row, Col } = Grid;

const TouristFavorite = () => {
    const { user } = useUser();
    const navigate = useNavigate();
    const [merchantFavorites, setMerchantFavorites] = useState([]);
    const [productFavorites, setProductFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        // 获取商户收藏
        axiosInstance.get(`/users/favorite_merchants/${user.userId}`)
            .then(async res => {
                const favorites = res.data.data;
                const details = await Promise.all(favorites.map(async (favorite) => {
                    const detail = await axiosInstance.get(`/merchants/${favorite.merchantId}`);
                    return { ...favorite, ...detail.data.data };
                }));
                setMerchantFavorites(details);
            })
            .catch(error => Message.error('Failed to fetch merchant favorites'));

        // 获取商品收藏
        axiosInstance.get(`/users/favorite_products/${user.userId}`)
            .then(async res => {
                const favorites = res.data.data;
                const details = await Promise.all(favorites.map(async (favorite) => {
                    const detail = await axiosInstance.get(`/products/${favorite.productId}`);
                    return { ...favorite, ...detail.data.data };
                }));
                setProductFavorites(details);
            })
            .catch(error => Message.error('Failed to fetch product favorites'))
            .finally(() => setLoading(false));
    }, [user.userId]);

    const handleUnfavorite = (favoriteId, type) => {
        const url = type === 'merchant' ? `/users/favorite_merchants/${favoriteId}` : `/users/favorite_products/${favoriteId}`;
        axiosInstance.delete(url)
            .then(() => {
                Message.success('取消收藏成功');
                if (type === 'merchant') {
                    setMerchantFavorites(favorites => favorites.filter(favorite => favorite.favoriteId !== favoriteId));
                } else {
                    setProductFavorites(favorites => favorites.filter(favorite => favorite.favoriteId !== favoriteId));
                }
            })
            .catch(error => Message.error('Failed to unfavorite'));
    };

    return (
        <Layout className={styles['whole-page']} style={{ height: '100vh', overflow: 'auto' }}>
            <Header />
            <Layout style={{ padding: '0 24px 24px' }}>
                <Tabs defaultActiveTab="merchant-favorites" style={{paddingTop : 5}}>
                    <Tabs.TabPane key="merchant-favorites" title="商户收藏" style={{minHeight : 400}}>
                        {loading ? (
                            <Spin style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>Loading...</Spin>
                        ) : (
                            <List
                                dataSource={merchantFavorites}
                                render={(item, index) => (
                                    <List.Item key={index} className={styles['favorite-item']}>
                                        <Card hoverable>
                                            <Row gutter={16} >
                                                <Col span={6}>
                                                    <img src={item.imageUrl} alt={item.name} style={{ width: '100%' }} 
                                                        onClick={() => navigate(`/tourist/merchant/${item.merchantId}`)}
                                                    />
                                                </Col>
                                                <Col span={18}>
                                                    <Title heading={5}>{item.name}</Title>
                                                    <Row gutter={16} >
                                                        <Col span={12}>
                                                            <p><strong>电话: </strong> {item.phone}</p>
                                                            <p><strong>类别: </strong> {item.categoryName}</p>
                                                            <p><strong>邮箱: </strong> {item.email}</p>
                                                            <p><strong>地址: </strong> {item.address}</p>
                                                        </Col>
                                                        <Col span={12}>
                                                            <p><strong>业务类型: </strong> {item.businessType}</p>
                                                            <p><strong>业务环境: </strong> {item.businessEnvironment}</p>
                                                            <p><strong>业务地点: </strong> {item.businessLocation}</p>
                                                            <div className={styles['right-button-container']}>
                                                                <Button onClick={() => handleUnfavorite(item.favoriteId, 'merchant')}>
                                                                    取消收藏
                                                                </Button>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </List.Item>
                                )}
                            />
                        )}
                    </Tabs.TabPane>
                    <Tabs.TabPane key="product-favorites" title="商品收藏" style={{minHeight : 400}}>
                        {loading ? (
                            <Spin style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>Loading...</Spin>
                        ) : (
                            <List
                                dataSource={productFavorites}
                                render={(item, index) => (
                                    <List.Item key={index} className={styles['favorite-item']}>
                                        <Card hoverable>
                                            <Row gutter={16} >
                                                <Col span={6}>
                                                    <img src={item.imageUrl} alt={item.productName} style={{ width: '100%' }} 
                                                        onClick={() => navigate(`/tourist/product/${item.productId}`)}
                                                    />
                                                </Col>
                                                <Col span={18}>
                                                    <Title heading={5}>{item.productName}</Title>
                                                    <Row gutter={16} >
                                                        <Col span={12}>
                                                            <p><strong>商品类别: </strong> {item.categoryName}</p>
                                                            <p><strong>商品售价: </strong> {item.price}</p>
                                                        </Col>
                                                        <Col span={12}>
                                                            <p><strong>商品描述: </strong> {item.description}</p>
                                                        </Col>
                                                    </Row>
                                                    <div className={styles['right-button-container']}>
                                                        <Button onClick={() => handleUnfavorite(item.favoriteId, 'product')}>
                                                            取消收藏
                                                        </Button>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </List.Item>
                                )}
                            />
                        )}
                    </Tabs.TabPane>
                </Tabs>
            </Layout>
            <Footer />
        </Layout>
    );
};

export default TouristFavorite;
