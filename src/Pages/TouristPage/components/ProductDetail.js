import React, { useEffect, useState } from "react";
import {
    Layout,
    Card,
    Space,
    Typography,
    Message,
    Spin,
    Grid,
    Button,
    Comment,
    Input,
    Rate,
    List,
} from "@arco-design/web-react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../Resquest/axiosInstance";
import Footer from "./Footer";
import Header from "./Header";
import styles from "./ProductDetail.module.css";
import { useUser } from "../../../Context/UserContext";

const { Content } = Layout;
const { Title, Text } = Typography;
const { Row, Col } = Grid;
const { TextArea } = Input;

const ProductDetail = () => {
    const { productId } = useParams();
    const { user, setUser } = useUser();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [commentContent, setCommentContent] = useState("");
    const [commentRating, setCommentRating] = useState(0);
    const [favoriteId, setFavoriteId] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        axiosInstance
            .get(`/products/${productId}`)
            .then((res) => {
                setProduct(res.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(
                    `Failed to fetch product details for ID ${productId}:`,
                    error
                );
                Message.error("Failed to fetch product details");
                setLoading(false);
            });

        // 获取评论
        axiosInstance
            .get(`comments/product_comments/products/${productId}`)
            .then((res) => {
                setComments(res.data.data);
            })
            .catch((error) => {
                console.error("Failed to fetch comments:", error);
                Message.error("Failed to fetch comments");
            });

        // 检查是否已收藏
        axiosInstance
            .get(`/users/favorite_products/${user.userId}/${productId}`)
            .then((res) => {
                let result = res.data.data;
                if (result != 0){
                    setFavoriteId(result);
                    setIsFavorite(true);
                } else {
                    setIsFavorite(false);
                }
            })
            .catch((error) => {
                console.error("Failed to check favorite status:", error);
                Message.error("Failed to check favorite status");
            });
            
    }, [productId]);

    const handleCommentSubmit = () => {
        if (commentContent && commentRating) {
            const newComment = {
                productId,
                userId: user.userId,
                content: commentContent,
                rating: commentRating,
                createdAt: new Date().toISOString(),
            };

            axiosInstance
                .post("/comments/product_comments", newComment)
                .then((res) => {
                    setComments([...comments, newComment]);
                    setCommentContent("");
                    setCommentRating(0);
                    Message.success("Comment added successfully");
                })
                .catch((error) => {
                    console.error("Failed to add comment:", error);
                    Message.error("Failed to add comment");
                });
        } else {
            Message.error("Please enter content and rating for the comment");
        }
    };

    const handleFavoriteToggle = () => {
        if (isFavorite) {
            axiosInstance
                .delete(`/users/favorite_products/${favoriteId}`)
                .then(() => {
                    setIsFavorite(false);
                    Message.success("Removed from favorites");
                })
                .catch((error) => {
                    console.error("Failed to remove from favorites:", error);
                    Message.error("Failed to remove from favorites");
                });
        } else {
            axiosInstance
                .post("/users/favorite_products", {
                    userId: user.userId,
                    productId: productId,
                })
                .then(() => {
                    setIsFavorite(true);
                    Message.success("Added to favorites");
                })
                .catch((error) => {
                    console.error("Failed to add to favorites:", error);
                    Message.error("Failed to add to favorites");
                });
        }
    };

    return (
        <Layout className={styles['whole-page']} style={{ height: '100vh', overflow: 'auto' }}>
            <Header />

            <Layout style={{ padding: "0 24px 24px" }}>
                <Content style={{ padding: "24px", margin: "0", minHeight: 280 }}>
                    {loading ? (
                        <Spin
                            style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            Loading...
                        </Spin>
                    ) : product ? (
                        <Card className={styles['product-info-card']}>
                            <div className={styles['product-title']}>{product.productName}</div>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <img
                                        className={styles['product-img']}
                                        src={product.imageUrl}
                                        alt={product.productName}
                                        style={{ width: "100%" }}
                                    />
                                </Col>
                                <Col span={12}>
                                    <Space direction="vertical" size="large" style={{ width: "100%" }}>
                                        <Text className={styles['product-info']}>
                                            <strong>商品名: </strong> {product.productName}
                                        </Text>
                                        <Text className={styles['product-info']}>
                                            <strong>商品类别: </strong> {product.categoryName}
                                        </Text>
                                        <Text className={styles['product-info']}>
                                            <strong>商品售价: </strong> {product.price}
                                        </Text>
                                        <Text className={styles['product-info']}>
                                            <strong>商品描述: </strong> {product.description}
                                        </Text>
                                        
                                        <div className={styles['right-button-container']}>
                                            <Button
                                                type={isFavorite ? "primary" : "default"}
                                                onClick={handleFavoriteToggle}
                                            >
                                                {isFavorite ? "取消收藏" : "收藏"}
                                            </Button>
                                        </div>
                                    </Space>
                                </Col>
                            </Row>
                        </Card>
                    ) : (
                        <Message type="error">Product not found</Message>
                    )}

                    <div className={styles['comments-section']}>
                        <div className={styles['comment-form']}>
                            <Title className="add-comment-title" heading={4}>
                                添加评论
                            </Title>
                            <Space direction="vertical" style={{ width: "100%" }}>
                                <TextArea
                                    className="comment-text-area"
                                    placeholder="输入评论内容"
                                    value={commentContent}
                                    onChange={(value) => setCommentContent(value)}
                                />
                                <Rate
                                    value={commentRating}
                                    onChange={(value) => setCommentRating(value)}
                                />
                                <div className={styles['right-button-container']}>
                                    <Button type="primary" onClick={handleCommentSubmit}>
                                        提交评论
                                    </Button>
                                </div>
                            </Space>
                        </div>

                        <Title heading={3}>评论</Title>
                        <List
                            dataSource={comments}
                            render={(item, index) => (
                                <List.Item key={index} className={styles['comment-item']}>
                                    <Comment
                                        author={item.name}
                                        avatar={item.imageUrl}
                                        content={item.content}
                                        datetime={new Date(item.createdAt).toLocaleString()}
                                        actions={[<Rate disabled value={item.rating} />]}
                                    />
                                </List.Item>
                            )}
                        />

                    </div>
                </Content>
            </Layout>
            <Footer />
        </Layout>
    );
};

export default ProductDetail;
