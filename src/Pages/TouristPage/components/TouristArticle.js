import {useState, useEffect} from "react";
import {Modal, Card, Link, Avatar, Space, Typography} from "@arco-design/web-react";
import {} from "@arco-design/web-react/icon";
import axiosInstance from "../../../api/AxiosApi";
import {marked} from 'marked'
import {format} from 'date-fns'
const {Meta} = Card;

const TouristArticle = () => {
    const [articles , setArticles] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const [modalArticle , setModalArticle] = useState({
        'title': '',
        'parseContent': ''
    });

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axiosInstance.get('/articles');
                const articleList = response.data.data;

                // 遍历文章列表，为每篇文章获取作者信息
                const updatedArticles = await Promise.all(
                    articleList.map(async (article) => {
                        const authorResponse = await axiosInstance.get(`/users/${article.authorId}`);
                        const authorData = authorResponse.data.data;

                         // 格式化创建日期
                        const formattedDate = format(new Date(article.createdAt), 'yyyy-MM-dd HH:mm');

                        // 返回一个新的文章对象，添加 authorName 和 authorImageUrl 属性
                        return {
                            ...article,
                            authorName:  authorData.name,
                            authorImageUrl: 'https://mobile-support-platform.oss-cn-chengdu.aliyuncs.com/user/' + authorData.imageUrl,
                            createdAt: formattedDate,
                            firstParagraphAndIsOmitted: getFirstParagraphAndIsOmitted(article.content),
                        };
                    })
                );

                // 更新文章列表状态
                setArticles(updatedArticles);
                console.log(updatedArticles);
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
        else if(match.length > 2){
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
        <>
            {articles.map(article => (
                <Card key={article.articleId} title={
                    <>
                        {article.title}
                        <Typography.Text code style={{margin: '0 10px'}}>{article.categoryName}</Typography.Text>
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
            ))}
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
        </>
    )
}

export default TouristArticle;