//已完成

import './RegisterPage.css'
import picture2 from './image/picture2.png'
import shop from './image/shop.png'
import {useEffect, useRef, useState} from "react";
import {Button, Checkbox, Form, Input, Message} from "@arco-design/web-react";
import {useNavigate} from "react-router-dom";
import axiosInstance from "../../api/AxiosApi";

const FormItem = Form.Item;

const ShopkeeperRegister=()=>{
    const navigate=useNavigate()
    const formRef = useRef();
    useEffect(() => {
        formRef.current.setFieldsValue({
            rate: 5,
        });
    }, []);
    const [username,setUsername]=useState(null)
    const [pwd,setPwd]=useState(null)
    const [name,setName]=useState(null)
    const [phone,setPhone]=useState(null)
    const [email,setEmail]=useState(null)

    return (
        <div className={'RegisterPage'}>
            <div className={'registerCard'} style={{display:'flex'}}>
                <div style={{width:'50%',height:'100%'}}>
                    <img
                        style={{width:'100%',height:'100%',borderBottomLeftRadius: '10px',borderTopLeftRadius:'10px'}}
                        alt={'picture'}
                        src={picture2}
                    />
                </div>
                <div style={{width:'50%',height:'100%',position:'relative'}}>
                    <div style={{position:'absolute',top:'5%',left:'7.5%',width:'35%',textAlign:'center'}}>
                        <div style={{fontSize:25,fontWeight:'bold',color:'#165DFF'}}>
                            注册商户信息
                        </div>
                        <img
                            src={shop}
                            alt={'picture'}
                            width={'100%'}
                        />
                    </div>
                    <Form
                        ref={formRef}
                        size={'large'}
                        layout={'vertical'}
                        labelAlign={'right'}
                    >
                        <div style={{position:'absolute',top:'11%',right:'9%',width:'40%'}}>
                            <FormItem label='用户名' field='用户名' style={{width:'100%'}}  rules={[{ required: true }]}>
                                <Input onChange={value => {setUsername(value)}} placeholder='请输入用户名' />
                            </FormItem>
                            <FormItem label='密码' field='密码' style={{width:'100%'}} rules={[{ required: true }]}>
                                <Input onChange={value => {setPwd(value)}} placeholder='请输入密码' />
                            </FormItem>
                            <FormItem label='昵称' field='昵称' style={{width:'100%'}}>
                                <Input onChange={value => {setName(value)}} placeholder='请输入昵称' />
                            </FormItem>
                        </div>
                        <div style={{position:'absolute',bottom:'8%',left:'5%',width:'40%'}}>
                            <FormItem label='联系方式' field='联系方式' style={{width:'100%'}}>
                                <Input onChange={value => {setPhone(value)}} placeholder='请输入联系方式' />
                            </FormItem>
                            <FormItem label='邮箱' style={{width:'100%'}} field='邮箱'>
                                <Input onChange={value => {setEmail(value)}} placeholder='请输入邮箱' />
                            </FormItem>
                        </div>
                        <div style={{position:'absolute',right:'6%',bottom:'1%',width:'40%'}}>
                            <FormItem style={{width:'100%',textAlign:'center'}}>
                                <Button
                                    type='primary'
                                    htmlType='submit'
                                    style={{width:'80%'}}
                                    onClick={()=>{
                                        axiosInstance.post('/accounts', {
                                            username:username,
                                            password:pwd,
                                            roleId:2
                                        })
                                            .then(res => {
                                                Message.info('注册成功！')
                                                navigate('/signIn')
                                            })
                                            .catch(error => {
                                                console.error(error);
                                            });
                                    }}
                                >
                                    提交
                                </Button>
                            </FormItem>
                            <FormItem style={{width:'100%'}}>
                                <Button
                                    style={{border:'solid 1px #4E5969',marginLeft:'10%',width:'30%'}}
                                    onClick={() => {
                                        formRef.current.resetFields();
                                    }}
                                >
                                    重置
                                </Button>
                                <Button onClick={()=>{navigate('/register')}} style={{float:'right',border:'solid 1px #FF7D00',marginRight:'10%',width:'30%'}} status={'warning'}>
                                    返回
                                </Button>
                            </FormItem>
                            <FormItem style={{marginLeft:'10%'}} rules={[{ type: 'boolean', true: true }]}  field='readme'>
                                <Checkbox>我已阅读相关文件</Checkbox>
                            </FormItem>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default ShopkeeperRegister