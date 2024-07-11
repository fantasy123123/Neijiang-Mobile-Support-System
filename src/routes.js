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
import AdminLogoutShops from "./Pages/AdminPage/componnets/AdminLogoutShops";
import AdminRecommendShops from "./Pages/AdminPage/componnets/AdminRecommendShops";
import PasswordManage from "./Pages/Components/PasswordManage";
import AdminBasicInformation from "./Pages/AdminPage/componnets/AdminBasicInformation";
import AdminViewUsers from "./Pages/AdminPage/componnets/AdminViewUsers";
import AdminLogoutUsers from "./Pages/AdminPage/componnets/AdminLogoutUsers";
import AdminViewGroups from "./Pages/AdminPage/componnets/AdminViewGroups";
import AdminDissolveGroup from "./Pages/AdminPage/componnets/AdminDissolveGroup";
import TouristPage from "./Pages/TouristPage/TouristPage";
import SearchShops from "./Pages/Components/SearchShops";
import TouristHome from "./Pages/TouristPage/components/TouristHome";
import MerchantDetail from "./Pages/TouristPage/components/MerchantDetail";
import ManageDiscussion from "./Pages/Components/ManageDiscussion";
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
import ProductDetail from "./Pages/TouristPage/components/ProductDetail";
import MerchantCatrgory from "./Pages/TouristPage/components/MerchantCategory";


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
                path:'/admin/logoutShop',
                element:<AdminLogoutShops/>
            },
            {
                path:'/admin/recommendShop',
                element:<AdminRecommendShops/>
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
                path:'/admin/logoutUser',
                element:<AdminLogoutUsers/>
            },
            {
                path:'/admin/viewGroup',
                element:<AdminViewGroups/>
            },
            {
                path:'/admin/dissolveGroup',
                element:<AdminDissolveGroup/>
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
                element: <MerchantCatrgory />
            },
            {
                path: '/tourist/merchant/:merchantId',
                element: <MerchantDetail/>
            },
            {
                path: '/tourist/product/:productId',
                element: <ProductDetail/>
            }
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