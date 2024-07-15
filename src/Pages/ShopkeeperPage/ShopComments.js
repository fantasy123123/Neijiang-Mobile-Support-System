import axiosInstance from "../../api/AxiosApi";
import {useEffect, useState} from "react";
import {Descriptions, Input, Rate, Table} from "@arco-design/web-react";
import {IconSearch} from "@arco-design/web-react/icon";

const ShopComments=()=>{
    const [name,setName]=useState('')
    const [shopStar,setShopStar]=useState(0)
    const [shopComments,setShopComments]=useState([])

    useEffect(()=>{
        axiosInstance.get('/merchants/accountId/'+localStorage.getItem('accountId')).then(
            res=>{
                setName(res.data.data.name)
                axiosInstance.get('/users/favorite_merchants/'+res.data.data.merchantId+'/count').then(
                    res=>{
                        setShopStar(res.data.data)
                    }
                ).catch(
                    err=>{
                        console.log(err)
                    }
                )
                axiosInstance.get('/comments/merchant_comments/merchants/'+res.data.data.merchantId).then(
                    res=>{
                        setShopComments(res.data.data)
                    }
                ).catch(
                    err=>{
                        console.log(err)
                    }
                )
            }
        ).catch(
            err=>{
                console.log(err)
            }
        )
    },[])

    const column1 = [
        {
            label: '名称',
            value: name,
        },
        {
            label: '商户收藏数',
            value: shopStar,
        },
    ];

    const column2=[
        {
            title: '评论用户',
            dataIndex: 'userId',
        },
        {
            title: '评论内容',
            dataIndex: 'content',
        },
        {
            title: '评价',
            dataIndex: 'rating',
            render:(col,record)=>{
                return <Rate allowHalf readonly value={record.rating}/>
            },
            sorter: (a, b) => a.rating - b.rating,
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt'
        },
    ]

    return (
        <div style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <div style={{width:"90%",height:'90%'}}>
                <div style={{fontSize:25,fontWeight:'bold',color:'#165DFF',textAlign:'center'}}>
                    商户评价
                </div>
                <div style={{width:'90%',background:'white',marginLeft:'5%',marginTop:'2%',borderRadius:10,border:'1px solid grey',maxHeight:'90%',overflow:'auto'}}>
                    <Descriptions
                        column={3}
                        size={'large'}
                        style={{paddingLeft:100,paddingRight:100,paddingTop:30}}
                        title='商家评价'
                        data={column1}
                        labelStyle={{ textAlign: 'right' }}
                    />
                    <Table columns={column2} data={shopComments} style={{marginTop:10,marginLeft:50,marginRight:50,marginBottom:20}}
                    />
                </div>
            </div>
        </div>
    )
}

export default ShopComments