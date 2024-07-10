//已完成

import {Button, InputNumber, Radio, Switch} from "@arco-design/web-react";
const SystemConfiguration=()=>{
    return (
        <div style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <div style={{width:"90%",height:'90%'}}>
                <div style={{fontSize:25,fontWeight:'bold',color:'#165DFF',textAlign:'center'}}>
                    系统配置
                </div>
                <div style={{width:'100%',display:'flex',marginTop:'3%'}}>
                    <div style={{width:'30%',marginLeft:'10%',fontSize:20,color:'grey'}}>
                        <div style={{height:50,width:'100%',justifyContent:'right',display:'flex',alignItems:'center'}}>
                            登录时是否使用验证码
                        </div>
                        <div style={{height:50,width:'100%',justifyContent:'right',display:'flex',alignItems:'center'}}>
                            设置验证码位数
                        </div>
                        <div style={{height:50,width:'100%',justifyContent:'right',display:'flex',alignItems:'center'}}>
                            验证码字符构成
                        </div>
                        <div style={{height:50,width:'100%',justifyContent:'right',display:'flex',alignItems:'center'}}>
                            验证码包含字符时是否判断大小写
                        </div>
                        <div style={{height:50,width:'100%',justifyContent:'right',display:'flex',alignItems:'center'}}>
                            网页超时时限
                        </div>
                        <div style={{height:50,width:'100%',justifyContent:'right',display:'flex',alignItems:'center'}}>
                            是否启用COOKIES
                        </div>
                        <div style={{height:50,width:'100%',justifyContent:'right',display:'flex',alignItems:'center'}}>
                            是否启用用户等级系统
                        </div>
                    </div>
                    <div style={{width:'30%',marginLeft:"5%",fontSize:20,color:'grey'}}>
                        <div style={{height:50,width:'100%',display:'flex',alignItems:'center'}}>
                            <Switch checkedText='是' uncheckedText='否' size={'default'} checked/>
                        </div>
                        <div style={{height:50,width:'100%',display:'flex',alignItems:'center'}}>
                            <InputNumber
                                defaultValue={4}
                                min={4}
                                max={6}
                                style={{ width: 60 }}
                            />
                            &nbsp;位
                        </div>
                        <div style={{height:50,width:'100%',display:'flex',alignItems:'center'}}>
                            <Radio.Group defaultValue={'混合'}>
                                {['字母', '数字', '混合'].map((item) => {
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
                        <div style={{height:50,width:'100%',display:'flex',alignItems:'center'}}>
                            <Switch checkedText='是' uncheckedText='否' checked size={'default'}/>
                        </div>
                        <div style={{height:50,width:'100%',display:'flex',alignItems:'center'}}>
                            <InputNumber
                                defaultValue={5}
                                min={5}
                                max={10}
                                style={{ width: 60 }}
                            />
                            &nbsp;s
                        </div>
                        <div style={{height:50,width:'100%',display:'flex',alignItems:'center'}}>
                            <Switch checkedText='是' uncheckedText='否' checked size={'default'}/>
                        </div>
                        <div style={{height:50,width:'100%',display:'flex',alignItems:'center'}}>
                            <Switch checkedText='是' uncheckedText='否' checked size={'default'}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SystemConfiguration