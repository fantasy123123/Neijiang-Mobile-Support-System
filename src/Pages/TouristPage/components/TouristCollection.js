import React, { useState } from 'react';
import {
    Button,
    Card,
    Descriptions,
    Empty,
    Image,
    List,
    Modal,
    Space,
    Typography,
} from '@arco-design/web-react';
import '@arco-design/web-react/dist/css/arco.css';
import { IconClose } from "@arco-design/web-react/icon";

const { Title, Text } = Typography;

const TouristCollection = () => {
    const [merchantFavorites, setMerchantFavorites] = useState([
        {
            favoriteId: 1,
            userId: 1,
            merchantId: 1,
            createdAt: "2024-07-08T15:14:20"
        }
    ]);

    const [productFavorites, setProductFavorites] = useState([
        {
            favoriteId: 1,
            userId: 1,
            productId: 1,
            createdAt: "2024-07-08T15:14:20"
        },
        {
            favoriteId: 2,
            userId: 1,
            productId: 2,
            createdAt: "2024-07-08T15:14:20"
        }
    ]);

    const [selectedMerchant, setSelectedMerchant] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showProductsModal, setShowProductsModal] = useState(false);

    const merchantDetails = {
        1: {
            merchantId: 1,
            ownerId: 2,
            categoryId: 1,
            categoryName: "零售",
            name: "商户一",
            address: "北京市朝阳区",
            phone: "1234567890",
            email: "merchant1@example.com",
            businessType: "零售",
            businessEnvironment: "线上",
            businessLocation: "中国",
            productCategory: "电子产品",
            imageUrl: "image1.jpg",
            createdAt: "2024-07-08T16:54:50.5141272"
        }
    };

    const productDetails = {
        1: {
            productId: 1,
            merchantId: 1,
            productName: "笔记本电脑",
            categoryId: 1,
            categoryName: "电子产品",
            price: 5000,
            description: "高性能笔记本电脑",
            imageUrl: "laptop.jpg",
            createdAt: "2024-07-08T15:14:19"
        },
        2: {
            productId: 2,
            merchantId: 1,
            productName: "智能手机",
            categoryId: 1,
            categoryName: "电子产品",
            price: 3000,
            description: "最新款智能手机",
            imageUrl: "smartphone.jpg",
            createdAt: "2024-07-08T15:14:19"
        }
    };

    const handleMerchantDetail = (merchantId) => {
        setSelectedProduct(false);
        setSelectedMerchant(merchantDetails[merchantId]);
        setShowModal(true);
    };

    const handleProductDetail = (productId) => {
        setSelectedMerchant(false);
        setSelectedProduct(productDetails[productId]);
        setShowModal(true);
    };

    const handleViewProducts = (merchantId) => {
        setSelectedMerchant(merchantDetails[merchantId]);
        setShowProductsModal(true);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' };
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card style={{ width: "90%", height: '90%', backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', padding: '20px' }}>
                <Title heading={2} style={{ textAlign: 'center', marginBottom: '20px' }}>
                    收藏管理
                </Title>
                <List
                    header={<Title heading={3}>商户收藏管理</Title>}
                    dataSource={merchantFavorites}
                    render={(favorite) => (
                        <List.Item
                            actions={[
                                <Button type="text" onClick={() => handleMerchantDetail(favorite.merchantId)}>查看详情</Button>,
                                <Button type="text" status="danger">删除</Button>
                            ]}
                        >
                            <List.Item.Meta
                                avatar={<Image src={merchantDetails[favorite.merchantId]?.imageUrl} width={50} height={50} shape="circle" />}
                                title={merchantDetails[favorite.merchantId]?.name || '商户信息不存在'}
                            />
                        </List.Item>
                    )}
                />
                <List
                    header={<Title heading={3}>商品收藏管理</Title>}
                    dataSource={productFavorites}
                    render={(favorite) => (
                        <List.Item
                            actions={[
                                <Button type="text" onClick={() => handleProductDetail(favorite.productId)}>查看详情</Button>,
                                <Button type="text" status="danger">删除</Button>
                            ]}
                        >
                            <List.Item.Meta
                                avatar={<Image src={productDetails[favorite.productId]?.imageUrl} width={50} height={50} shape="circle" />}
                                title={productDetails[favorite.productId]?.productName || '商品信息不存在'}
                            />
                        </List.Item>
                    )}
                />
                <Modal
                    visible={showModal}
                    onCancel={() => setShowModal(false)}
                    title={selectedMerchant ? selectedMerchant.name : selectedProduct ? selectedProduct.productName : '详情'}
                    footer={null}
                    closable={true}
                    closeIcon={<IconClose />}
                >
                    {selectedMerchant ? (
                        <>
                            <Descriptions
                                column={1}
                                data={[
                                    { label: '商户信息', value: selectedMerchant.name },
                                    { label: '类别', value: selectedMerchant.categoryName },
                                    { label: '地址', value: selectedMerchant.address },
                                    { label: '电话', value: selectedMerchant.phone },
                                    { label: '邮箱', value: selectedMerchant.email },
                                    { label: '商业类型', value: selectedMerchant.businessType },
                                    { label: '商业环境', value: selectedMerchant.businessEnvironment },
                                    { label: '产品类别', value: selectedMerchant.productCategory },
                                    { label: '创建时间', value: formatDate(selectedMerchant.createdAt) }
                                ]}
                                style={{ marginBottom: 20 }}
                                labelStyle={{
                                    fontWeight: 'bold',
                                    paddingRight: 16,
                                    color: '#333'
                                }}
                                valueStyle={{
                                    color: '#666'
                                }}
                            />
                            <Space align="center" style={{ width: '100%', justifyContent: 'center' }}>
                                <Button type="primary" onClick={() => handleViewProducts(selectedMerchant.merchantId)}>查看商品信息</Button>
                            </Space>
                        </>

                    ) : selectedProduct ? (
                        <Descriptions
                            column={1}
                            data={[
                                { label: '商品名称', value: selectedProduct.productName },
                                { label: '商户', value: merchantDetails[selectedProduct.merchantId].name },
                                { label: '类别', value: selectedProduct.categoryName },
                                { label: '价格', value: selectedProduct.price },
                                { label: '描述', value: selectedProduct.description },
                                { label: '创建时间', value: formatDate(selectedProduct.createdAt) }
                            ]}
                            style={{ marginBottom: 20, width: '80%' }}
                            labelStyle={{
                                fontWeight: 'bold',
                                paddingRight: 16,
                                color: '#333',
                                textAlign: 'right'
                            }}
                            valueStyle={{
                                color: '#666'
                            }}
                        />
                    ) : (
                        <Empty description="信息不存在" />
                    )}
                </Modal>
                <Modal
                    visible={showProductsModal}
                    onCancel={() => setShowProductsModal(false)}
                    title={`${selectedMerchant?.name} 的商品信息`}
                    footer={null}
                    closable={true}
                    closeIcon={<IconClose />}
                >
                    <List
                        dataSource={Object.values(productDetails).filter(product => product.merchantId === selectedMerchant?.merchantId)}
                        render={(product) => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Image src={product.imageUrl} width={50} height={50} shape="circle" />}
                                    title={product.productName}
                                    description={`价格: ${product.price} | 类别: ${product.categoryName} | 描述: ${product.description}`}
                                />
                            </List.Item>
                        )}
                    />
                </Modal>
            </Card>
        </div>
    );
};

export default TouristCollection;
