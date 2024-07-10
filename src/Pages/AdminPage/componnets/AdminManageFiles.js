import {
    Button,
    Descriptions,
    Input,
    InputNumber,
    Message,
    Modal,
    Radio,
    Space,
    Table,
    Upload
} from "@arco-design/web-react";
import {useRef, useState} from "react";
import {IconSearch} from "@arco-design/web-react/icon";

const AdminManageFiles=()=>{
    const [ifView,setIfView]=useState(false)
    const [ifUpdate,setIfUpdate]=useState(false)
    const [ifRead,setIfRead] = useState(false)
    const [editObject,setEditObject]=useState({})

    const [articleData,setArticleData]=useState([
        {
            key:'1',
            id:'1',
            title:'name',
            category:'种类',
            create:'time',
            content:'文章内容'
        },
        {
            key:'2',
            id:'2',
            title:'name',
            category:'种类',
            create:'time',
            content:'文章内容'
        },
        {
            key:'3',
            id:'3',
            title:'name',
            category:'种类',
            create:'time',
            content:'文章内容'
        },
    ])
    const inputRef1 = useRef(null);
    const inputRef2 = useRef(null);
    const article = [
        {
            title: '文章编号',
            dataIndex: 'id',
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
            onFilter: (value, row) => (value ? row.type.indexOf(value) !== -1 : true),
            onFilterDropdownVisibleChange: (visible) => {
                if (visible) {
                    setTimeout(() => inputRef1.current.focus(), 150);
                }
            },
        },
        {
            title: '文章种类',
            dataIndex: 'category',
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
            title: '发布时间',
            dataIndex: 'create',
            sorter: (a, b) => a.time - b.time,
        },
        {
            title: '操作',
            render: (col, record) => {
                return <div style={{display:'flex' }}>
                    <Button
                        style={{marginRight:10}}
                        type={"primary"}
                        onClick={()=>{
                            setEditObject(record)
                            setIfView(true)
                        }}
                    >
                        修改信息
                    </Button>
                    <Button
                        style={{marginRight:10}}
                        status={'danger'}
                        type={"primary"}
                        onClick={()=>{
                            if(window.confirm('确定删除该文章？')) {
                                Message.info('删除成功!');
                                setIfView(false)
                            }
                        }}>
                        删除
                    </Button>
                    <Button
                        style={{marginRight:10}}
                        type={'outline'}
                        onClick={()=>{
                            setEditObject(record)
                            setIfRead(true)
                        }}
                    >
                        查看文章
                    </Button>
                </div>
            }
        }
    ];
    const [disabled, setDisabled] = useState(false);
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
                        disabled={disabled}
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
                        title={editObject.title + ' 文章详情'}
                        unmountOnExit={true}
                        maskClosable={false}
                        visible={ifView}
                        onOk={() => {
                            setEditObject({})
                            setIfView(false)
                        }}
                        onCancel={() => {
                            setEditObject({})
                            setIfView(false)
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
                            <div style={{width: '65%'}}>
                                <div style={{
                                    height: 50,
                                    width: '100%',
                                    justifyContent: 'left',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <Input
                                        onChange={value => {
                                            setEditObject({...editObject, id: value})
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
                                    <Input
                                        onChange={value => {
                                            setEditObject({...editObject, category: value})
                                        }}
                                        style={{width: '90%'}}
                                    />
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
                            setEditObject({})
                            setIfUpdate(false)
                        }}
                        onCancel={() => {
                            setEditObject({})
                            setIfUpdate(false)
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
                            <div style={{width: '65%'}}>
                                <div style={{
                                    height: 50,
                                    width: '100%',
                                    justifyContent: 'left',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                <Input
                                        onChange={value => {
                                            setEditObject({...editObject, id: value})
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
                                    <Input
                                        onChange={value => {
                                            setEditObject({...editObject, category: value})
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
                                    <Input.TextArea
                                        autoSize={{ minRows: 1, maxRows: 200 }}
                                        onChange={value=>{setEditObject({...editObject,description:value})}}
                                        style={{width:'90%',zIndex:2}}
                                    />
                                </div>
                            </div>
                        </div>
                    </Modal>
                    <Modal
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