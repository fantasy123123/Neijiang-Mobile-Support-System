import React, {useState, useEffect} from "react";
import {
    Empty,
    Layout,
    Modal,
    Card,
    Link,
    Avatar,
    Space,
    Typography,
    Button,
    Message,
    Switch,
    Menu, Dropdown, Select
} from "@arco-design/web-react";
import axiosInstance from "../../../Resquest/axiosInstance";
import {marked} from 'marked'
import {format} from 'date-fns'
import { useNavigate } from 'react-router-dom';
import Footer from "./Footer";
import Header from "./Header";
import NetworkError from "../../../common/error";
const {Meta} = Card;
const { Title } = Typography;

const TouristArticle = () => {
    const navigate = useNavigate();
    const [articles , setArticles] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const [modalArticle , setModalArticle] = useState({
        'title': '',
        'parseContent': ''
    });
    const [loading, setLoading] = useState(true);
    const [onlyFriend, setOnlyFriend] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(undefined);
    const [category, setCategory] = useState([]);
    const [filterArticles, setFilterArticles] = useState([]);

    useEffect(()=>{
        setFilterArticles(
            articles.filter(article =>
                (!onlyFriend || article.isFriend) &&
                (!selectedCategory || article.categoryName === selectedCategory)
        ));
        console.log('selectedCategory',selectedCategory)
        console.log('onlyFriend',onlyFriend)
    },[selectedCategory, onlyFriend]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const friendList = await
                    axiosInstance.get(`/users/friends/${localStorage.getItem('accountId')}`)
                        .catch(()=>{Message.error('Failed to fetch userInfo');setLoading(false)});
                const friendIdList = friendList.data.data.map(item => item.friendId);
                const response =
                    await axiosInstance.get('/articles')
                        .catch(()=>{Message.error('Failed to fetch article');setLoading(false)});
                const articleList = response.data.data;
                const categoryResponse =
                    await axiosInstance.get('/articles/categories')
                        .catch(()=>{Message.error('Failed to fetch article categories');setLoading(false)});
                setCategory(categoryResponse.data.data);
                // console.log(dropList)
                // 遍历文章列表，为每篇文章获取作者信息
                const updatedArticles = await Promise.all(
                    articleList.map(async (article) => {
                        // 格式化创建日期
                        const formattedDate = format(new Date(article.createdAt), 'yyyy-MM-dd HH:mm');
                        if(article.authorId === 1){
                            return {
                                ...article,
                                authorName:  '管理员',
                                authorImageUrl: 'https://mobile-support-platform.oss-cn-chengdu.aliyuncs.com/user/admin.png' ,
                                createdAt: formattedDate,
                                userId: 0,
                                isFriend: false,
                                firstParagraphAndIsOmitted: getFirstParagraphAndIsOmitted(article.content),
                            }
                        }else{
                            const authorResponse =
                                await axiosInstance.get(`/users/accounts/${article.authorId}`)
                                    .catch(()=>{Message.error('Failed to fetch author');setLoading(false)});
                            const authorData = authorResponse.data.data;
                            // 返回一个新的文章对象，添加 authorName 和 authorImageUrl 属性
                            // console.log(authorData.userId)
                            // console.log(friendIdList.includes(authorData.userId))
                            return {
                                ...article,
                                authorName:  authorData.name,
                                authorImageUrl: authorData.imageUrl,
                                createdAt: formattedDate,
                                userId: authorData.userId,
                                isFriend: friendIdList.includes(authorData.userId),
                                firstParagraphAndIsOmitted: getFirstParagraphAndIsOmitted(article.content),
                            };
                        }
                    })
                );

                // 更新文章列表状态
                setArticles(updatedArticles);
                setFilterArticles(updatedArticles)
                console.log('updatedArticles', updatedArticles);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchArticles();
    },[])

    const getFirstParagraphAndIsOmitted = (content, length = 100) => {
        const htmlContent = marked(content); // 将 Markdown 转换为 HTML
        // console.log(htmlContent);
        const match = htmlContent.match(/<p>(.*?)<\/p>/s); // 匹配第一个 <p> 标签的内容
        let firstParagraph = match ? match[1] : htmlContent;
        let isOmitted = false;
        // console.log(match);
        if (firstParagraph.length > length) {
            isOmitted = true;
            firstParagraph = firstParagraph.substring(0, length) + '...';
        }
        else if(content.length > 100){
            isOmitted = true;
        }
        // console.log(firstParagraph) 
        return {'firstParagraph':firstParagraph, 'isOmitted':isOmitted};
    };

    const handleLinkClick = (article)=>{
        setModalArticle({
            ...article,
            'parseContent': marked(article.content)
        });
        setModalVisible(true)
    }

    return (
        <Layout style={{
            width : "100%",
            backgroundColor : "#fbfbfb",
            overflow : 'auto'
        }}>
            <Header />
            <Layout style={{ paddingLeft: 24, paddingRight: 24 }}>
                <span>
                    <Title heading={2}>社区文章</Title>
                    <div style={{display: 'flex', width: '100%', justifyContent: 'end', alignItems: 'center', marginBottom: "10px"}}>
                        <div style={{
                            border: "1px solid #ccc",
                            padding: "2px",
                            borderRadius: "5px",
                            backgroundColor: "#ffffff",
                            display: "inline-block",
                        }}>
                            文章分类: 
                            <Select
                                allowClear
                                style={{
                                    width: 150,
                                    marginLeft: 5
                                }}
                                placeholder={'选择文章分类'}
                                    onChange={(value)=>{
                                        setSelectedCategory(value);
                                    }}>
                                {
                                    category.map((item, index) => (
                                        <Select.Option key={item.categoryId} value={item.categoryName}>{item.categoryName}</Select.Option>
                                    ))
                                }
                            </Select>
                        </div>
                        <Switch style={{margin: "0 12px 0" }} uncheckedText={'仅查看好友'} checkedText={'仅查看好友'}
                            onChange={()=> {
                                setOnlyFriend(!onlyFriend);
                            }}
                        />
                        <Button onClick={()=>navigate('/tourist/article/edit')} type="outline">编辑文章</Button>
                    </div>
                </span>
                
                {
                    !loading ? <NetworkError/> :
                        (
                            filterArticles.length > 0 ?
                                (
                                    filterArticles.map(article => (
                                        <Card style={{ margin: "0 0 12px", backgroundColor: '#fff' }}
                                            key={article.articleId} title={
                                            <>
                                                {article.title}
                                                <Typography.Text code style={{margin: '0 10px'}}>{article.categoryName}</Typography.Text>
                                                {article.isFriend ? <Typography.Text code>好友创作</Typography.Text> : null}
                                            </>
                                        }>
                                            <div style={{display: 'inline'}}>
                                                <div dangerouslySetInnerHTML={{ __html: marked(article.firstParagraphAndIsOmitted.firstParagraph) }} />
                                            </div>
                                            <Meta
                                                avatar={
                                                    <Space>
                                                        <Avatar size={28}>
                                                            <img src={article.authorImageUrl}/>
                                                        </Avatar>
                                                        <Typography>{article.authorName}
                                                            <Typography.Text type="secondary" style={{ margin: '0 5px'}}> 发布于 </Typography.Text>
                                                            {article.createdAt}
                                                        </Typography>
                                                        {article.firstParagraphAndIsOmitted.isOmitted ?  <Link onClick={() => handleLinkClick(article)}>查看详情</Link> : null}
                                                    </Space>
                                                }
                                            />
                                        </Card>
                                    ))
                                ) : (
                                    <Empty/>
                                )
                        )
                }
                <Modal
                    visible={modalVisible}
                    onCancel={()=> setModalVisible(false)}
                    title={modalArticle.title}
                    style={{ width: '80%' }} // 设置Modal的宽度
                    bodyStyle={{ maxHeight: '70vh', overflowY: 'auto' }} // 设置Modal的高度和滚动
                    footer={null}
                >
                    <div dangerouslySetInnerHTML={{ __html: modalArticle.parseContent}} />
                </Modal>
            </Layout>
            <Footer/>
        </Layout>
    )
}

export default TouristArticle;