import InitialPage from "./InitialPage";
import SignInPage from "./Pages/SignInPage/SignInPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import TouristRegister from "./Pages/RegisterPage/TouristRegister";
import ShopkeeperRegister from "./Pages/RegisterPage/ShopkeeperRegister";
import AdminPage from "./Pages/AdminPage/AdminPage";
import SystemConfiguration from "./Pages/Components/SystemConfiguration";
import AdminManageFiles from "./Pages/AdminPage/componnets/AdminManageFiles";
import Weather from "./Pages/Components/Weather";
import AdminManagePermissions from "./Pages/AdminPage/componnets/AdminManagePermissions";
import AdminViewShops from "./Pages/AdminPage/componnets/AdminViewShops";
import PasswordManage from "./Pages/Components/PasswordManage";
import AdminBasicInformation from "./Pages/AdminPage/componnets/AdminBasicInformation";
import AdminViewUsers from "./Pages/AdminPage/componnets/AdminViewUsers";
import AdminViewGroups from "./Pages/AdminPage/componnets/AdminViewGroups";
import TouristPage from "./Pages/TouristPage/TouristPage";
import TouristViewShops from "./Pages/TouristPage/components/TouristViewShops";
import TouristViewProducts from "./Pages/TouristPage/components/TouristViewProducts";
import SearchShops from "./Pages/Components/SearchShops";
import TouristCommentShops from "./Pages/TouristPage/components/TouristCommentShops";
import TouristBasicInformation from "./Pages/TouristPage/components/TouristBasicInformation";
import TouristFriend from "./Pages/TouristPage/components/TouristFriend";
import TouristComments from "./Pages/TouristPage/components/TouristComments";
import TouristCollection from "./Pages/TouristPage/components/TouristCollection";
import TouristManageGroup from "./Pages/TouristPage/components/TouristManageGroup";
import ManageDiscussion from "./Pages/Components/ManageDiscussion";
import ChatRoom from './Pages/Components/ChatRoom';
import TouristManageRecommendation from "./Pages/TouristPage/components/TouristManageRecommendation";
import ShopkeeperPage from "./Pages/ShopkeeperPage/ShopkeeperPage";
import ShopInformation from "./Pages/ShopkeeperPage/components/ShopInformation";
import ShopProducts from "./Pages/ShopkeeperPage/components/ShopProducts";
import ShopBasicInformation from "./Pages/ShopkeeperPage/components/ShopBasicInformation";
import ShopManageGroup from "./Pages/ShopkeeperPage/components/ShopManageGroup";
import ShopManageMember from "./Pages/ShopkeeperPage/components/ShopManageMember";
import ManagementType from "./Pages/ShopkeeperPage/components/ManagementType";
import ManagementEnvironment from "./Pages/ShopkeeperPage/components/ManagementEnvironment";
import ManagementPlace from "./Pages/ShopkeeperPage/components/ManagementPlace";
import ProductSort from "./Pages/ShopkeeperPage/components/ProductSort";
import ShopImage from "./Pages/ShopkeeperPage/components/ShopImage";
import ShopMap from "./Pages/ShopkeeperPage/components/ShopMap";


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
                path:'/admin/permission',
                element:<AdminManagePermissions/>
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
                path: '/tourist/systemConfiguration',
                element:<SystemConfiguration/>
            },
            {
                path: '/tourist/weather',
                element:<Weather/>
            },
            {
                path: '/tourist/viewShop',
                element:<TouristViewShops/>
            },
            {
                path: '/tourist/viewProduct',
                element:<TouristViewProducts/>
            },
            {
                path: '/tourist/search',
                element:<SearchShops/>
            },
            {
                path: '/tourist/commentShop',
                element:<TouristCommentShops/>
            },
            {
                path: '/tourist/password',
                element:<PasswordManage/>
            },
            {
                path: '/tourist/basicInformation',
                element:<TouristBasicInformation/>
            },
            {
                path: '/tourist/friend',
                element:<TouristFriend/>
            },
            {
                path: '/tourist/comments',
                element:<TouristComments/>
            },
            {
                path: '/tourist/collection',
                element:<TouristCollection/>
            },
            {
                path: '/tourist/group',
                element:<TouristManageGroup/>
            },
            {
                path: '/tourist/discussion',
                element:<ManageDiscussion/>
            },
            {
                path: '/tourist/recommendGroup',
                element:<TouristManageRecommendation/>
            },
        ]
    },
    {
        path: '/shopkeeper',
        element:<ShopkeeperPage/>,
        children: [
            {
                path: '/shopkeeper/systemConfiguration',
                element:<SystemConfiguration/>
            },
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
                path: '/shopkeeper/password',
                element:<PasswordManage/>
            },
            {
                path: '/shopkeeper/basicInformation',
                element:<ShopBasicInformation/>
            },
            {
                path: '/shopkeeper/group',
                element:<ShopManageGroup/>
            },
            {
                path: '/shopkeeper/member',
                element:<ShopManageMember/>
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
                path: '/shopkeeper/shopInformation/type',
                element: <ManagementType/>
            },
            {
                path: '/shopkeeper/shopInformation/environment',
                element: <ManagementEnvironment/>
            },
            {
                path: '/shopkeeper/shopInformation/place',
                element: <ManagementPlace/>
            },
            {
                path: '/shopkeeper/shopInformation/product',
                element: <ProductSort/>
            },
            {
                path: '/shopkeeper/shopInformation/map',
                element: <ShopMap/>
            },
            {
                path: '/shopkeeper/shopInformation/image',
                element: <ShopImage/>
            },
        ]
    }
]

export default routes