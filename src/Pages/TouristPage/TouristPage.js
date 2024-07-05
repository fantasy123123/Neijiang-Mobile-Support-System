import './TouristPage.css'
import { Menu } from '@arco-design/web-react';
import {Outlet, useNavigate} from "react-router-dom";
import {
    IconHome,
    IconSettings,
    IconUser,
    IconUserGroup
} from "@arco-design/web-react/icon";
import tourist from './images/tourist.png'

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;
const TouristPage=()=>{
    const navigate=useNavigate()
    return (
        <div className={'touristBackground'}>
            <div style={{height:"100%",width:'13%',backgroundColor:'white'}}>
                <div style={{width:'100%',height:'15%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <img src={tourist} alt={'tourist'} style={{height:'90%'}}/>
                </div>
                <Menu style={{height:"85%",width:'100%'}}>
                    <SubMenu
                        key='1'
                        title={
                            <>
                                <IconUser />用户管理
                            </>
                        }
                    >
                        <MenuItem key='1_1' onClick={()=>{navigate('/tourist/collection')}}>收藏</MenuItem>
                        <MenuItem key='1_2' onClick={()=>{navigate('/tourist/comments')}}>评论</MenuItem>
                        <MenuItem key='1_3' onClick={()=>{navigate('/tourist/friend')}}>好友</MenuItem>
                        <MenuItem key='1_4' onClick={()=>{navigate('/tourist/password')}}>密码</MenuItem>
                        <MenuItem key='1_5' onClick={()=>{navigate('/tourist/basicInformation')}}>基本信息</MenuItem>
                    </SubMenu>
                    <SubMenu
                        key='2'
                        title={
                            <>
                                <IconHome />商户管理
                            </>
                        }
                    >
                        <MenuItem key='2_1' onClick={()=>{navigate('/tourist/viewShop')}}>商户信息</MenuItem>
                        <MenuItem key='2_2' onClick={()=>{navigate('/tourist/viewProduct')}}>商户产品</MenuItem>
                        <MenuItem key='2_3' onClick={()=>{navigate('/tourist/search')}}>搜索商户</MenuItem>
                        <MenuItem key='2_4' onClick={()=>{navigate('/tourist/commentShop')}}>评价商户</MenuItem>
                    </SubMenu>
                    <SubMenu
                        key='3'
                        title={
                            <>
                                <IconUserGroup />群组管理
                            </>
                        }
                    >
                        <MenuItem key='3_1' onClick={()=>{navigate('/tourist/group')}}>群组</MenuItem>
                        <MenuItem key='3_2' onClick={()=>{navigate('/tourist/discussion')}}>群组讨论</MenuItem>
                        <MenuItem key='3_3' onClick={()=>{navigate('/tourist/recommendGroup')}}>群组推荐</MenuItem>
                    </SubMenu>
                    <SubMenu
                        key='4'
                        title={
                            <>
                                <IconSettings />网站管理
                            </>
                        }
                    >
                        <MenuItem key='4_1' onClick={()=>{navigate('/tourist/weather')}}>天气</MenuItem>
                        <MenuItem key='4_2' onClick={()=>{navigate('/tourist/systemConfiguration')}}>系统配置</MenuItem>
                    </SubMenu>
                </Menu>
            </div>
            <div style={{height:'100%',width:'87%'}}>
                <Outlet />
            </div>
        </div>
    )
}

export default TouristPage