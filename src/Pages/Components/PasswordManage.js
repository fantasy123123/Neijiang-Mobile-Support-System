//已完成

import {Button, Checkbox, Form, Input, Message} from "@arco-design/web-react";
import {useState} from "react";
import axiosInstance from "../../api/AxiosApi";
const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
        span: 7,
    },
    wrapperCol: {
        span: 16,
    },
};
const PasswordManage=()=>{
    const [name,setName]=useState('')
    const [pwd,setPwd]=useState('')
    const [pwdAgain,setPwdAgain]=useState('')

    return (
        <div style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <div style={{width:"90%",height:'90%'}}>
                <div style={{fontSize:25,fontWeight:'bold',color:'#165DFF',textAlign:'center'}}>
                    密码管理
                </div>
                <div style={{width:'80%',background:'white',marginLeft:'10%',marginTop:'2%',borderRadius:10,border:'1px solid grey',maxHeight:'80%',overflow:'auto'}}>
                    <div style={{marginTop:'2%',marginLeft:'5%',marginRight:'5%',marginBottom:'2%'}}>
                        <div style={{color:'grey',fontSize:22,textAlign:'center'}}>修改密码</div>
                        <Form
                            size={"large"}
                            style={{ width: '60%',marginLeft:'20%',marginTop:30 }}
                            autoComplete='off'
                            {...formItemLayout}
                        >
                            <FormItem label='新用户名' field='新用户名' rules={[{ required: true }]}>
                                <Input onChange={value=>{setName(value)}} placeholder='请输入您的新用户名' />
                            </FormItem>
                            <FormItem label='新密码' field='新密码' rules={[{ required: true }]}>
                                <Input onChange={value=>{setPwd(value)}} placeholder='请输入您的新密码' />
                            </FormItem>
                            <FormItem label='再次输入密码' field='再次输入密码' rules={[{ required: true }]}>
                                <Input onChange={value=>{setPwdAgain(value)}} placeholder='请再次输入您的密码' />
                            </FormItem>
                            <FormItem
                                wrapperCol={{ offset: 7 }}
                                field='readme'
                                triggerPropName='checked'
                                rules={[{ type: 'boolean', true: true }]}
                            >
                                <Checkbox>我已阅读相关规定</Checkbox>
                            </FormItem>
                            <FormItem wrapperCol={{ offset: 7 }}>
                                <Button
                                    type='primary'
                                    htmlType='submit'
                                    onClick={()=>{
                                        if(pwd===pwdAgain) {
                                            axiosInstance.put('/accounts/accounts',{
                                                "accountId": localStorage.getItem('accountId'),
                                                "username": name,
                                                "password": pwd,
                                                "roleId": localStorage.getItem('roleId')
                                            }).then(
                                                res=>{
                                                    Message.info('修改成功！')
                                                }
                                            ).catch(
                                                error=>{
                                                    console.log(error)
                                                }
                                            )
                                        }
                                        else {
                                            Message.error('两次输入的密码不一致！')
                                        }
                                    }}
                                >
                                    提交
                                </Button>
                            </FormItem>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PasswordManage