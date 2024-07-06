import {Button, Input, Modal, Radio, Table} from "@arco-design/web-react";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

const ProductSort=()=> {
    const navigate=useNavigate()
    const columns = [
        {
            title: '商品分类名称',
            dataIndex: 'category'
        },
        {
            title: '所属经营类型',
            dataIndex: 'type'
        },
        {
            title: '说明',
            dataIndex: 'description'
        },
        {
            title: '创建时间',
            dataIndex: 'time'
        },
        {
            title: '创建人',
            dataIndex: 'person'
        },
        {
            title: '是否可用',
            dataIndex: 'ifUse',
            render: (col, record, index) => {
                return <span>{record?'是':'否'}</span>
            }
        },
        {
            title: '操作',
            render: (col, record) => {
                return <Button
                    style={{border:'1px solid #4E5969'}}
                    onClick={()=>{
                        setEditObject(record)
                        setIfEdit(true)
                    }}
                >
                    修改
                </Button>
            }
        }
    ];

    const [data,setData]=useState([
        {
            category:'a',
            type:'type1',
            description:'description',
            time:'time',
            person:'person',
            ifUse:true,
        },
        {
            category:'b',
            type:'type2',
            description:'description',
            time:'time',
            person:'person',
            ifUse:true,
        },
        {
            category:'c',
            type:'type3',
            description:'description',
            time:'time',
            person:'person',
            ifUse:true,
        },
    ])

    const [ifAdd,setIfAdd]=useState(false)
    const [ifEdit,setIfEdit]=useState(false)
    const [editObject,setEditObject]=useState({})

    return (
        <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{width: "90%", height: '90%'}}>
                <div style={{fontSize: 25, fontWeight: 'bold', color: '#165DFF', textAlign: 'center'}}>
                    设置商品分类
                </div>
                <div style={{width:'90%',background:'white',marginLeft:'5%',marginTop:'3%',borderRadius:10,border:'1px solid grey',maxHeight:'82%',overflow:'auto'}}>
                    <Table columns={columns} data={data} style={{padding:30}}/>
                </div>
                <div style={{display:"flex",justifyContent:'right',marginTop:'3%',marginRight:'5%'}}>
                    <Button
                        style={{marginRight:30}}
                        type={'primary'}
                        onClick={()=>{setIfAdd(true)}}
                    >
                        新增
                    </Button>
                    <Button
                        style={{border:'1px solid #FF7D00',marginRight:30}}
                        onClick={()=>{navigate('/shopkeeper/shopInformation')}}
                        status={'warning'}
                    >
                        返回
                    </Button>
                </div>
                <Modal
                    title='新增商品分类'
                    unmountOnExit={true}
                    maskClosable={false}
                    visible={ifAdd}
                    onOk={() => {
                        setIfAdd(false)
                    }}
                    onCancel={() => {
                        setIfAdd(false)
                    }}
                    autoFocus={false}
                >
                    <div style={{display:'flex',width:'100%',justifyContent:'space-between'}}>
                        <div style={{width:'27%'}}>
                            <div style={{height:50,width:'100%',justifyContent:'right',display:'flex',alignItems:'center'}}>
                                商品分类名称
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'right',display:'flex',alignItems:'center'}}>
                                所属经营类型
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'right',display:'flex',alignItems:'center'}}>
                                说明
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'right',display:'flex',alignItems:'center'}}>
                                是否可用
                            </div>
                        </div>
                        <div style={{width:'65%'}}>
                            <div style={{height:50,width:'100%',justifyContent:'left',display:'flex',alignItems:'center'}}>
                                <Input
                                    style={{width:'90%'}}
                                />
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'left',display:'flex',alignItems:'center'}}>
                                <Input
                                    style={{width:'90%'}}
                                />
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'left',display:'flex',alignItems:'center'}}>
                                <Input.TextArea
                                    autoSize={{ minRows: 1, maxRows: 3 }}
                                    style={{width:'90%'}}
                                />
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'left',display:'flex',alignItems:'center'}}>
                                <Radio.Group  defaultValue={'是'} name='button-radio-group'>
                                    {['是','否'].map((item) => {
                                        return (
                                            <Radio key={item} value={item}>
                                                {({ checked }) => {
                                                    return (
                                                        <Button tabIndex={-1} key={item} type={checked ? 'primary' : 'default'}>
                                                            {item}
                                                        </Button>
                                                    );
                                                }}
                                            </Radio>
                                        );
                                    })}
                                </Radio.Group>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div style={{textAlign:'right',color:'grey',marginRight:20}}>
                        (创建时间与创建人由系统填充)
                    </div>
                </Modal>
                <Modal
                    title='修改商品分类'
                    unmountOnExit={true}
                    maskClosable={false}
                    visible={ifEdit}
                    onOk={() => {
                        setEditObject({})
                        setIfEdit(false)
                    }}
                    onCancel={() => {
                        setEditObject({})
                        setIfEdit(false)
                    }}
                    autoFocus={false}
                >
                    <div style={{display:'flex',width:'100%',justifyContent:'space-between'}}>
                        <div style={{width:'27%'}}>
                            <div style={{height:50,width:'100%',justifyContent:'right',display:'flex',alignItems:'center'}}>
                                商品分类名称
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'right',display:'flex',alignItems:'center'}}>
                                所属经营类型
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'right',display:'flex',alignItems:'center'}}>
                                说明
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'right',display:'flex',alignItems:'center'}}>
                                是否可用
                            </div>
                        </div>
                        <div style={{width:'65%'}}>
                            <div style={{height:50,width:'100%',justifyContent:'left',display:'flex',alignItems:'center'}}>
                                <Input
                                    defaultValue={editObject.category}
                                    onChange={value=>{setEditObject({...editObject,category:value})}}
                                    style={{width:'90%'}}
                                />
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'left',display:'flex',alignItems:'center'}}>
                                <Input
                                    defaultValue={editObject.type}
                                    onChange={value=>{setEditObject({...editObject,type:value})}}
                                    style={{width:'90%'}}
                                />
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'left',display:'flex',alignItems:'center'}}>
                                <Input.TextArea
                                    autoSize={{ minRows: 1, maxRows: 3 }}
                                    defaultValue={editObject.description}
                                    onChange={value=>{setEditObject({...editObject,description:value})}}
                                    style={{width:'90%'}}
                                />
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'left',display:'flex',alignItems:'center'}}>
                                <Radio.Group
                                    defaultValue={editObject.ifUse?'是':'否'}
                                    onChange={value=>{setEditObject({...editObject,ifUse:value==='是'})}}
                                    name='button-radio-group'
                                >
                                    {['是','否'].map((item) => {
                                        return (
                                            <Radio key={item} value={item}>
                                                {({ checked }) => {
                                                    return (
                                                        <Button tabIndex={-1} key={item} type={checked ? 'primary' : 'default'}>
                                                            {item}
                                                        </Button>
                                                    );
                                                }}
                                            </Radio>
                                        );
                                    })}
                                </Radio.Group>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div style={{textAlign:'right',color:'grey',marginRight:20}}>
                        (无法修改创建时间与创建人)
                    </div>
                </Modal>
            </div>
        </div>
    )
}
export default ProductSort