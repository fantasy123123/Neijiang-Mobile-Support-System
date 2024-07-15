// @ts-ignore
import React, {useEffect, useState } from "react";
import Vditor from "vditor";
import "vditor/dist/index.css";
import {Button, Layout, Message, Modal, Select} from "@arco-design/web-react";
import Footer from "./Footer";
import Header from "./Header";
import {Input} from "@arco-design/web-react/lib";
import axiosInstance from "../../../Resquest/axiosInstance";
import {marked} from "marked";
import {useDispatch, useSelector} from "react-redux";
import { setEditedArticle, clearEditedArticle } from '../../../store/articleSlice'
import {useNavigate} from "react-router-dom";

interface Category {
    // Define your category structure here
    categoryId: number;
    categoryName: string;
    // Add more fields as per your API response
}

const TouristArticleEdit = () => {
    const navigate = useNavigate();
    const [vd, setVd] = useState<Vditor>();
    const [category , setCategory] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<Category>(null);
    const [modalVisible, setModalVisible] = useState(false);
    // @ts-ignore
    const {title, content} = useSelector(state => state.article);
    const dispatch = useDispatch();
    const [saving, setSaving] = useState(true);
    const [vdContent, setVdContent] = useState("");

    const handleUploadArticle = async ()=>{
        const uploadArticle ={
            title: title,
            content: vdContent,
            categoryId: selectedCategory.categoryId,
            authorId: Number(localStorage.getItem('accountId'))
        }
        try{
            const response = await axiosInstance.post('/articles', uploadArticle);
            if(response.status === 200){
                Message.info('上传成功')
                dispatch(clearEditedArticle())
                vd.setValue('');
            }
        }catch{
            Message.error('上传失败')
        }finally {
            setModalVisible(false);
        }
    }

    useEffect(() => {
        console.log('title', title);
        console.log('content', content);
    }, [title, content]);

    useEffect(()=>{
        console.log('vdContent', vdContent)
        dispatch(setEditedArticle({
            title: title,
            content: vdContent,
        }));
    }, [vdContent])

    useEffect(() => {
        setVdContent(content);
        const fetchData = async()=>{
            try{
                const categoryResponse =
                    await axiosInstance.get('/articles/categories')
                setCategory(categoryResponse.data.data);
            }catch{
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const vditor = new Vditor("vditor", {
            after: () => {
                vditor.setValue(content || '');
                setVd(vditor);
            },
            input: (str)=>{
                setVdContent(str);
            },
            minHeight: 630,
            theme: 'classic',
            placeholder: '分享你的体验',
            upload: {
                linkToImgUrl: 'http://localhost:8090/articles/images'
            }
        });
        // Clear the effect
        return () => {
            vd?.destroy();
            setVd(undefined);
        };
    }, []);

    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return (
        <Layout style={{
            "width" : "100%",
            "backgroundColor": "#ffffff",
        }}>
            <Header/>
            <div style={{
                margin: "12px 12px 12px 0",
                display: "flex",
                justifyContent: "space-between",
            }}>
                <Input
                    style={{
                        border: "1px solid #ccc",
                        width: 350,
                    }}
                    placeholder={'请输入文章标题'}
                    prefix={'文章标题'}
                    value={title}
                    onChange={(value)=>{
                        dispatch(setEditedArticle({
                            title: value,
                            content: vd.getValue(),
                        }));
                        setSaving(false);
                    }}
                />
                <div style={{
                    border: "1px solid #ccc",
                    padding: "2px",
                    borderRadius: "5px",
                    backgroundColor: "#ffffff",
                    display: "inline-block",
                    margin: "0 0 0 12px",
                }}>
                    文章分类:
                    {
                        <Select
                            style={{
                                width: 150,
                            }}
                            placeholder={'选择文章分类'}
                            onChange={(value)=>{
                                setSelectedCategory(value);
                            }}
                        >
                        {
                            category.map((item, index) => (
                                <Select.Option key={item.categoryId}
                                               value={item}>
                                    {item.categoryName}
                                </Select.Option>
                            ))
                        }
                        </Select>
                    }
                </div>
                {/*<Button*/}
                {/*    style={{*/}
                {/*        margin: '0 0 0 12px',*/}
                {/*        border: "1px solid #ccc",*/}
                {/*    }}*/}
                {/*    size={'large'}*/}
                {/*    onClick={()=>{*/}
                {/*        setSaving(true);*/}
                {/*    }}*/}
                {/*>*/}
                {/*    保存*/}
                {/*</Button>*/}
                <Button
                    style={{
                        margin: '0 0 0 12px',
                        border: "1px solid #ccc",
                        marginLeft: 'auto'
                    }}
                    onClick={()=>{
                        if(!selectedCategory){
                            Message.error('请选择文章类别');
                            return;
                        }
                        if(!title){
                            Message.error('请输入文章标题');
                            return;
                        }
                        // console.log(typeof vd.getValue(), vd.getValue().length, vd.getValue());
                        //vd.getValue string 默认长度为1 或许是个空字符
                        if(!vd.getValue() || vd.getValue().length < 2){
                            Message.error('文章内容不能为空')
                            return;
                        }
                        //直接赋值不行
                        let contentStr = vd.getValue();
                        setModalVisible(true);
                    }}
                    size={'large'}>
                    上传文章
                </Button>
            </div>
            <Modal
                style={{width:'60%'}}
                onCancel={() => setModalVisible(false)}
                visible={modalVisible}
                title={title}
                okText={'确认上传'}
                onOk={()=>{
                    handleUploadArticle();
                }}
            >
                {/*@ts-ignore*/}
                <div dangerouslySetInnerHTML={{__html: marked(vdContent)}}/>
            </Modal>
            <Layout style={{paddingTop: "12px 12px 12px 12px"}}>
                <div  id="vditor" className="vditor"/>
            </Layout>
            <Footer/>
        </Layout>
    )
};

export default TouristArticleEdit
