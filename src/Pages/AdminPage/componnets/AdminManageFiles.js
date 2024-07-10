import {Button, Descriptions, Input, Message, Modal, Space, Table, Upload} from "@arco-design/web-react";
import {useRef, useState} from "react";
import {IconSearch} from "@arco-design/web-react/icon";

const AdminManageFiles=()=>{
    const [ifView,setIfView]=useState(false)
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
            dataIndex: 'category'
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
                        查看文章内容
                    </Button>
                    <Button
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
                </div>
            }
        }
    ];
    const uploadRef = useRef();
    const [disabled, setDisabled] = useState(false);
    const [fileList, setFileList] = useState([]);
    const onSubmit = (e, isFirst) => {
        e.stopPropagation();
        const file = isFirst ? fileList.filter((x) => x.status === 'init')[0] : null;
        uploadRef.current && uploadRef.current.submit(file);
    };

    const onChange = (files) => {
        setFileList(files);
        setDisabled(!files.some((x) => x.status === 'init'));
    };

    const onProgress = (file) => {
        setFileList((files) => {
            return files.map((x) => (x.uid === file.uid ? file : x));
        });
    };
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
                    <Upload
                        ref={uploadRef}
                        multiple
                        autoUpload={false}
                        action='/'
                        onChange={onChange}
                        onProgress={onProgress}
                        fileList={fileList}
                        style={{marginRight:30,marginTop:20,marginLeft:20}}
                    >
                        <Space size='large'>
                            <Button>选择本地文章</Button>
                            <Button type='primary' onClick={onSubmit} disabled={disabled}>
                                全部发表
                            </Button>
                            <Button
                                type='primary'
                                onClick={(e) => {
                                    onSubmit(e, true);
                                }}
                                disabled={disabled}
                            >
                                仅发表一篇
                            </Button>
                        </Space>
                    </Upload>
                    <Table
                        indentSize={60}
                        columns={article}
                        data={articleData}
                        style={{margin:20}}
                        borderCell={true}
                        pagination={{pageSize: 5}}
                    />
                    <Modal
                        title={editObject.title}
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
                        footer={null}
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