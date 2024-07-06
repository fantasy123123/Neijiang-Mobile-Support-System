import {useNavigate} from "react-router-dom";
import {Button, Descriptions, Input, Modal, Radio} from "@arco-design/web-react";
import {useState} from "react";

const ManagementEnvironment=()=>{
    const navigate=useNavigate()
    const [ifEdit,setIfEdit]=useState(false)

    const [initData,setInitData]=useState({
        name:'name',
        description:'description',
        ifUse:true,
        time:'test',
        person:'test',
    })

    const [name,setName]=useState(initData.name)
    const [description,setDescription]=useState(initData.description)
    const [ifUse,setIfUse]=useState(initData.ifUse)

    let tempName=name
    let tempDescription=description
    let tempIfUse=ifUse

    const column = [
        {
            label: '经营环境名称',
            value: name,
        },
        {
            label: '经营环境说明',
            value: description,
        },
        {
            label: '经营环境是否可用',
            value: ifUse?'是':'否',
        },
        {
            label: '创建时间',
            value: initData.time,
        },
        {
            label: '创建人',
            value: initData.person,
        },
    ];
    return (
        <div style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <div style={{width:"90%",height:'90%'}}>
                <div style={{fontSize:25,fontWeight:'bold',color:'#165DFF',textAlign:'center'}}>
                    设置经营环境
                </div>
                <div style={{width:'90%',background:'white',marginLeft:'5%',marginTop:'3%',borderRadius:10,border:'1px solid grey'}}>
                    <Descriptions
                        size={'large'}
                        style={{padding:50}}
                        title='经营环境'
                        data={column}
                        labelStyle={{ textAlign: 'right' }}
                    />
                </div>
                <div style={{display:"flex",justifyContent:'right',marginTop:'3%',marginRight:'5%'}}>
                    <Button
                        type={'primary'}
                        size={"large"}
                        style={{marginRight:30}}
                        onClick={()=>{setIfEdit(true)}}
                    >
                        修改
                    </Button>
                    <Button
                        size={"large"}
                        style={{border:'1px solid #FF7D00',marginRight:30}}
                        onClick={()=>{navigate('/shopkeeper/shopInformation')}}
                        status={'warning'}
                    >
                        返回
                    </Button>
                </div>
                <Modal
                    title='修改经营环境'
                    unmountOnExit={true}
                    maskClosable={false}
                    visible={ifEdit}
                    onOk={() => {
                        setName(tempName)
                        setDescription(tempDescription)
                        setIfUse(tempIfUse)
                        setIfEdit(false)
                    }}
                    onCancel={() => {
                        setIfEdit(false)
                    }}
                    autoFocus={false}
                >
                    <div style={{display:'flex',width:'100%',justifyContent:'space-between'}}>
                        <div style={{width:'27%'}}>
                            <div style={{height:50,width:'100%',justifyContent:'right',display:'flex',alignItems:'center'}}>
                                经营环境名称
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'right',display:'flex',alignItems:'center'}}>
                                经营环境说明
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'right',display:'flex',alignItems:'center'}}>
                                经营环境是否可用
                            </div>
                        </div>
                        <div style={{width:'65%'}}>
                            <div style={{height:50,width:'100%',justifyContent:'left',display:'flex',alignItems:'center'}}>
                                <Input
                                    defaultValue={name}
                                    onChange={value=>{tempName=value}}
                                    style={{width:'90%'}}
                                />
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'left',display:'flex',alignItems:'center'}}>
                                <Input.TextArea
                                    autoSize={{ minRows: 1, maxRows: 2 }}
                                    defaultValue={description}
                                    onChange={value=>{tempDescription=value}}
                                    style={{width:'90%'}}
                                />
                            </div>
                            <div style={{height:50,width:'100%',justifyContent:'left',display:'flex',alignItems:'center'}}>
                                <Radio.Group onChange={value=>{tempIfUse=(value==='是')}} defaultValue={ifUse?'是':'否'} name='button-radio-group'>
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

export default ManagementEnvironment