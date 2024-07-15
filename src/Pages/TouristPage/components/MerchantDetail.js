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
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../../Resquest/axiosInstance";
import Footer from "./Footer";
import Header from "./Header";
import styles from "./MerchantDetail.module.css"
import { useUser } from "../../../Context/UserContext";

const { Content } = Layout;
const { Title, Text } = Typography;
const { Row, Col } = Grid;
const { TextArea } = Input;

const MerchantDetail = () => {
    const navigate = useNavigate();
    const { merchantId } = useParams();
    const { user, setUser } = useUser();
    const [merchant, setMerchant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [productsCategories, setProductsCategories] = useState([]);
    const [productsMap, setProductsMap] = useState(new Map());
    const [comments, setComments] = useState([]);
    const [commentContent, setCommentContent] = useState("");
    const [commentRating, setCommentRating] = useState(0);
    const [favoriteId, setFavoriteId] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [disableButton, setDisableButton] = useState(true);
    const [isJoinGroup, setIsJoinGroup] = useState(false);
    const [groupInfo, setGroupInfo] = useState(null);
    const [members, setMembers] = useState([]);

    useEffect(() => {
        axiosInstance
            .get(`/merchants/${merchantId}`)
            .then((res) => {
                setMerchant(res.data.data);
                setLoading(false);
                fetchGroupData(res.data.data.ownerId);
            })
            .catch((error) => {
                console.error(
                    `Failed to fetch merchant details for ID ${merchantId}:`,
                    error
                );
                Message.error("Failed to fetch merchant details");
                setLoading(false);
            });

        // 获取所有分类
        axiosInstance
            .get(`/products/categories/merchants/${merchantId}`)
            .then((res) => {
                const categories = res.data.data;
                setProductsCategories(categories);

                // 根据每个分类的ID获取对应的商品信息
                const fetchMerchantInfo = async () => {
                    const newProductsMap = new Map();
                    for (const category of categories) {
                        try {
                            const response = await axiosInstance.get(
                                `products/merchants/${merchantId}/categories/${category.categoryId}`
                            );
                            newProductsMap.set(category, response.data.data);
                        } catch (error) {
                            console.error(
                                `Failed to fetch products for category ${category.categoryId}:`,
                                error
                            );
                            Message.error("Failed to fetch products");
                        }
                    }
                    setProductsMap(newProductsMap);
                };
                fetchMerchantInfo();
            })
            .catch((error) => {
                console.error("Failed to fetch categories:", error);
                Message.error("Failed to fetch categories");
            });

        // 获取评论
        axiosInstance
            .get(`comments/merchant_comments/merchants/${merchantId}`)
            .then((res) => {
                setComments(res.data.data);
            })
            .catch((error) => {
                console.error("Failed to fetch comments:", error);
                Message.error("Failed to fetch comments");
            });
        
        // 检查是否加入群组
        const fetchGroupData = async (ownerId) => {
            try {
                // 获取群组信息
                const groupRes = await axiosInstance.get(`/groups/owners/${ownerId}`);
                const groupData = groupRes.data.data;
                if (!groupData) {
                    setDisableButton(true);
                    return;
                }
                setGroupInfo(groupData);
                setDisableButton(false);
                
                // 获取群组成员信息
                const membersRes = await axiosInstance.get(`/groups/members/${groupData.groupId}`);
                const memberList = membersRes.data.data;
                setMembers(memberList);
                
                // 检查用户是否已经加入群组
                const isMember = memberList.some(member => member.accountId == localStorage.getItem('accountId'));
                setIsJoinGroup(isMember);
            } catch (error) {
                console.error("Failed to get merchant group:", error);
                Message.error("Failed to get merchant group");
            }
        };

        // 检查是否已收藏
        axiosInstance
            .get(`/users/favorite_merchants/${user.userId}/${merchantId}`)
            .then((res) => {
                const result = res.data.data;
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
            
    }, [merchantId]);

    const handleCommentSubmit = () => {
        if (commentContent && commentRating) {
            const newComment = {
                merchantId,
                userId: user.userId,
                content: commentContent,
                rating: commentRating,
                createdAt: new Date().toISOString(),
            };

            axiosInstance
                .post("/comments/merchant_comments", newComment)
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
                .delete(`/users/favorite_merchants/${favoriteId}`)
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
                .post("/users/favorite_merchants", {
                    userId: user.userId,
                    merchantId: merchantId,
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

    const handleJoinGroup = async () => {
        if (!isJoinGroup && groupInfo) {
            try {
                const response = await axiosInstance.post(`/groups/members`, {
                    groupId: groupInfo.groupId,
                    accountId: localStorage.getItem('accountId'),
                    role: '成员'
                });
                if (response.data.status === 'success') {
                    Message.success("Successfully joined the group");
                    setIsJoinGroup(true);
                } else {
                    Message.error("Failed to join the group");
                }
            } catch (error) {
                console.error("Failed to join the group:", error);
                Message.error("Failed to join the group");
            }
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
                    ) : merchant ? (
                        <Card className={styles['merchant-card']}>
                            <div className={styles['merchant-title']}>{merchant.name}</div>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <img
                                        className={styles['merchant-img']}
                                        src={merchant.imageUrl}
                                        alt={merchant.name}
                                        style={{ width: "100%" }}
                                    />
                                </Col>
                                <Col span={12}>
                                    <Space direction="vertical" size="large" style={{ width: "100%" }}>
                                        <Text className={styles['merchant-info']}>
                                            <strong>地址: </strong> {merchant.address}
                                        </Text>
                                        <Text className={styles['merchant-info']}>
                                            <strong>电话: </strong> {merchant.phone}
                                        </Text>
                                        <Text className={styles['merchant-info']}>
                                            <strong>邮箱: </strong> {merchant.email}
                                        </Text>
                                        <Text className={styles['merchant-info']}>
                                            <strong>业务类型: </strong> {merchant.businessType}
                                        </Text>
                                        <Text className={styles['merchant-info']}>
                                            <strong>业务环境: </strong> {merchant.businessEnvironment}
                                        </Text>
                                        <Text className={styles['merchant-info']}>
                                            <strong>业务地点: </strong> {merchant.businessLocation}
                                        </Text>
                                        <Text className={styles['merchant-info']}>
                                            <strong>产品类别: </strong> {merchant.productCategory}
                                        </Text>
                                        <div className={styles['right-button-container']}>
                                            <Button
                                                type={isJoinGroup ? "primary" : "default"}
                                                onClick={handleJoinGroup}
                                                disabled={isJoinGroup}
                                            >
                                                {isJoinGroup ? "已加入群组" : "加入商家群"}
                                            </Button>
                                            <Button
                                                style={{marginLeft : 20}}
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
                        <Message type="error">Merchant not found</Message>
                    )}

                    <Space direction="vertical" size="large" style={{ width: "100%" }}>
                        {productsCategories.map((category) => (
                            <div key={category.categoryId} style={{ marginBottom: "20px" }}>
                                <Title className="product-category-title" heading={2}>{category.categoryName}</Title>
                                <Space wrap size="large" style={{ width: "100%" }}>
                                    {(productsMap.get(category) || []).map((product, index) => (
                                        <Card
                                            key={product.productId}
                                            hoverable
                                            className={styles['product-card']}
                                            cover={
                                                <img alt={product.productName} src={product.imageUrl} 
                                                    onClick={() => navigate(`/tourist/product/${product.productId}`)}
                                                />
                                            }
                                        >
                                            <Card.Meta
                                                title={product.productName}
                                                description={`${product.price} ${product.description}`}
                                            />
                                        </Card>
                                    ))}
                                </Space>
                            </div>
                        ))}
                    </Space>

                    <div className={styles['comments-section']}>
                        <Title heading={3}>评论</Title>
                        <List
                            dataSource={comments}
                            render={(item, index) => (
                                <List.Item key={index} className={styles['comment-item']}>
                                    <Comment
                                        author={`用户${item.userId}`}
                                        avatar="https://via.placeholder.com/40"
                                        content={item.content}
                                        datetime={new Date(item.createdAt).toLocaleString()}
                                        actions={[<Rate disabled value={item.rating} />]}
                                    />
                                </List.Item>
                            )}
                        />

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
                    </div>
                </Content>
            </Layout>
            <Footer />
        </Layout>
    );
};

export default MerchantDetail;
