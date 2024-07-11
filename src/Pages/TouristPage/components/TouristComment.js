import React, { useEffect, useState } from 'react';
import { Layout, Tabs, List, Comment, Button, Input, Message, Space, Modal, Avatar, Rate, Grid, Card, Spin, Typography } from '@arco-design/web-react';
import { useUser } from '../../../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import axiosInstance from '../../../Resquest/axiosInstance';
import styles from './TouristComment.module.css';

const { TextArea } = Input;
const { Title } = Typography;
const { Row, Col } = Grid;

const TouristComment = () => {
    const { user } = useUser();
    const navigate = useNavigate();
    const [merchantComments, setMerchantComments] = useState([]);
    const [productComments, setProductComments] = useState([]);
    const [editingComment, setEditingComment] = useState(null);
    const [newContent, setNewContent] = useState('');
    const [newRating, setNewRating] = useState(0);
    const [merchantDetails, setMerchantDetails] = useState({});
    const [productDetails, setProductDetails] = useState({});

    useEffect(() => {
        // 获取商户评论
        axiosInstance.get(`/comments/merchant_comments/users/${user.userId}`)
            .then(res => {
                setMerchantComments(res.data.data);
                // 获取每个商户的详情
                res.data.data.forEach(comment => {
                    axiosInstance.get(`/merchants/${comment.merchantId}`)
                        .then(merchantRes => {
                            setMerchantDetails(prevState => ({
                                ...prevState,
                                [comment.merchantId]: merchantRes.data.data
                            }));
                        });
                });
            })
            .catch(error => Message.error('Failed to fetch merchant comments'));

        // 获取商品评论
        axiosInstance.get(`/comments/product_comments/users/${user.userId}`)
            .then(res => {
                setProductComments(res.data.data);
                // 获取每个商品的详情
                res.data.data.forEach(comment => {
                    axiosInstance.get(`/products/${comment.productId}`)
                        .then(productRes => {
                            setProductDetails(prevState => ({
                                ...prevState,
                                [comment.productId]: productRes.data.data
                            }));
                        });
                });
            })
            .catch(error => Message.error('Failed to fetch product comments'));
    }, [user.userId]);

    const handleEdit = (comment) => {
        setEditingComment(comment);
        setNewContent(comment.content);
        setNewRating(comment.rating); // 设置当前评分
    };

    const handleDelete = (commentId, type) => {
        const url = type === 'merchant' ? `/comments/merchant_comments/${commentId}` : `/comments/product_comments/${commentId}`;
        axiosInstance.delete(url)
            .then(() => {
                Message.success('Comment deleted successfully');
                if (type === 'merchant') {
                    setMerchantComments(comments => comments.filter(comment => comment.commentId !== commentId));
                } else {
                    setProductComments(comments => comments.filter(comment => comment.commentId !== commentId));
                }
            })
            .catch(error => Message.error('Failed to delete comment'));
    };

    const handleSave = () => {
        const url = editingComment.merchantId ? `/comments/merchant_comments` : `/comments/product_comments`;
        const updatedComment = { ...editingComment, content: newContent, rating: newRating };

        axiosInstance.put(url, updatedComment)
            .then((res) => {
                if (res.status === 200) {
                    Message.success('Comment updated successfully');
                    setMerchantComments(comments => 
                        comments.map(comment => 
                            comment.commentId === editingComment.commentId ? { ...comment, content: newContent, rating: newRating } : comment
                        )
                    );
                    setProductComments(comments => 
                        comments.map(comment => 
                            comment.commentId === editingComment.commentId ? { ...comment, content: newContent, rating: newRating } : comment
                        )
                    );
                    setEditingComment(null);
                    setNewContent('');
                    setNewRating(0);
                } else {
                    Message.error('Failed to update comment');
                }
            })
            .catch(error => Message.error('Failed to update comment'));
    };

    const handleCancel = () => {
        setEditingComment(null);
        setNewContent('');
        setNewRating(0);
    };

    return (
        <Layout className={styles['whole-page']} style={{ height: '100vh', overflow: 'auto' }}>
            <Header />
            
            <Layout style={{ padding: '0 24px 24px' }}>
            <Tabs defaultActiveTab="merchant-comments" style={{paddingTop : 5}}>
                <Tabs.TabPane key="merchant-comments" title="商户评论">
                    <List
                        dataSource={merchantComments}
                        render={(item, index) => (
                            <List.Item key={index} className={styles['comment-item']}>
                                <Row gutter={16} style={{display : 'flex', alignItems: 'stretch'}}>
                                    <Col span={12}>
                                        <Card
                                            onClick={() => navigate(`/tourist/merchant/${item.merchantId}`)}
                                        >
                                            {merchantDetails[item.merchantId] ? (
                                                <Row gutter={16} >
                                                    <Col span={12}>
                                                        <img src={merchantDetails[item.merchantId].imageUrl} alt={merchantDetails[item.merchantId].name} style={{ width: '100%' }} />
                                                    </Col>
                                                    <Col span={12}>
                                                        <Title heading={5}>{merchantDetails[item.merchantId].name}</Title>
                                                        <p><strong>地址: </strong>{merchantDetails[item.merchantId].address}</p>
                                                        <p><strong>电话: </strong>{merchantDetails[item.merchantId].phone}</p>
                                                    </Col>
                                                </Row>
                                            ) : (
                                                <Spin />
                                            )}
                                        </Card>
                                    </Col>
                                    <Col span={12} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                        <Comment
                                            style={{width : '100%'}}
                                            author={`用户${item.userId}`}
                                            avatar={<Avatar src={user.imageUrl} />}
                                            content={item.content}
                                            datetime={new Date(item.createdAt).toLocaleString()}
                                            actions={[
                                                <Rate disabled value={item.rating} />,
                                                <div style={{display : 'flex', justifyContent : 'flex-end'}}>
                                                    <Button size="small" type="text" onClick={() => handleEdit(item)}>编辑</Button>
                                                    <Button size="small" type="text" onClick={() => handleDelete(item.commentId, 'merchant')}>删除</Button>
                                                </div>
                                                
                                            ]}
                                        />
                                    </Col>
                                </Row>
                            </List.Item>
                        )}
                    />
                </Tabs.TabPane>
                <Tabs.TabPane key="product-comments" title="商品评论">
                    <List
                        dataSource={productComments}
                        render={(item, index) => (
                            <List.Item key={index} className={styles['comment-item']}>
                                <Row gutter={16} style={{display : 'flex', alignItems: 'stretch'}}>
                                    <Col span={12}>
                                        <Card
                                            onClick={() => navigate(`/tourist/product/${item.productId}`)}
                                        >
                                            {productDetails[item.productId] ? (
                                                <Row gutter={16}>
                                                    <Col span={12}>
                                                        <img src={productDetails[item.productId].imageUrl} alt={productDetails[item.productId].productName} style={{ width: '100%' }} />
                                                    </Col>
                                                    <Col span={12}>
                                                        <Title heading={5}>{productDetails[item.productId].productName}</Title>
                                                        <p><strong>地址: </strong>{productDetails[item.productId].price}</p>
                                                        <p><strong>电话: </strong>{productDetails[item.productId].description}</p>
                                                    </Col>
                                                </Row>
                                            ) : (
                                                <Spin />
                                            )}
                                        </Card>
                                    </Col>
                                    <Col span={12} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                        <Comment
                                            style={{width : '100%'}}
                                            author={`用户${item.userId}`}
                                            avatar={<Avatar src={user.imageUrl} />}
                                            content={item.content}
                                            datetime={new Date(item.createdAt).toLocaleString()}
                                            actions={[
                                                <Rate disabled value={item.rating} />,
                                                <div style={{display : 'flex', justifyContent : 'flex-end'}}>
                                                    <Button size="small" type="text" onClick={() => handleEdit(item)}>编辑</Button>
                                                    <Button size="small" type="text" onClick={() => handleDelete(item.commentId, 'product')}>删除</Button>
                                                </div>
                                            ]}
                                        />
                                    </Col>
                                </Row>
                            </List.Item>
                        )}
                    />
                </Tabs.TabPane>
            </Tabs>
            </Layout>

            <Footer />

            <Modal
                visible={!!editingComment}
                onCancel={handleCancel}
                onOk={handleSave}
                title="编辑评论"
            >
                <Space direction="vertical" style={{ width: '100%' }}>
                    <TextArea
                        value={newContent}
                        onChange={(value) => setNewContent(value)}
                        rows={4}
                    />
                    <Rate
                        value={newRating}
                        onChange={(value) => setNewRating(value)}
                    />
                </Space>
            </Modal>
        </Layout>
    );
};

export default TouristComment;
