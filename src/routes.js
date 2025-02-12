import InitialPage from "./InitialPage";
import SignInPage from "./Pages/SignInPage/SignInPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import TouristRegister from "./Pages/RegisterPage/TouristRegister";
import ShopkeeperRegister from "./Pages/RegisterPage/ShopkeeperRegister";
import AdminPage from "./Pages/AdminPage/AdminPage";
import SystemConfiguration from "./Pages/Components/SystemConfiguration";
import AdminManageFiles from "./Pages/AdminPage/componnets/AdminManageFiles";
import Weather from "./Pages/Components/Weather";
import AdminViewShops from "./Pages/AdminPage/componnets/AdminViewShops";
import PasswordManage from "./Pages/Components/PasswordManage";
import AdminBasicInformation from "./Pages/AdminPage/componnets/AdminBasicInformation";
import AdminViewUsers from "./Pages/AdminPage/componnets/AdminViewUsers";
import AdminViewGroups from "./Pages/AdminPage/componnets/AdminViewGroups";
import TouristPage from "./Pages/TouristPage/TouristPage";
import SearchShops from "./Pages/Components/SearchShops";
import TouristHome from "./Pages/TouristPage/components/TouristHome";
import MerchantDetail from "./Pages/TouristPage/components/MerchantDetail";
import ManageDiscussion from "./Pages/Components/ManageDiscussion";
import ChatRoom from './Pages/Components/ChatRoom';
import ShopkeeperPage from "./Pages/ShopkeeperPage/ShopkeeperPage";
import ShopInformation from "./Pages/ShopkeeperPage/ShopInformation";
import ShopProducts from "./Pages/ShopkeeperPage/ShopProducts";
import ShopManageGroup from "./Pages/ShopkeeperPage/ShopManageGroup";
import ShopImage from "./Pages/ShopkeeperPage/ShopImage";
import ShopMap from "./Pages/ShopkeeperPage/ShopMap";
import TouristFavorite from "./Pages/TouristPage/components/TouristFavorite";
import ShopDiscount from "./Pages/ShopkeeperPage/ShopDiscount";
import MerchantCategory from "./Pages/TouristPage/components/MerchantCategory";
import ProductDetail from "./Pages/TouristPage/components/ProductDetail";
import TouristArticle from "./Pages/TouristPage/components/TouristArticle";
import TouristArticleEdit from "./Pages/TouristPage/components/TouristArticleEdit.tsx";

import TouristComment from "./Pages/TouristPage/components/TouristComment";
import TouristInfo from "./Pages/TouristPage/components/TouristInfo";
import TouristGroup from "./Pages/TouristPage/components/TouristGroup";
import GroupChat from "./Pages/TouristPage/components/GroupChat";
import SearchResult from "./Pages/TouristPage/components/SearchResult"
import TouristWeather from "./Pages/TouristPage/components/TouristWeather";
import ShopComments from "./Pages/ShopkeeperPage/ShopComments";
import ProductComments from "./Pages/ShopkeeperPage/ProductComments";

const routes=[
    {
        path: '/',
        element: <InitialPage />
    },
    {
        path: '/SignIn',
        element: <SignInPage />
    },
    {
        path: '/Register',
        element: <RegisterPage />
    },
    {
        path: '/Register/TouristRegister',
        element: <TouristRegister />
    },
    {
        path: '/Register/ShopkeeperRegister',
        element: <ShopkeeperRegister />
    },
    {
        path: '/admin',
        element:<AdminPage/>,
        children:[
            {
                path:'/admin/systemConfiguration',
                element:<SystemConfiguration/>
            },
            {
                path:'/admin/file',
                element:<AdminManageFiles/>
            },
            {
                path:'/admin/weather',
                element:<Weather/>
            },
            {
                path:'/admin/viewShop',
                element:<AdminViewShops/>
            },
            {
                path:'/admin/password',
                element:<PasswordManage />
            },
            {
                path:'/admin/basicInformation',
                element:<AdminBasicInformation/>
            },
            {
                path:'/admin/viewUser',
                element:<AdminViewUsers/>
            },
            {
                path:'/admin/viewGroup',
                element:<AdminViewGroups/>
            },
        ]
    },
    {
        path: '/tourist',
        element:<TouristPage/>,
        children: [
            {
                path: '/tourist/home',
                element: <TouristHome/>
            },
            {
                path: '/tourist/merchant/category/:categoryId',
                element: <MerchantCategory />
            },
            {
                path: '/tourist/merchant/:merchantId',
                element: <MerchantDetail/>
            },
            {
                path: '/tourist/product/:productId',
                element: <ProductDetail/>
            },
            {
                path: '/tourist/article',
                element: <TouristArticle/>
            },
            {
                path: '/tourist/article/edit',
                element: <TouristArticleEdit/>
            },
            {
                path: '/tourist/comment',
                element: <TouristComment />
            },
            {
                path: '/tourist/favorite',
                element: <TouristFavorite />
            },
            {
                path: '/tourist/profile',
                element: <TouristInfo />
            },
            {
                path: '/tourist/group',
                element: <TouristGroup />,
                children: [
                    {
                        path: '/tourist/group/chat/:groupId',
                        element: <GroupChat />
                    }
                ]
            },
            {
                path: '/tourist/search',
                element: <SearchResult />
            },
            {
                path: '/tourist/weather',
                element: <TouristWeather />
            }
        ]
    },
    {
        path: '/shopkeeper',
        element:<ShopkeeperPage/>,
        children: [
            {
                path: '/shopkeeper/weather',
                element:<Weather/>
            },
            {
                path: '/shopkeeper/search',
                element:<SearchShops/>
            },
            {
                path: '/shopkeeper/shopInformation',
                element:<ShopInformation/>
            },
            {
                path: '/shopkeeper/product',
                element:<ShopProducts/>
            },
            {
                path: '/shopkeeper/shopComments',
                element:<ShopComments/>
            },
            {
                path: '/shopkeeper/productComments',
                element:<ProductComments/>
            },
            {
                path: '/shopkeeper/password',
                element:<PasswordManage/>
            },
            {
                path: '/shopkeeper/group',
                element:<ShopManageGroup/>
            },
            {
                path: '/shopkeeper/discussion',
                element:<ManageDiscussion/>
            },
            {
                path: "/shopkeeper/chat/:groupId",
                element: <ChatRoom/>
            },
            {
                path: '/shopkeeper/shopInformation/map',
                element: <ShopMap/>
            },
            {
                path: '/shopkeeper/shopInformation/discount',
                element: <ShopDiscount/>
            },
            {
                path: '/shopkeeper/shopInformation/image',
                element: <ShopImage/>
            },
        ]
    }
]

export default routes
