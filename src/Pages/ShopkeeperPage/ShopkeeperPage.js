import './ShopkeeperPage.css'
import { Menu } from '@arco-design/web-react';
import {Outlet} from "react-router-dom";
import shop from './images/shop.png'
import {
    IconHome,
    IconImage,
    IconLocation,
    IconMessage,
    IconMobile, IconSearch, IconSettings,
    IconShareInternal, IconStar, IconThumbUp,
    IconUser, IconUserGroup,
} from "@arco-design/web-react/icon";

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;
const ShopkeeperPage=()=>{
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
                        <MenuItem key='1_1'>商户信息</MenuItem>
                        <MenuItem key='1_2'>商户产品</MenuItem>
                        <MenuItem key='1_3'>搜索商户</MenuItem>
                    </SubMenu>
                    <SubMenu
                        key='2'
                        title={
                            <>
                                <IconUser />用户管理
                            </>
                        }
                    >
                        <MenuItem key='2_1'>密码</MenuItem>
                        <MenuItem key='2_2'>基本信息</MenuItem>
                    </SubMenu>

                    <SubMenu
                        key='3'
                        title={
                            <>
                                <IconUserGroup />群组管理
                            </>
                        }
                    >
                        <MenuItem key='3_1'>群组</MenuItem>
                        <MenuItem key='3_2'>群组会员</MenuItem>
                        <MenuItem key='3_3'>群组讨论</MenuItem>
                    </SubMenu>
                    <SubMenu
                        key='4'
                        title={
                            <>
                                <IconSettings />网站管理
                            </>
                        }
                    >
                        <MenuItem key='4_1'>天气</MenuItem>
                        <MenuItem key='4_2'>系统配置</MenuItem>
                    </SubMenu>
                </Menu>
            </div>
            <div style={{height: '100%', width: '87%'}}>
                <Outlet/>
            </div>
        </div>
    );
}

export default ShopkeeperPage