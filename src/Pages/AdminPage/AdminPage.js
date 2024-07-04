import './AdminPage.css'
import { Menu } from '@arco-design/web-react';
import {Outlet} from "react-router-dom";
import admin from './images/admin.png'
import {IconFile, IconHome, IconSettings, IconSunFill, IconUser, IconUserGroup} from "@arco-design/web-react/icon";

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;
const AdminPage=()=>{
    return (
        <div className={'adminBackground'}>
            <div style={{height:"100%",width:'13%',backgroundColor:'white'}}>
                <div style={{width:'100%',height:'15%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <img src={admin} alt={'admin'} style={{height:'90%'}}/>
                </div>
                <Menu style={{height:"85%",width:'100%'}}>
                    <SubMenu
                        key='1'
                        title={
                            <>
                                <IconSettings />网站管理
                            </>
                        }
                    >
                        <MenuItem key='1_1'>文章</MenuItem>
                        <MenuItem key='1_2'>权限</MenuItem>
                        <MenuItem key='1_3'>天气</MenuItem>
                        <MenuItem key='1_4'>系统配置</MenuItem>
                    </SubMenu>
                    <SubMenu
                        key='2'
                        title={
                            <>
                                <IconUser />用户管理
                            </>
                        }
                    >
                        <MenuItem key='2_1'>查看用户</MenuItem>
                        <MenuItem key='2_2'>注销用户</MenuItem>
                        <MenuItem key='2_3'>密码</MenuItem>
                        <MenuItem key='2_4'>基本信息</MenuItem>
                    </SubMenu>
                    <SubMenu
                        key='3'
                        title={
                            <>
                                <IconHome />商户管理
                            </>
                        }
                    >
                        <MenuItem key='3_1'>查看商户</MenuItem>
                        <MenuItem key='3_2'>推荐商户</MenuItem>
                        <MenuItem key='3_3'>注销商户</MenuItem>
                    </SubMenu>
                    <SubMenu
                        key='4'
                        title={
                            <>
                                <IconUserGroup />群组管理
                            </>
                        }
                    >
                        <MenuItem key='4_1'>查看群组</MenuItem>
                        <MenuItem key='4_2'>解散群组</MenuItem>
                    </SubMenu>
                </Menu>
            </div>
            <div style={{height:'100%',width:'87%'}}>
                <Outlet />
            </div>
        </div>
    )
}

export default AdminPage