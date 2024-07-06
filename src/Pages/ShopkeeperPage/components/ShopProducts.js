import {Button, Input, InputNumber, Modal, Radio, Table} from "@arco-design/web-react";
import {useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {IconSearch} from "@arco-design/web-react/icon";

const ShopProducts=()=>{
    const inputRef1 = useRef(null);
    const inputRef2 = useRef(null);
    const navigate=useNavigate()

    const columns = [
        {
            title: '商品名称',
            dataIndex: 'name',
            filterIcon: <IconSearch />,
            filterDropdown: ({ filterKeys, setFilterKeys, confirm }) => {
                return (
                    <div className='arco-table-custom-filter'>
                        <Input.Search
                            style={{width:120}}
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
            dataIndex: 'type',
            filterIcon: <IconSearch />,
            filterDropdown: ({ filterKeys, setFilterKeys, confirm }) => {
                return (
                    <div className='arco-table-custom-filter'>
                        <Input.Search
                            style={{width:120}}
                            ref={inputRef2}
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
            onFilter: (value, row) => (value ? row.type.indexOf(value) !== -1 : true),
            onFilterDropdownVisibleChange: (visible) => {
                if (visible) {
                    setTimeout(() => inputRef2.current.focus(), 150);
                }
            },
        },
        {
            title: '说明',
            dataIndex: 'description'
        },
        {
            title: '单价',
            dataIndex: 'price',
            render: (col, record) =>{
                return <span>{record.price} 元</span>
            },
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: '是否推荐',
            dataIndex: 'ifRecommend',
            render: (col, record) =>{
                return <span style={{color:record.ifRecommend?'green':'red'}}>{record.ifRecommend?'是':'否'}</span>
            }
        },
        {
            title: '是否打折',
            dataIndex: 'ifDiscount',
            render: (col, record) =>{
                return <span style={{color:record.ifDiscount?'green':'red'}}>{record.ifDiscount?'是':'否'}</span>
            }
        },
        {
            title: '打折活动说明',
            dataIndex: 'discountDescription',
            render: (col, record) =>{
                return <span>{record.ifDiscount?record.discountDescription:'暂无打折活动！'}</span>
            }
        },
        {
            title: '操作',
            render: (col, record) => {
                return <div style={{display:'flex'}}>
                    <Button
                        style={{border:'1px solid #4E5969'}}
                        onClick={()=>{
                            setEditObject(record)
                            setIfEdit(true)
                        }}
                    >
                        修改
                    </Button>
                    <Button
                        status={"danger"}
                        style={{marginLeft:20,border:'#F53F3F 1px solid'}}
                    >
                        删除
                    </Button>
                </div>
            }
        }
    ];

    const [data,setData]=useState([
        {
            name:'a',
            type:'type1',
            description:'description',
            price:12.0,
            ifRecommend:true,
            ifDiscount:true,
            discountDescription:'aaa'
        },
        {
            name:'b',
            type:'type1',
            description:'description',
            price:123.0,
            ifRecommend:true,
            ifDiscount:false,
            discountDescription:null
        },
        {
            name:'c',
            type:'type2',
            description:'description',
            price:13.0,
            ifRecommend:false,
            ifDiscount:true,
            discountDescription:'aaa'
        },
    ])

    const [ifAdd,setIfAdd]=useState(false)
    const [ifEdit,setIfEdit]=useState(false)
    const [editObject,setEditObject]=useState({})
    let input=null

    useEffect(()=>{
        if(!editObject.ifDiscount&&input!==null){
            input.dom.value='暂无打折活动！'
        }
    },[editObject.ifDiscount])

    return (
        <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{width: "90%", height: '90%'}}>
                <div style={{fontSize: 25, fontWeight: 'bold', color: '#165DFF', textAlign: 'center'}}>
                    设置商户产品
                </div>
                <div style={{width:'90%',background:'white',marginLeft:'5%',marginTop:'3%',borderRadius:10,border:'1px solid grey',maxHeight:'82%',overflow:'auto'}}>
                    <Table columns={columns} data={data} style={{padding:30}}/>
                </div>
                <div style={{display:"flex",justifyContent:'right',marginTop:'3%',marginRight:'5%'}}>
                    <Button
                        style={{marginRight:30}}
                        type={'primary'}
                        size={"large"}
                        onClick={()=>{setIfAdd(true)}}
                    >
                        新增
                    </Button>
                </div>
                <Modal
                    title='新增商品分类'
                    unmountOnExit={true}
                    maskClosable={false}
                    visible={ifAdd}
                    onOk={() => {
                        setEditObject({})
                        setIfAdd(false)
                    }}
                    onCancel={() => {
                        setEditObject({})
                        setIfAdd(false)
                    }}
                    autoFocus={false}
                >
                    <div style={{display:'flex',width:'100%',justifyContent:'space-between'}}>
                        <div style={{width:'27%'}}>
                            <div style={{height:50,width:'100%',justifyContent:'right',display:'flex',alignItems:'center'}}>
                                商品名称
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'right',display:'flex',alignItems:'center'}}>
                                商品类型
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'right',display:'flex',alignItems:'center'}}>
                                说明
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'right',display:'flex',alignItems:'center'}}>
                                单价
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'right',display:'flex',alignItems:'center'}}>
                                是否推荐
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'right',display:'flex',alignItems:'center'}}>
                                是否打折
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'right',display:'flex',alignItems:'center'}}>
                                打折活动说明
                            </div>
                        </div>
                        <div style={{width:'65%'}}>
                            <div style={{height:50,width:'100%',justifyContent:'left',display:'flex',alignItems:'center'}}>
                                <Input
                                    onChange={value=>{setEditObject({...editObject,name:value})}}
                                    style={{width:'90%'}}
                                />
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'left',display:'flex',alignItems:'center'}}>
                                <Input
                                    onChange={value=>{setEditObject({...editObject,type:value})}}
                                    style={{width:'90%'}}
                                />
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'left',display:'flex',alignItems:'center'}}>
                                <Input.TextArea
                                    autoSize={{ minRows: 1, maxRows: 2 }}
                                    onChange={value=>{setEditObject({...editObject,description:value})}}
                                    style={{width:'90%'}}
                                />
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'left',display:'flex',alignItems:'center'}}>
                                <InputNumber
                                    defaultValue={editObject.price}
                                    onChange={value=>{setEditObject({...editObject,price:value})}}
                                    min={0}
                                    step={0.1}
                                    precision={1}
                                    style={{width:'90%'}}
                                />
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'left',display:'flex',alignItems:'center'}}>
                                <Radio.Group
                                    onChange={value=>{setEditObject({...editObject,ifRecommend:value==='是'})}}
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
                            <div style={{height:50,width:'100%',justifyContent:'left',display:'flex',alignItems:'center'}}>
                                <Radio.Group
                                    defaultValue={'否'}
                                    onChange={value=>{setEditObject({...editObject,ifDiscount:value==='是'})}}
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
                            <div style={{height:50,width:'100%',justifyContent:'left',display:'flex',alignItems:'center'}}>
                                <Input.TextArea
                                    ref={(ref) => (input = ref)}
                                    disabled={!editObject.ifDiscount}
                                    autoSize={{ minRows: 1, maxRows: 2 }}
                                    onChange={value=>{setEditObject({...editObject,discountDescription:value})}}
                                    style={{width:'90%'}}
                                />
                            </div>
                        </div>
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
                                商品名称
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'right',display:'flex',alignItems:'center'}}>
                                商品类型
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'right',display:'flex',alignItems:'center'}}>
                                说明
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'right',display:'flex',alignItems:'center'}}>
                                单价
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'right',display:'flex',alignItems:'center'}}>
                                是否推荐
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'right',display:'flex',alignItems:'center'}}>
                                是否打折
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'right',display:'flex',alignItems:'center'}}>
                                打折活动说明
                            </div>
                        </div>
                        <div style={{width:'65%'}}>
                            <div style={{height:50,width:'100%',justifyContent:'left',display:'flex',alignItems:'center'}}>
                                <Input
                                    defaultValue={editObject.name}
                                    onChange={value=>{setEditObject({...editObject,name:value})}}
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
                                    autoSize={{ minRows: 1, maxRows: 2 }}
                                    defaultValue={editObject.description}
                                    onChange={value=>{setEditObject({...editObject,description:value})}}
                                    style={{width:'90%'}}
                                />
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'left',display:'flex',alignItems:'center'}}>
                                <InputNumber
                                    defaultValue={editObject.price}
                                    onChange={value=>{setEditObject({...editObject,price:value})}}
                                    min={0}
                                    step={0.1}
                                    precision={1}
                                    style={{width:'90%'}}
                                />
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'left',display:'flex',alignItems:'center'}}>
                                <Radio.Group
                                    defaultValue={editObject.ifRecommend?'是':'否'}
                                    onChange={value=>{setEditObject({...editObject,ifRecommend:value==='是'})}}
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
                            <div style={{height:50,width:'100%',justifyContent:'left',display:'flex',alignItems:'center'}}>
                                <Radio.Group
                                    defaultValue={editObject.ifDiscount?'是':'否'}
                                    onChange={value=>{setEditObject({...editObject,ifDiscount:value==='是'})}}
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
                            <div style={{height:50,width:'100%',justifyContent:'left',display:'flex',alignItems:'center'}}>
                                <Input.TextArea
                                    ref={(ref) => (input = ref)}
                                    disabled={!editObject.ifDiscount}
                                    autoSize={{ minRows: 1, maxRows: 2 }}
                                    defaultValue={editObject.discountDescription}
                                    onChange={value=>{setEditObject({...editObject,discountDescription:value})}}
                                    style={{width:'90%'}}
                                />
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default ShopProducts