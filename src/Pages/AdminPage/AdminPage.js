import './AdminPage.css'
import { Menu } from '@arco-design/web-react';
import {Outlet, useNavigate} from "react-router-dom";
import admin from './images/admin.png'
import {IconHome, IconInfoCircle, IconLock, IconSettings, IconUser, IconUserGroup} from "@arco-design/web-react/icon";
import {useEffect, useState} from "react";
import axiosInstance from "../../api/AxiosApi";

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;
const AdminPage=()=>{
    const navigate=useNavigate()

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
                        <MenuItem key='1_1' onClick={()=>{navigate('/admin/file')}}>文章</MenuItem>
                        <MenuItem key='1_2' onClick={()=>{navigate('/admin/permission')}}>权限</MenuItem>
                        <MenuItem key='1_3' onClick={()=>{navigate('/admin/weather')}}>天气</MenuItem>
                        <MenuItem key='1_4' onClick={()=>{navigate('/admin/systemConfiguration')}}>系统配置</MenuItem>
                    </SubMenu>
                    <MenuItem key='2' onClick={()=>{navigate('/admin/viewUser')}}><IconUser />用户管理</MenuItem>
                    <MenuItem key='3' onClick={()=>{navigate('/admin/viewShop')}}><IconHome />商户管理</MenuItem>
                    <MenuItem key='4' onClick={()=>{navigate('/admin/viewGroup')}}><IconUserGroup />群组管理</MenuItem>
                    <MenuItem key='5' onClick={()=>{navigate('/admin/password')}}><IconLock />密码</MenuItem>
                    <MenuItem key='6' onClick={()=>{navigate('/admin/basicInformation')}}><IconInfoCircle />基本信息</MenuItem>
                </Menu>
            </div>
            <div style={{height:'100%',width:'87%'}}>
                <Outlet />
            </div>
        </div>
    )
}

export default AdminPage