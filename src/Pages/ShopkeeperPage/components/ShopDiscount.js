import {Button, Card, Input,DatePicker,Message, Modal,} from "@arco-design/web-react";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosInstance from "../../../api/AxiosApi";
import {IconInfoCircle} from "@arco-design/web-react/icon";
import {dayjs} from "@arco-design/web-react/es/_util/dayjs";

const ShopDiscount=()=>{
    const navigate=useNavigate()
    const merchantId=useLocation().state
    const [data,setData]=useState([])
    const [editObject,setEditObject]=useState({})
    const [ifAdd,setIfAdd]=useState(false)
    const [ifEdit,setIfEdit]=useState(false)

    useEffect(()=>{
        axiosInstance.get('/merchants/promotions/'+merchantId).then(
            res=>{
                setData(res.data.data)
            }
        ).catch(
            err=>{
                console.log(err)
            }
        )
    },[])

    function CardList(){
         return data.map((value,index)=>{
             return  <Card
                 style={{width:'31.2%',margin:'1%'}}
                 title={value.details}
                 hoverable
                 extra={value.startDate+' ~ '+value.endDate}
             >
                 <span>促销活动编号：{value.promotionId}</span><br/>
                 <span>说明：{value.details}</span><br/>
                 <span>创建时间：{value.createdAt}</span><br/>
                 <div style={{display:'flex',justifyContent:'right',marginTop:10}}>
                     <Button
                         type={"outline"}
                         onClick={()=>{
                             setEditObject(value)
                             setIfEdit(true)
                         }}
                     >
                         修改
                     </Button>
                     <Button
                         status={"danger"}
                         style={{marginLeft:20,border:'#F53F3F 1px solid'}}
                         onClick={()=>{
                             if(window.confirm('确认删除？')){
                                 axiosInstance.delete('/merchants/promotions/'+value.promotionId).then(
                                     res=>{
                                         Message.info('删除成功！')
                                         setData([...data.filter(item=>item!==value)])
                                     }
                                 ).catch(
                                     err=>{
                                         Message.error('删除失败！')
                                     }
                                 )
                             }
                         }}
                     >
                         删除
                     </Button>
                 </div>
             </Card>
         })
    }

    return <div style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
        <div style={{width:"90%",height:'90%'}}>
            <div style={{fontSize:25,fontWeight:'bold',color:'#165DFF',textAlign:'center'}}>
                折扣活动管理
            </div>
            <div style={{width:'90%',background:'white',marginLeft:'5%',marginTop:'2%',borderRadius:10,border:'1px solid grey',height:'80%',overflow:'auto'}}>
                <Button
                    style={{marginRight:30,marginTop:20,float:'right',marginBottom:10}}
                    type={'primary'}
                    size={"large"}
                    onClick={()=>{setIfAdd(true)}}
                >
                    新增
                </Button>
                <div
                    style={{
                        width:'94%',
                        marginLeft:'3%',
                        display:'flex',
                        flexWrap:'wrap'
                    }}>
                    <CardList />
                </div>
                <Modal
                    title='新增折扣活动'
                    unmountOnExit={true}
                    maskClosable={false}
                    visible={ifAdd}
                    onOk={() => {
                        axiosInstance.post('/merchants/promotions',{
                            ...editObject,merchantId:merchantId
                        }).then(
                            res=>{
                                setEditObject({})
                                setIfAdd(false)
                                Message.info('添加成功！')
                                axiosInstance.get('/merchants/promotions/'+merchantId).then(
                                    res=>{
                                        setData(res.data.data)
                                    }
                                ).catch(
                                    err=>{
                                        Message.error('更新信息失败！')
                                    }
                                )
                            }
                        ).catch(
                            err=>{
                                Message.error('添加失败！')
                            }
                        )
                    }}
                    onCancel={() => {
                        setEditObject({})
                        setIfAdd(false)
                    }}
                    autoFocus={false}
                >
                    <div style={{display:'flex',width:'100%',justifyContent:'space-between'}}>
                        <div style={{width:'20%'}}>
                            <div style={{height:50,width:'100%',justifyContent:'right',display:'flex',alignItems:'center'}}>
                                起止时间
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'right',display:'flex',alignItems:'center'}}>
                                说明
                            </div>
                        </div>
                        <div style={{width:'75%'}}>
                            <div style={{height:50,width:'100%',justifyContent:'left',display:'flex',alignItems:'center'}}>
                                <DatePicker.RangePicker
                                    style={{ width: '90%'}}
                                    prefix={<IconInfoCircle />}
                                    onChange={(value)=>{
                                        setEditObject({...editObject,startDate:value[0],endDate:value[1]})
                                    }}
                                    shortcuts={[
                                        {
                                            text: '接下来七天',
                                            value: () => [dayjs(), dayjs().add(1, 'week')],
                                        },
                                        {
                                            text: '接下来14天',
                                            value: () => [dayjs(), dayjs().add(2, 'week')],
                                        },
                                        {
                                            text: '接下来30天',
                                            value: () => [dayjs(), dayjs().add(1, 'month')],
                                        },
                                    ]}
                                />
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'left',display:'flex',alignItems:'center'}}>
                                <Input.TextArea
                                    autoSize={{ minRows: 1, maxRows: 2 }}
                                    onChange={value=>{setEditObject({...editObject,details:value})}}
                                    style={{width:'90%'}}
                                />
                            </div>
                        </div>
                    </div>
                </Modal>
                <Modal
                    title='修改折扣活动'
                    unmountOnExit={true}
                    maskClosable={false}
                    visible={ifEdit}
                    onOk={() => {
                        axiosInstance.put('/merchants/promotions',{
                            ...editObject,merchantId:merchantId
                        }).then(
                            res=>{
                                setEditObject({})
                                setIfEdit(false)
                                Message.info('修改成功！')
                                axiosInstance.get('/merchants/promotions/'+merchantId).then(
                                    res=>{
                                        setData(res.data.data)
                                    }
                                ).catch(
                                    err=>{
                                        Message.error('更新信息失败！')
                                    }
                                )
                            }
                        ).catch(
                            err=>{
                                Message.error('修改失败！')
                            }
                        )
                    }}
                    onCancel={() => {
                        setEditObject({})
                        setIfEdit(false)
                    }}
                    autoFocus={false}
                >
                    <div style={{display:'flex',width:'100%',justifyContent:'space-between'}}>
                        <div style={{width:'20%'}}>
                            <div style={{height:50,width:'100%',justifyContent:'right',display:'flex',alignItems:'center'}}>
                                起止时间
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'right',display:'flex',alignItems:'center'}}>
                                说明
                            </div>
                        </div>
                        <div style={{width:'75%'}}>
                            <div style={{height:50,width:'100%',justifyContent:'left',display:'flex',alignItems:'center'}}>
                                <DatePicker.RangePicker
                                    style={{ width: '90%'}}
                                    prefix={<IconInfoCircle />}
                                    defaultValue={[editObject.startDate,editObject.endDate]}
                                    onChange={(value)=>{
                                        setEditObject({...editObject,startDate:value[0],endDate:value[1]})
                                    }}
                                    shortcuts={[
                                        {
                                            text: '接下来七天',
                                            value: () => [dayjs(), dayjs().add(1, 'week')],
                                        },
                                        {
                                            text: '接下来14天',
                                            value: () => [dayjs(), dayjs().add(2, 'week')],
                                        },
                                        {
                                            text: '接下来30天',
                                            value: () => [dayjs(), dayjs().add(1, 'month')],
                                        },
                                    ]}
                                />
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'left',display:'flex',alignItems:'center'}}>
                                <Input.TextArea
                                    autoSize={{ minRows: 1, maxRows: 2 }}
                                    defaultValue={editObject.details}
                                    onChange={value=>{setEditObject({...editObject,details:value})}}
                                    style={{width:'90%'}}
                                />
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
            <Button
                size={"large"}
                style={{border:'1px solid #FF7D00',marginTop:15,float:'right',marginRight:'5%'}}
                onClick={()=>{navigate('/shopkeeper/shopInformation')}}
                status={'warning'}
            >
                返回
            </Button>
        </div>
    </div>
}

export default ShopDiscount