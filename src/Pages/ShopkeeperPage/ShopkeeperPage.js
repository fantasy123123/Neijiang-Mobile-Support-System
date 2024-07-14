import './ShopkeeperPage.css'
import {Button, Menu} from '@arco-design/web-react';
import {Outlet, useNavigate} from "react-router-dom";
import shop from './images/shop.png'
import {
    IconHome, IconSettings, IconUserGroup,
} from "@arco-design/web-react/icon";
import {useEffect} from "react";

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;
const ShopkeeperPage=()=>{
    const navigate=useNavigate()
    useEffect(()=>{
        navigate('/shopkeeper')
    },[])

    return (
        <div className={'shopkeeperBackground'}>
            <div style={{height: "100%", width: '13%', backgroundColor: 'white'}}>
                <div style={{
                    width: '100%',
                    height: '15%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <img src={shop} alt={'tourist'} style={{height: '100%'}}/>
                </div>
                <Menu style={{height: "85%", width: '100%'}}>
                    <SubMenu
                        key='1'
                        title={
                            <>
                                <IconHome />商户管理
                            </>
                        }
                    >
                        <MenuItem key='1_1' onClick={()=>{navigate('/shopkeeper/shopInformation')}}>商户信息</MenuItem>
                        <MenuItem key='1_2' onClick={()=>{navigate('/shopkeeper/product')}}>商户产品</MenuItem>
                        <MenuItem key='1_3' onClick={()=>{navigate('/shopkeeper/search')}}>搜索商户</MenuItem>
                        <MenuItem key='1_4' onClick={()=>{navigate('/shopkeeper/password')}}>密码</MenuItem>
                    </SubMenu>

                    <SubMenu
                        key='3'
                        title={
                            <>
                                <IconUserGroup />群组管理
                            </>
                        }
                    >
                        <MenuItem key='3_1' onClick={()=>{navigate('/shopkeeper/group')}}>群组</MenuItem>
                        <MenuItem key='3_3' onClick={()=>{navigate('/shopkeeper/discussion')}}>群组讨论</MenuItem>
                    </SubMenu>
                    <SubMenu
                        key='4'
                        title={
                            <>
                                <IconSettings />网站管理
                            </>
                        }
                    >
                        <MenuItem key='4_1' onClick={()=>{navigate('/shopkeeper/weather')}}>天气</MenuItem>
                    </SubMenu>
                    <Button
                        size={'large'}
                        status={'danger'}
                        style={{border:'#F53F3F 1px solid',marginTop:10,float:'right',marginRight:15}}
                        onClick={()=>{
                            if(window.confirm('确认登出？')){
                                localStorage.removeItem('token')
                                localStorage.removeItem('accountId')
                                localStorage.removeItem('roleId')
                                navigate('/signIn')
                            }
                        }}
                    >
                        登出
                    </Button>
                </Menu>
            </div>
            <div style={{height: '100%', width: '87%'}}>
                <Outlet/>
            </div>
        </div>
    );
}

export default ShopkeeperPage