import {Button, Input, InputNumber, Message, Modal, Radio, Table} from "@arco-design/web-react";
import {useEffect, useRef, useState} from "react";
import {IconSearch} from "@arco-design/web-react/icon";
import axiosInstance from "../../api/AxiosApi";


const ShopProducts=()=>{
    const inputRef1 = useRef(null);
    const inputRef2 = useRef(null);
    const [data,setData]=useState([])

    useEffect(()=>{
        axiosInstance.get('/products/merchants/accountId/'+localStorage.getItem('accountId')).then(
            res=>{
                setData(res.data.data)
            }
        ).catch(
            err=>{
                console.log(err)
            }
        )
    },[])

    const [ifAdd,setIfAdd]=useState(false)
    const [ifEdit,setIfEdit]=useState(false)
    const [editObject,setEditObject]=useState({})

    const columns = [
        {
            title: '商品名称',
            dataIndex: 'productName',
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
            onFilter: (value, row) => (value ? row.productName.indexOf(value) !== -1 : true),
            onFilterDropdownVisibleChange: (visible) => {
                if (visible) {
                    setTimeout(() => inputRef1.current.focus(), 150);
                }
            },
        },
        {
            title: '商品类型',
            dataIndex: 'categoryName',
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
            onFilter: (value, row) => (value ? row.categoryName.indexOf(value) !== -1 : true),
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
            title: '创建时间',
            dataIndex: 'createdAt'
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
                        onClick={()=>{
                          if(window.confirm('确认删除？')){
                              axiosInstance.delete('/products/'+record.productId).then(
                                  res=>{
                                      Message.info('删除成功！')
                                      setData([...data.filter(item=>item!==record)])
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
            }
        }
    ];

    return (
        <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{width: "90%", height: '90%'}}>
                <div style={{fontSize: 25, fontWeight: 'bold', color: '#165DFF', textAlign: 'center'}}>
                    设置商户产品
                </div>
                <div style={{width:'90%',background:'white',textAlign:'right',marginLeft:'5%',marginTop:'2%',borderRadius:10,border:'1px solid grey',maxHeight:'82%',overflow:'auto'}}>
                    <Button
                        style={{marginRight:30,marginTop:20}}
                        type={'primary'}
                        size={"large"}
                        onClick={()=>{setIfAdd(true)}}
                    >
                        新增
                    </Button>
                    <Table columns={columns} data={data} style={{margin:20}}/>
                </div>
                <Modal
                    title='新增商品分类'
                    unmountOnExit={true}
                    maskClosable={false}
                    visible={ifAdd}
                    onOk={() => {
                        axiosInstance.post('/products',{
                            ...editObject,merchantId:data[0].merchantId
                        }).then(
                            res=>{
                                setEditObject({})
                                setIfAdd(false)
                                Message.info('添加成功！')
                                axiosInstance.get('/products/merchants/accountId/'+localStorage.getItem('accountId')).then(
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
                        </div>
                        <div style={{width:'75%'}}>
                            <div style={{height:50,width:'100%',justifyContent:'left',display:'flex',alignItems:'center'}}>
                                <Input
                                    onChange={value=>{setEditObject({...editObject,productName:value})}}
                                    style={{width:'90%'}}
                                />
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'left',display:'flex',alignItems:'center'}}>
                                <Radio.Group
                                    name='button-radio-group'
                                    style={{display:'flex'}}
                                    onChange={value => {
                                        setEditObject({...editObject,
                                            categoryId:value==='电子产品'?
                                                1:value==='服装'?
                                                    2:value==='食品'?
                                                        3:4
                                        })
                                    }}
                                >
                                    {['电子产品', '服装', '食品','家具'].map((item) => {
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
                        </div>
                    </div>
                </Modal>
                <Modal
                    title='修改商品分类'
                    unmountOnExit={true}
                    maskClosable={false}
                    visible={ifEdit}
                    onOk={() => {
                        axiosInstance.put('/products',editObject).then(
                            res=>{
                                setEditObject({})
                                setIfEdit(false)
                                Message.info('修改成功！')
                                axiosInstance.get('/products/merchants/accountId/'+localStorage.getItem('accountId')).then(
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
                        </div>
                        <div style={{width:'75%'}}>
                            <div style={{height:50,width:'100%',justifyContent:'left',display:'flex',alignItems:'center'}}>
                                <Input
                                    defaultValue={editObject.productName}
                                    onChange={value=>{setEditObject({...editObject,productName:value})}}
                                    style={{width:'90%'}}
                                />
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'left',display:'flex',alignItems:'center'}}>
                                <Radio.Group
                                    name='button-radio-group'
                                    style={{display:'flex'}}
                                    defaultValue={editObject.categoryName}
                                    onChange={value => {
                                        setEditObject({...editObject,
                                            categoryId:value==='电子产品'?
                                                1:value==='服装'?
                                                    2:value==='食品'?
                                                        3:4
                                        })
                                    }}
                                >
                                    {['电子产品', '服装', '食品','家具'].map((item) => {
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
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default ShopProducts