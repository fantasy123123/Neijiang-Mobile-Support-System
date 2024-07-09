import {useRef, useState} from "react";
import {
    Button,
    Card,
    DatePicker,
    Descriptions,
    Input,
    Modal,
    Progress,
    Radio, Table,
    Tooltip,
    Upload
} from "@arco-design/web-react";
import {IconEdit, IconHeartFill, IconPlus, IconSearch} from "@arco-design/web-react/icon";

const TouristViewProducts=()=>{
    const [ifEdit,setIfEdit] = useState(false);
    const [ifVisible,setIfVisible] = useState(false);
    const [initData,setInitData]=useState([
        {
            name:'名字1',
            location:'地点',
            phone:'电话',
            email:'邮件',
            type:'经营类型',
            environment:'经营环境',
            place:'经营场所',
            category:'商品类别',
            time:'创建时间'
        },
        {
            name:'名字2',
            location:'地点',
            phone:'电话',
            email:'邮件',
            type:'经营类型',
            environment:'经营环境',
            place:'经营场所',
            category:'商品类别',
            time:'创建时间'
        },
        {
            name:'名字3',
            location:'地点',
            phone:'电话',
            email:'邮件',
            type:'经营类型',
            environment:'经营环境',
            place:'经营场所',
            category:'商品类别',
            time:'创建时间'
        },
    ])
    const column = [
        {
            title: '商户名字',
            dataIndex: 'name',
        },
        {
          title: '商户地址',
          dataIndex: 'location',
        },
        {
          title: '商户电话',
          dataIndex: 'phone',
        },
        {
          title: '商户邮箱',
          dataIndex: 'email',
        },
        {
          title: '经营类型',
          dataIndex: 'type',
        },
        {
          title: '经营环境',
          dataIndex: 'environment',
        },
        {
          title: '经营场所',
          dataIndex: 'place',
        },
        {
          title: '商品类别',
          dataIndex: 'category',
        },
        {
          title: '创建时间',
          dataIndex: 'time',
        },
    ]
    const inputRef1 = useRef(null);
    const inputRef2 = useRef(null);
    const modalColumn = [
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
    function expandedRowRender() {
        return <Table
                    columns={modalColumn}
                    data={data}
                    pagination={false}
                    borderCell={true}
                    stripe={true}
        />;
    }
    return (
        <div style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <div style={{width: "90%", height: '90%'}}>
                <div style={{fontSize: 25, fontWeight: 'bold', color: '#165DFF', textAlign: 'center'}}>
                    查看商户产品
                </div>
                <div style={{
                    width: '90%',
                    background: 'white',
                    textAlign: 'right',
                    marginLeft: '5%',
                    marginTop: '2%',
                    borderRadius: 10,
                    border: '1px solid grey',
                    maxHeight: '82%',
                    overflow: 'auto'
                }}>
                    <Table
                        indentSize={60}
                        expandedRowRender={expandedRowRender}
                        columns={column}
                        data={initData}
                        style={{margin: 20}}
                        borderCell={true}
                        stripe={true}
                        pagination={{ pageSize: 5 }}
                    />
                </div>
            </div>
        </div>
    )
}

export default TouristViewProducts