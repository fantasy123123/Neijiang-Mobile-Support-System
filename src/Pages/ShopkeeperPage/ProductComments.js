import {useEffect, useRef, useState} from "react";
import axiosInstance from "../../api/AxiosApi";
import {Button, Input, List, Comment, Modal, Rate, Table, Card} from "@arco-design/web-react";
import {IconHeart, IconHeartFill, IconSearch} from "@arco-design/web-react/icon";
import avatar from './images/initPerson.png'
import './ShopkeeperPage.css'
import async from "async";

const ProductComments=()=>{
    const [productData,setProductData]=useState([])
    const inputRef1 = useRef(null);
    const [ifView,setIfView]=useState(false)
    const [viewObject,setViewObject]=useState({})
    const [likes, setLikes] =useState([]);

    useEffect(()=>{
        axiosInstance.get('/products/merchants/accountId/'+localStorage.getItem('accountId')).then(
            async res=>{
                await res.data.data.forEach(value => {
                    likes.push(false)
                    axiosInstance.get('/comments/product_comments/products/'+value.productId).then(
                        res=>{
                            productData.push({
                                name:value.productName,
                                description:value.description,
                                category:value.categoryName,
                                price:value.price,
                                comments:res.data.data
                            })
                        }
                    ).catch(
                        err=>{
                            console.log(err)
                        }
                    )
                })
                setProductData([...productData])
                setLikes([...likes])
            }
        ).catch(
            err=>{
                console.log(err)
            }
        )
    },[])

    const column=[
        {
            title: '商品名称',
            dataIndex: 'name',
            filterIcon: <IconSearch />,
            filterDropdown: ({ filterKeys, setFilterKeys, confirm }) => {
                return (
                    <div className='arco-table-custom-filter'>
                        <Input.Search
                            style={{width:150}}
                            ref={inputRef1}
                            searchButton
                            value={filterKeys[0] || ''}
                            onChange={(value) => {
                                setFilterKeys(value ? [value] : []);
                            }}
                            onSearch={() => {
                                confirm();
                            }}
                        />
                    </div>
                );
            },
            onFilter: (value, row) => (value ? row.name.indexOf(value) !== -1 : true),
            onFilterDropdownVisibleChange: (visible) => {
                if (visible) {
                    setTimeout(() => inputRef1.current.focus(), 150);
                }
            },
        },
        {
            title: '商品类型',
            dataIndex: 'category',
        },
        {
            title: '商品描述',
            dataIndex: 'description',
        },
        {
            title: '单价',
            dataIndex: 'price',
            render:(col,record)=><span>{record.price} 元</span>
        },
        {
            title: '平均评分',
            render:(col,record)=>{
                let sum=0;
                record.comments.forEach(value => {
                    sum+=value.rating
                })
                return <Rate allowHalf readonly value={sum/record.comments.length}/>
            },
            sorter: (a, b) => {
                let sumA=0;
                let sumB=0;
                a.comments.forEach(value => {
                    sumA+=value.rating
                })
                b.comments.forEach(value => {
                    sumB+=value.rating
                })
                return sumA/a.comments.length - sumB/a.comments.length
            }
        },
        {
            title: '操作',
            render:(col,record)=>{
                return <Button
                    type={"primary"}
                    onClick={()=>{
                        setIfView(true)
                        setViewObject(record)
                    }}
                >
                    查看所有评价
                </Button>
            }
        },
    ]


    return (
        <div style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <div style={{width:"90%",height:'90%'}}>
                <div style={{fontSize:25,fontWeight:'bold',color:'#165DFF',textAlign:'center'}}>
                    商品评价
                </div>
                <div style={{width:'90%',background:'white',marginLeft:'5%',marginTop:'2%',borderRadius:10,border:'1px solid grey',maxHeight:'90%',overflow:'auto'}}>
                    <Table columns={column} data={productData} style={{marginTop:50,marginLeft:50,marginRight:50,marginBottom:20}}/>
                </div>
                <Modal
                    title={viewObject.name+' 共 '+viewObject.comments?.length+' 条评论'}
                    unmountOnExit={true}
                    visible={ifView}
                    closable={true}
                    footer={null}
                    onCancel={() => {
                        setIfView(false);
                        setViewObject({})
                    }}
                >
                    <List bordered={false} pagination={{ pageSize: 4 }}>
                        {viewObject.comments?.map((item, index) => {
                            return (
                                <List.Item key={item.id} extra={
                                    <button
                                        className='custom-comment-action'
                                        key='heart'
                                        onClick={() => {
                                            likes[index]=!likes[index]
                                            setLikes([...likes])
                                        }}
                                    >
                                        {likes[index] ? (
                                            <IconHeartFill style={{ color: '#f53f3f',fontSize:30}}/>
                                        ) : (
                                            <IconHeart style={{strokeWidth: 2,fontSize:30}}/>
                                        )}
                                    </button>
                                }>
                                    <Comment
                                        author={'用户Id：'+item.userId}
                                        avatar={avatar}
                                        content={item.content}
                                        datetime={item.createdAt}
                                        actions={<div style={{display:"flex",alignItems:'center'}}>
                                            评分：<Rate allowHalf readonly value={item.rating}/>
                                        </div>}
                                    />
                                </List.Item>
                            );
                        })}
                    </List>
                </Modal>
            </div>
        </div>
    )
}

export default ProductComments