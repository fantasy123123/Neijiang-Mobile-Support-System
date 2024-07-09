import {Card, Descriptions, Input, Modal, Popover, Rate, Tooltip} from "@arco-design/web-react";
import {useState} from "react";
import {IconHeart, IconHeartFill} from "@arco-design/web-react/icon";

const TouristViewShops=()=>{
    const [ifEdit,setIfEdit] = useState(false);
    const [ifVisible,setIfVisible] = useState(false);
    const [isFavorite,setIsFavorite] = useState(false);
    const [initData,setInitData]=useState({
        name:'名字',
        location:'地点',
        phone:'电话',
        email:'邮件',
        type:'经营类型',
        environment:'经营环境',
        place:'经营场所',
        category:'商品类别',
        image:[
            {
                uid:"1",
                name:'照片',
                url:'//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp'
            },
            {
                uid:"2",
                name:'照片',
                url:'//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp'
            },
            {
                uid:"3",
                name:'照片',
                url:'//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp'
            },
            {
                uid:"4",
                name:'照片',
                url:'//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp'
            },
            {
                uid:"5",
                name:'照片',
                url:'//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp'
            },
        ],
        time:'创建时间'
    })
    const column = [
        {
            label: '商户经营类型',
            value: initData.type,
        },
        {
            label: '商户产品类别',
            value: initData.category,
        },
    ];
    const imageList = initData.image.map((item) => {
        return (
            <img
                key={item.uid}
                src={item.url}
                alt={item.name}
                style={{width: '10%', height: '10%',marginLeft:5}}
            />
        );
    });
    const modalColumn = [
        {
            label: '名称',
            value: initData.name,
        },
        {
            label: '地址',
            value: initData.location,
        },
        {
            label: '电话',
            value: initData.phone,
        },
        {
            label: '电子邮件',
            value: initData.email,
        },
        {
            label: '商户经营类型',
            value: initData.type,
        },
        {
            label: '商户经营环境',
            value: initData.environment
        },
        {
            label: '商户经营场所',
            value: initData.place,
        },
        {
            label: '商户产品类别',
            value: initData.category,
        },
        {
            label: '创建时间',
            value: initData.time,
        },
        {
            label: '照片',
            value: imageList,
        }
    ]
    return (
        <div style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <div style={{width: "90%", height: '90%'}}>
                <div style={{fontSize: 25, fontWeight: 'bold', color: '#165DFF', textAlign: 'center'}}>
                    查看商户信息
                </div>
                <div style={{width: '100%', display: 'flex', justifyContent: 'space-around', marginTop: '3%'}}>
                    <Card
                        style={{width: '28%'}}
                        title={initData.name}
                        hoverable
                    >
                        <Descriptions
                            column={1}
                            size={'large'}
                            style={{display: 'block'}}
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
                            查看商户详情
                        </button>
                        <Modal
                            title='商户详情'
                            unmountOnExit={true}
                            maskClosable={false}
                            visible={ifEdit}
                            onOk={() => {
                                setIfEdit(true)
                                setIfEdit(false)

                            }}
                            onCancel={() => {
                                setIfEdit(false)
                            }}
                            autoFocus={false}
                            style={{width: '60%', height: '50%'}}
                            footer={
                                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <div style={{display: 'flex', justifyContent: 'center'}}>
                                        <button
                                            style={{
                                                backgroundColor: '#165DFF',
                                                borderColor: '#165DFF',
                                                color: 'white',
                                                borderRadius: '5px',
                                                padding: '10px 15px',
                                                marginLeft:'400px'
                                            }}
                                            onClick={() => {
                                                setIfEdit(false)
                                            }}
                                        >
                                            确定
                                        </button>
                                    </div>
                                    <Popover content='收藏商户' position='top'>
                                        <IconHeartFill
                                            style={{
                                                color: isFavorite ? 'red' : 'gray',
                                                cursor: 'pointer',
                                                fontSize: '30px',
                                                marginRight: '10px'
                                        }}
                                            onClick={() => {
                                                setIsFavorite(!isFavorite)
                                            }}
                                        />
                                    </Popover>
                                </div>
                                    }
                        >
                            <div style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
                                <div style={{width: '80%'}}>
                                    <Descriptions
                                        column={3}
                                        size={'large'}
                                        style={{display: 'block'}}
                                        data={modalColumn}
                                        labelStyle={{textAlign: 'right'}}
                                    />
                                </div>
                            </div>
                        </Modal>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default TouristViewShops