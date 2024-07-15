import {Avatar, Button, Input, InputNumber, Message, Modal, Radio, Table, Upload, Select} from "@arco-design/web-react";
import {useEffect, useRef, useState} from "react";
import {IconSearch} from "@arco-design/web-react/icon";
import axiosInstance from "../../api/AxiosApi";

const ShopProducts = () => {
    const inputRef1 = useRef(null);
    const inputRef2 = useRef(null);
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [currentGroupId, setCurrentGroupId] = useState(null); // 新增字段

    useEffect(() => {
        axiosInstance.get('/products/merchants/accountId/' + localStorage.getItem('accountId')).then(
            res => {
                setData(res.data.data)
            }
        ).catch(
            err => {
                console.log(err)
            }
        )

        axiosInstance.get('/products/categories').then(
            res => {
                setCategories(res.data.data)
            }
        ).catch(
            err => {
                console.log(err)
            }
        )
    }, [])

    const [ifAdd, setIfAdd] = useState(false)
    const [ifEdit, setIfEdit] = useState(false)
    const [editObject, setEditObject] = useState({})

    const columns = [
        {
            title: '商品名称',
            dataIndex: 'productName',
            filterIcon: <IconSearch />,
            filterDropdown: ({ filterKeys, setFilterKeys, confirm }) => {
                return (
                    <div className='arco-table-custom-filter'>
                        <Input.Search
                            style={{width: 120}}
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
            title: '商品图片',
            dataIndex: 'imageUrl',
            render: (imageUrl) => <img src={imageUrl} alt="product" style={{ width: 50, height: 50 }} />,
        },
        {
            title: '商品类型',
            dataIndex: 'categoryName',
            filterIcon: <IconSearch />,
            filterDropdown: ({ filterKeys, setFilterKeys, confirm }) => {
                return (
                    <div className='arco-table-custom-filter'>
                        <Input.Search
                            style={{width: 120}}
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
            render: (col, record) => {
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
                return <div style={{display: 'flex'}}>
                    <Button
                        style={{border: '1px solid #4E5969'}}
                        onClick={() => {
                            setEditObject(record)
                            setIfEdit(true)
                            setCurrentGroupId(record.productId) // 设置当前商品ID
                        }}
                    >
                        修改
                    </Button>
                    <Button
                        status={"danger"}
                        style={{marginLeft: 20, border: '#F53F3F 1px solid'}}
                        onClick={() => {
                            if (window.confirm('确认删除？')) {
                                axiosInstance.delete('/products/' + record.productId).then(
                                    res => {
                                        Message.info('删除成功！')
                                        setData([...data.filter(item => item !== record)])
                                    }
                                ).catch(
                                    err => {
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

    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await axiosInstance.post(`/products/images/${currentGroupId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.status === 'success') {
                Message.success('图片上传成功');
                // 重新获取产品数据
                axiosInstance.get('/products/merchants/accountId/' + localStorage.getItem('accountId')).then(
                    res => {
                        setData(res.data.data)
                    }
                ).catch(
                    err => {
                        Message.error('更新信息失败！')
                    }
                )
            } else {
                Message.error('图片上传失败');
            }
        } catch (error) {
            console.error(error);
            Message.error('图片上传失败');
        }
    };

    return (
        <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{width: "90%", height: '90%'}}>
                <div style={{fontSize: 25, fontWeight: 'bold', color: '#165DFF', textAlign: 'center'}}>
                    设置商户产品
                </div>
                <div style={{width: '90%', background: 'white', textAlign: 'right', marginLeft: '5%', marginTop: '2%', borderRadius: 10, border: '1px solid grey', maxHeight: '82%', overflow: 'auto'}}>
                    <Button
                        style={{marginRight: 30, marginTop: 20}}
                        type={'primary'}
                        size={"large"}
                        onClick={() => {
                            setIfAdd(true)
                        }}
                    >
                        新增
                    </Button>
                    <Table columns={columns} data={data} style={{margin: 20}} />
                </div>
                <Modal
                    title='新增商品'
                    unmountOnExit={true}
                    maskClosable={false}
                    visible={ifAdd}
                    onOk={() => {
                        const formData = new FormData();
                        formData.append('productName', editObject.productName);
                        formData.append('categoryId', editObject.categoryId);
                        formData.append('description', editObject.description);
                        formData.append('price', editObject.price);
                        formData.append('merchantId', data[0].merchantId);
                        formData.append('image', editObject.image);

                        axiosInstance.post('/products', formData).then(
                            res => {
                                setEditObject({})
                                setIfAdd(false)
                                Message.info('添加成功！')
                                axiosInstance.get('/products/merchants/accountId/' + localStorage.getItem('accountId')).then(
                                    res => {
                                        setData(res.data.data)
                                    }
                                ).catch(
                                    err => {
                                        Message.error('更新信息失败！')
                                    }
                                )
                            }
                        ).catch(
                            err => {
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
                    <div style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
                        <div style={{width: '20%'}}>
                            <div style={{height: 50, width: '100%', justifyContent: 'right', display: 'flex', alignItems: 'center'}}>
                                商品名称
                            </div>
                            <div style={{height: 50, width: '100%', justifyContent: 'right', display: 'flex', alignItems: 'center'}}>
                                商品类型
                            </div>
                            <div style={{height: 50, width: '100%', justifyContent: 'right', display: 'flex', alignItems: 'center'}}>
                                说明
                            </div>
                            <div style={{height: 50, width: '100%', justifyContent: 'right', display: 'flex', alignItems: 'center'}}>
                                单价
                            </div>
                        </div>
                        <div style={{width: '75%'}}>
                            <div style={{height: 50, width: '100%', justifyContent: 'left', display: 'flex', alignItems: 'center'}}>
                                <Input
                                    onChange={value => {
                                        setEditObject({...editObject, productName: value})
                                    }}
                                    style={{width: '90%'}}
                                />
                            </div>
                            <div style={{height: 50, width: '100%', justifyContent: 'left', display: 'flex', alignItems: 'center'}}>
                                <Select
                                    style={{width: '90%'}}
                                    placeholder="请选择商品类型"
                                    onChange={value => {
                                        setEditObject({...editObject, categoryId: value})
                                    }}
                                >
                                    {categories.map(category => (
                                        <Select.Option key={category.categoryId} value={category.categoryId}>
                                            {category.categoryName}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </div>
                            <div style={{height: 50, width: '100%', justifyContent: 'left', display: 'flex', alignItems: 'center'}}>
                                <Input.TextArea
                                    autoSize={{minRows: 1, maxRows: 2}}
                                    onChange={value => {
                                        setEditObject({...editObject, description: value})
                                    }}
                                    style={{width: '90%'}}
                                />
                            </div>
                            <div style={{height: 50, width: '100%', justifyContent: 'left', display: 'flex', alignItems: 'center'}}>
                                <InputNumber
                                    defaultValue={editObject.price}
                                    onChange={value => {
                                        setEditObject({...editObject, price: value})
                                    }}
                                    min={0}
                                    step={0.1}
                                    precision={1}
                                    style={{width: '90%'}}
                                />
                            </div>

                        </div>
                    </div>
                </Modal>
                <Modal
                    title='修改商品信息'
                    unmountOnExit={true}
                    maskClosable={false}
                    visible={ifEdit}
                    onOk={() => {
                        const formData = new FormData();
                        formData.append('productId', editObject.productId);
                        formData.append('merchantId', editObject.merchantId);
                        formData.append('productName', editObject.productName);
                        formData.append('categoryId', editObject.categoryId);
                        formData.append('description', editObject.description);
                        formData.append('price', editObject.price);

                        axiosInstance.put('/products', formData).then(
                            res => {
                                setEditObject({})
                                setIfEdit(false)
                                Message.info('修改成功！')
                                axiosInstance.get('/products/merchants/accountId/' + localStorage.getItem('accountId')).then(
                                    res => {
                                        setData(res.data.data)
                                    }
                                ).catch(
                                    err => {
                                        Message.error('更新信息失败！')
                                    }
                                )
                            }
                        ).catch(
                            err => {
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
                    <div style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
                        <div style={{width: '20%'}}>
                            <div style={{height: 50, width: '100%', justifyContent: 'right', display: 'flex', alignItems: 'center'}}>
                                商品名称
                            </div>
                            <div style={{height: 50, width: '100%', justifyContent: 'right', display: 'flex', alignItems: 'center'}}>
                                商品类型
                            </div>
                            <div style={{height: 50, width: '100%', justifyContent: 'right', display: 'flex', alignItems: 'center'}}>
                                说明
                            </div>
                            <div style={{height: 50, width: '100%', justifyContent: 'right', display: 'flex', alignItems: 'center'}}>
                                单价
                            </div>
                            <div style={{height: 50, width: '100%', justifyContent: 'right', display: 'flex', alignItems: 'center'}}>
                                商品图片
                            </div>
                        </div>
                        <div style={{width: '75%'}}>
                            <div style={{height: 50, width: '100%', justifyContent: 'left', display: 'flex', alignItems: 'center'}}>
                                <Input
                                    defaultValue={editObject.productName}
                                    onChange={value => {
                                        setEditObject({...editObject, productName: value})
                                    }}
                                    style={{width: '90%'}}
                                />
                            </div>
                            <div style={{height: 50, width: '100%', justifyContent: 'left', display: 'flex', alignItems: 'center'}}>
                                <Select
                                    style={{width: '90%'}}
                                    placeholder="请选择商品类型"
                                    defaultValue={editObject.categoryId}
                                    onChange={value => {
                                        setEditObject({...editObject, categoryId: value})
                                    }}
                                >
                                    {categories.map(category => (
                                        <Select.Option key={category.categoryId} value={category.categoryId}>
                                            {category.categoryName}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </div>
                            <div style={{height: 50, width: '100%', justifyContent: 'left', display: 'flex', alignItems: 'center'}}>
                                <Input.TextArea
                                    autoSize={{minRows: 1, maxRows: 2}}
                                    defaultValue={editObject.description}
                                    onChange={value => {
                                        setEditObject({...editObject, description: value})
                                    }}
                                    style={{width: '90%'}}
                                />
                            </div>
                            <div style={{height: 50, width: '100%', justifyContent: 'left', display: 'flex', alignItems: 'center'}}>
                                <InputNumber
                                    defaultValue={editObject.price}
                                    onChange={value => {
                                        setEditObject({...editObject, price: value})
                                    }}
                                    min={0}
                                    step={0.1}
                                    precision={1}
                                    style={{width: '90%'}}
                                />
                            </div>
                            <div style={{height: 50, width: '100%', justifyContent: 'left', display: 'flex', alignItems: 'center'}}>
                                <Upload
                                    imagePreview={true}
                                    limit={1}
                                    multiple
                                    listType="picture-list"
                                    beforeUpload={handleImageUpload}
                                    showUploadList={true}
                                >
                                </Upload>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default ShopProducts
