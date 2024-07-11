import styles from './TouristPage.module.css';
import { Layout, Menu, Message } from '@arco-design/web-react';
import { Outlet, useNavigate } from 'react-router-dom';
import { IconUser, IconHome, IconStar, IconList, IconMenu, IconFile, IconUserGroup } from '@arco-design/web-react/icon';
import { useEffect, useState } from 'react';
import axiosInstance from '../../Resquest/axiosInstance';
import { useUser } from '../../Context/UserContext';

const TouristPage = () => {
    const navigate = useNavigate();
    const {user, setUser} = useUser();
    const [merchantsCategories, setMerchantsCategories] = useState([]);

    useEffect(() => {
        axiosInstance.get('/users/accounts/3')
            .then(res => {
                setUser(res.data.data);
            })
            .catch(error => {
                console.error(error);
                Message.error('Failed to fetch userInfo');
            });

        axiosInstance.get('/merchants/categories')
            .then(res => {
                setMerchantsCategories(res.data.data);
            })
            .catch(error => {
                console.error(error);
                Message.error('Failed to fetch categories');
            });
    }, [setUser]);

    return (
        <div className={styles['touristBackground']}>
            <div className={styles['sideBar']} style={{ height: '100%', width: '15%'}}>
                <div style={{ width: '100%', height: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src='' alt='' height="100%" />
                </div>
                <Layout width={200} style={{ backgroundColor: '#fff' }}>
                    <Menu defaultSelectedKeys={['1']} style={{ height: '85%', width: '100%' }}>
                        <Menu.Item key='1' onClick={() => navigate('/tourist/home')}><><IconHome />主页</></Menu.Item>
                        <Menu.SubMenu key='2' title={<><IconList />商家分类</>}>
                            {merchantsCategories.map((category, index) => (
                                <Menu.Item key={`2_${index}`} onClick={
                                    () => navigate(`/tourist/merchant/category/${category.categoryId}`, { state : category})}>{
                                        <><IconMenu />{category.categoryName}</>
                                    }
                                </Menu.Item>
                            ))}
                        </Menu.SubMenu>
                        <Menu.Item key='3' onClick={() => navigate('/tourist/article')}><><IconFile />社区文章</></Menu.Item>
                        <Menu.Item key='4' onClick={() => navigate('/tourist/group')}><><IconUserGroup />我的群组</></Menu.Item>
                        <Menu.Item key='5' onClick={() => navigate('/tourist/comment')}><><IconUserGroup />我的评论</></Menu.Item>
                        <Menu.Item key='6' onClick={() => navigate('/tourist/collection')}><><IconStar />我的收藏</></Menu.Item>
                        <Menu.Item key='7' onClick={() => navigate('/tourist/profile')}><><IconUser />个人信息</></Menu.Item>
                    </Menu>
                </Layout>
            </div>
            <div style={{ height: '100%', width: '85%' }}>
                <Outlet />
            </div>
        </div>
    );
};

export default TouristPage;