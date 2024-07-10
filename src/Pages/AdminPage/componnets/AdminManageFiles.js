import {
    Button,
    Input,
    Message,
    Modal, Radio,
    Table,
} from "@arco-design/web-react";
import {useEffect, useRef, useState} from "react";
import {IconSearch} from "@arco-design/web-react/icon";
import axiosInstance from "../../../api/AxiosApi";

const AdminManageFiles=()=>{
    const [ifView,setIfView]=useState(false)
    const [ifUpdate,setIfUpdate]=useState(false)
    const [ifRead,setIfRead] = useState(false)
    const [editObject,setEditObject]=useState({})
    const inputRef1 = useRef(null);
    const inputRef2 = useRef(null);

    const [articleData,setArticleData]=useState([])
    useEffect(()=>{
        axiosInstance.get('/articles').then(
            res=>{
                setArticleData(res.data.data)
            }
        ).catch(
            err=>{
                console.log(err)
            }
        )
    },[])

    const article = [
        {
            title: '文章编号',
            dataIndex: 'articleId',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: '文章标题',
            dataIndex: 'title',
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
            onFilter: (value, row) => (value ? row.title.indexOf(value) !== -1 : true),
            onFilterDropdownVisibleChange: (visible) => {
                if (visible) {
                    setTimeout(() => inputRef1.current.focus(), 150);
                }
            },
        },
        {
            title: '文章种类',
            dataIndex: 'categoryName',
            filterIcon: <IconSearch />,
            filterDropdown: ({ filterKeys, setFilterKeys, confirm }) => {
                return (
                    <div className='arco-table-custom-filter'>
                        <Input.Search
                            style={{width:150}}
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
            title: '操作',
            width: 200,
            render: (col, record) => {
                return <div style={{display:'flex'}}>
                    <Button
                        style={{marginRight:10}}
                        type={"primary"}
                        onClick={()=>{
                            setEditObject(record)
                            setIfRead(true)
                        }}
                    >
                        查看
                    </Button>
                    <Button
                        style={{marginRight:10}}
                        type={'outline'}
                        onClick={()=>{
                            setEditObject(record)
                            setIfView(true)
                        }}
                    >
                        修改
                    </Button>
                    <Button
                        style={{marginRight:10}}
                        status={'danger'}
                        type={"primary"}
                        onClick={()=>{
                            if(window.confirm('确定删除该文章？')) {
                                axiosInstance.delete('/articles/'+record.articleId).then(
                                    res=>{
                                        Message.info('删除成功！')
                                        setArticleData([...articleData.filter(item=>item!==record)])
                                    }
                                ).catch(
                                    err=>{
                                        console.log(err)
                                    }
                                )
                            }
                        }}>
                        删除
                    </Button>
                </div>
            }
        }
    ];
    return (
        <div style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <div style={{width: "90%", height: '90%'}}>
                <div style={{fontSize: 25, fontWeight: 'bold', color: '#165DFF', textAlign: 'center'}}>
                    文章管理
                </div>
                <div style={{
                    width: '95%',
                    background: 'white',
                    textAlign: 'right',
                    marginLeft: '2.5%',
                    marginTop: '2%',
                    borderRadius: 10,
                    border: '1px solid grey',
                    maxHeight: '82%',
                    overflow: 'auto',
                    paddingLeft: 20,
                    paddingRight: 20
                }}>

                    <Button
                        type='primary'
                        onClick={()=>{setIfUpdate(true)}}
                        style={{marginTop:20,marginLeft:20,marginRight:30}}
                    >
                        发表文章
                    </Button>
                    <Table
                        indentSize={60}
                        columns={article}
                        data={articleData}
                        style={{margin:20}}
                        borderCell={true}
                        pagination={{pageSize: 5}}
                    />
                    <Modal
                        title={'修改文章'}
                        unmountOnExit={true}
                        maskClosable={false}
                        visible={ifView}
                        onOk={() => {
                            axiosInstance.put('/articles', {
                                "articleId": editObject.articleId,
                                "title": editObject.title,
                                "content": editObject.content,
                                "categoryId": editObject.categoryId,
                                "authorId": editObject.authorId
                            }).then(
                                res=>{
                                    Message.info('修改成功！')
                                    setEditObject({})
                                    setIfView(false)
                                    axiosInstance.get('/articles').then(
                                        res=>{
                                            setArticleData(res.data.data)
                                        }
                                    ).catch(
                                        err=>{
                                            Message.error('更新文章列表失败！')
                                        }
                                    )
                                }
                            ).catch(
                                err=>{
                                    Message.info('修改失败！')
                                }
                            )
                        }}
                        onCancel={() => {
                            setEditObject({})
                            setIfView(false)
                        }}
                        autoFocus={false}
                    >
                        <div style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
                            <div style={{width: '20%'}}>
                                <div style={{
                                    height: 50,
                                    width: '100%',
                                    justifyContent: 'right',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    文章编号
                                </div>
                                <div style={{
                                    height: 50,
                                    width: '100%',
                                    justifyContent: 'right',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    文章标题
                                </div>
                                <div style={{
                                    height: 50,
                                    width: '100%',
                                    justifyContent: 'right',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    文章种类
                                </div>
                            </div>
                            <div style={{width: '75%'}}>
                                <div style={{
                                    height: 50,
                                    width: '100%',
                                    justifyContent: 'left',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <Input
                                        defaultValue={editObject.articleId}
                                        disabled
                                        onChange={value => {
                                            setEditObject({...editObject, articleId: value})
                                        }}
                                        style={{width: '90%'}}
                                    />
                                </div>
                                <div style={{
                                    height: 50,
                                    width: '100%',
                                    justifyContent: 'left',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <Input
                                        defaultValue={editObject.title}
                                        onChange={value => {
                                            setEditObject({...editObject, title: value})
                                        }}
                                        style={{width: '90%'}}
                                    />
                                </div>
                                <div style={{
                                    height: 50,
                                    width: '100%',
                                    justifyContent: 'left',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <Radio.Group
                                        name='button-radio-group'
                                        style={{display:'flex'}}
                                        defaultValue={editObject.categoryName}
                                        onChange={value => {
                                            setEditObject({...editObject,
                                                categoryId:value==='技术'?
                                                    1:value==='健康'?
                                                        2:value==='金融'?
                                                            3:4
                                            })
                                        }}
                                    >
                                        {['技术', '健康', '金融','教育'].map((item) => {
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
                    </Modal>
                    <Modal
                        title={'发表文章'}
                        unmountOnExit={true}
                        maskClosable={false}
                        visible={ifUpdate}
                        onOk={() => {
                            if(editObject.title&&editObject.content&&editObject.categoryId) {
                                axiosInstance.post('/articles',{
                                    ...editObject,authorId:parseInt(localStorage.getItem('accountId'))
                                }).then(
                                    res=>{
                                        Message.info('发表成功！')
                                        setEditObject({})
                                        setIfUpdate(false)
                                        axiosInstance.get('/articles').then(
                                            res=>{
                                                setArticleData(res.data.data)
                                            }
                                        ).catch(
                                            err=>{
                                                Message.error('更新文章列表失败！')
                                            }
                                        )
                                    }
                                ).catch(
                                    err=>{
                                        Message.info('发表失败！')
                                    }
                                )
                            } else {
                                Message.error('仍有未填写内容！')
                            }
                        }}
                        onCancel={() => {
                            setEditObject({})
                            setIfUpdate(false)
                        }}
                        autoFocus={false}
                    >
                        <div style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
                            <div style={{width: '20%'}}>
                                <div style={{
                                    height: 50,
                                    width: '100%',
                                    justifyContent: 'right',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    文章标题
                                </div>
                                <div style={{
                                    height: 50,
                                    width: '100%',
                                    justifyContent: 'right',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    文章种类
                                </div>
                                <div style={{
                                    height: 50,
                                    width: '100%',
                                    justifyContent: 'right',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    文章内容
                                </div>
                            </div>
                            <div style={{width: '75%'}}>
                                <div style={{
                                    height: 50,
                                    width: '100%',
                                    justifyContent: 'left',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <Input
                                        onChange={value => {
                                            setEditObject({...editObject, title: value})
                                        }}
                                        style={{width: '90%'}}
                                    />
                                </div>
                                <div style={{
                                    height: 50,
                                    width: '100%',
                                    justifyContent: 'left',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <Radio.Group
                                        name='button-radio-group'
                                        style={{display:'flex'}}
                                        onChange={value => {
                                            setEditObject({...editObject,
                                                categoryId:value==='技术'?
                                                    1:value==='健康'?
                                                        2:value==='金融'?
                                                            3:4
                                            })
                                        }}
                                    >
                                        {['技术', '健康', '金融','教育'].map((item) => {
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
                                <div style={{
                                    height: 50,
                                    width: '100%',
                                    justifyContent: 'left',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <Input.TextArea
                                        autoSize={{ minRows: 1, maxRows: 200 }}
                                        onChange={value=>{setEditObject({...editObject,content:value})}}
                                        style={{width:'90%',zIndex:2}}
                                    />
                                </div>
                            </div>
                        </div>
                    </Modal>
                    <Modal
                        footer={null}
                        title={editObject.title}
                        unmountOnExit={true}
                        maskClosable={false}
                        visible={ifRead}
                        onOk={() => {
                            setEditObject({})
                            setIfRead(false)
                        }}
                        onCancel={() => {
                            setEditObject({})
                            setIfRead(false)
                        }}
                        autoFocus={false}
                    >
                        {editObject.content}
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default AdminManageFiles