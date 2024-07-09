import {Card, Descriptions, Input, Modal, Popover, Rate, Tooltip, Upload} from "@arco-design/web-react";
import {useState} from "react";

const TouristCommentShops=()=>{
    const [ifEdit,setIfEdit] = useState(false);
    const [ifVisible,setIfVisible] = useState(false);
    const [commentData,setCommentData]=useState({
        shop:'商户名称',
        rate:'4.5',
        text:'本用户评论的文字',
        time:'2022-01-01 12:00:00'
    })
    const column = [
        {
            label: '评分',
            value: commentData.rate,
        },
        {
            label: '评论详情',
            value: commentData.text,
        },
        {
            label: '评价时间',
            value: commentData.time,
        },
    ];
    return (
        <div style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <div style={{width: "90%", height: '90%'}}>
                <div style={{fontSize: 25, fontWeight: 'bold', color: '#165DFF', textAlign: 'center'}}>
                    评价商户
                </div>
                <div style={{width: '100%', display: 'flex', justifyContent: 'space-around', marginTop: '3%'}}>
                    <Popover content="点击查看商户详情" position="top">
                        <Card

                            onClick={()=>{}}//TODO: 跳转到商户详情页面
                            style={{width: '28%'}}
                            title={commentData.shop}
                            className='card-custom-hover-style'
                            hoverable
                        >
                            <Descriptions
                                column={1}
                                size={'large'}
                                style={{display: 'block'}}
                                title='你的评价'
                                data={column}
                                labelStyle={{textAlign: 'right'}}
                            />
                            <button
                                style={{
                                    width: '100%',
                                    height: '30px',
                                    backgroundColor: '#165DFF',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px'
                                }}
                                onClick={() => {
                                    setIfEdit(true)
                                }}
                            >
                                修改评论内容
                            </button>
                            <Modal
                                title='修改评论内容'
                                unmountOnExit={true}
                                maskClosable={false}
                                visible={ifEdit}
                                onOk={() => {
                                    setIfEdit(false)
                                }}
                                onCancel={() => {
                                    setIfEdit(false)
                                }}
                                autoFocus={false}
                            >
                                <div style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
                                    <div style={{width: '27%'}}>
                                        <div style={{
                                            height: 50,
                                            width: '100%',
                                            justifyContent: 'right',
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>
                                            打分
                                        </div>
                                        <div style={{
                                            height: 50,
                                            width: '100%',
                                            justifyContent: 'right',
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>
                                            您的评论
                                        </div>
                                    </div>
                                    <div style={{width: '65%'}}>
                                        <div style={{
                                            height: 50,
                                            width: '100%',
                                            justifyContent: 'left',
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>
                                            <Rate
                                                defaultValue={commentData.rate}
                                                onChange={(value) => {
                                                    setCommentData({ ...commentData, rate: value })
                                                }}
                                            />
                                        </div>
                                        <div style={{
                                            height: 50,
                                            width: '100%',
                                            justifyContent: 'left',
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>
                                            <Input.TextArea
                                                defaultValue={commentData.text}
                                                onChange={value=>{setCommentData({...commentData,text:value})}}
                                                style={{width:'90%',marginTop:10}}
                                                autoSize={{minRows:2,maxRows:3}}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Modal>
                        </Card>
                    </Popover>
                </div>
            </div>
        </div>
    )
}

export default TouristCommentShops