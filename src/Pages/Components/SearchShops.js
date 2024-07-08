import {Input, Table} from "@arco-design/web-react";
import {useState} from "react";

const InputSearch = Input.Search;

const SearchShops=()=>{
    const [data,setData]=useState([{
        name:'name',
        location:'location',
        phone:'phone',
        email:'email',
        type:'type',
        environment:'environment',
        place:'place',
        product:'product'
    },{
        name:'name',
        location:'location',
        phone:'phone',
        email:'email',
        type:'type',
        environment:'environment',
        place:'place',
        product:'product'
    },{
        name:'name',
        location:'location',
        phone:'phone',
        email:'email',
        type:'type',
        environment:'environment',
        place:'place',
        product:'product'
    },{
        name:'name',
        location:'location',
        phone:'phone',
        email:'email',
        type:'type',
        environment:'environment',
        place:'place',
        product:'product'
    },{
        name:'name',
        location:'location',
        phone:'phone',
        email:'email',
        type:'type',
        environment:'environment',
        place:'place',
        product:'product'
    },{
        name:'name',
        location:'location',
        phone:'phone',
        email:'email',
        type:'type',
        environment:'environment',
        place:'place',
        product:'product'
    },{
        name:'name',
        location:'location',
        phone:'phone',
        email:'email',
        type:'type',
        environment:'environment',
        place:'place',
        product:'product'
    },{
        name:'name',
        location:'location',
        phone:'phone',
        email:'email',
        type:'type',
        environment:'environment',
        place:'place',
        product:'product'
    },{
        name:'name',
        location:'location',
        phone:'phone',
        email:'email',
        type:'type',
        environment:'environment',
        place:'place',
        product:'product'
    },{
        name:'name',
        location:'location',
        phone:'phone',
        email:'email',
        type:'type',
        environment:'environment',
        place:'place',
        product:'product'
    },{
        name:'name',
        location:'location',
        phone:'phone',
        email:'email',
        type:'type',
        environment:'environment',
        place:'place',
        product:'product'
    },{
        name:'name',
        location:'location',
        phone:'phone',
        email:'email',
        type:'type',
        environment:'environment',
        place:'place',
        product:'product'
    }])

    const column=[
        {
            title: '名称',
            dataIndex: 'name'
        },
        {
            title: '地址',
            dataIndex: 'location'
        },
        {
            title: '联系方式',
            dataIndex: 'phone'
        },
        {
            title: '电子邮件',
            dataIndex: 'email'
        },
        {
            title: '经营类型',
            dataIndex: 'type'
        },
        {
            title: '经营环境',
            dataIndex: 'environment'
        },
        {
            title: '经营场所',
            dataIndex: 'place'
        },
        {
            title: '商品类别',
            dataIndex: 'product'
        }]

    return (
        <div style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <div style={{width:"90%",height:'90%'}}>
                <div style={{fontSize:25,fontWeight:'bold',color:'#165DFF',textAlign:'center'}}>
                    搜索商户
                </div>
                <div style={{width:'90%',background:'white',marginLeft:'5%',marginTop:'2%',borderRadius:10,border:'1px solid grey',maxHeight:'90%',overflow:'auto'}}>
                    <div style={{width:'90%',marginLeft:'5%',marginTop:22,marginBottom:25,textAlign:'center'}}>
                        <InputSearch
                            size={"large"}
                            allowClear
                            searchButton='搜索'
                            placeholder='请输入商户名称关键词......'
                            style={{ width: 350 }}
                        />
                        <div style={{marginTop:10,textAlign:'left',fontSize:17,color:'grey',marginLeft:10}}>搜索结果</div>
                        <Table columns={column} data={data} style={{marginTop:8}}/>
                    </div>
                </div>
                </div>
        </div>
    )
}

export default SearchShops