import InitialPage from "./InitialPage";
import SignInPage from "./Pages/SignInPage/SignInPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import AdminPage from "./Pages/AdminPage/AdminPage";
import TouristPage from "./Pages/TouristPage/TouristPage";
import ShopkeeperPage from "./Pages/ShopkeeperPage/ShopkeeperPage";
import ShopkeeperRegister from "./Pages/RegisterPage/ShopkeeperRegister";
import TouristRegister from "./Pages/RegisterPage/TouristRegister";
import SystemConfiguration from "./Pages/Components/WebsiteManagement/SystemConfiguration";
import AdminManageFiles from "./Pages/Components/WebsiteManagement/AdminManageFiles";
import Weather from "./Pages/Components/WebsiteManagement/Weather";
import AdminManagePermissions from "./Pages/Components/WebsiteManagement/AdminManagePermissions";
import AdminViewShops from "./Pages/Components/ShopManagement/AdminViewShops";
import AdminLogoutShops from "./Pages/Components/ShopManagement/AdminLogoutShops";
import AdminRecommendShops from "./Pages/Components/ShopManagement/AdminRecommendShops";
import PasswordManage from "./Pages/Components/UserManagement/PasswordManage";
import BasicInformation from "./Pages/Components/UserManagement/BasicInformation";
import AdminViewUsers from "./Pages/Components/UserManagement/AdminViewUsers";
import AdminLogoutUsers from "./Pages/Components/UserManagement/AdminLogoutUsers";
import AdminViewGroups from "./Pages/Components/GroupManagement/AdminViewGroups";
import AdminDissolveGroup from "./Pages/Components/GroupManagement/AdminDissolveGroup";
import TouristViewShops from "./Pages/Components/ShopManagement/TouristViewShops";
import TouristViewProducts from "./Pages/Components/ShopManagement/TouristViewProducts";
import SearchShops from "./Pages/Components/ShopManagement/SearchShops";
import TouristCommentShops from "./Pages/Components/ShopManagement/TouristCommentShops";
import TouristFriend from "./Pages/Components/UserManagement/TouristFriend";
import TouristComments from "./Pages/Components/UserManagement/TouristComments";
import TouristCollection from "./Pages/Components/UserManagement/TouristCollection";
import TouristManageGroup from "./Pages/Components/GroupManagement/TouristManageGroup";
import ManageDiscussion from "./Pages/Components/GroupManagement/ManageDiscussion";
import TouristManageRecommendation from "./Pages/Components/GroupManagement/TouristManageRecommendation";
import ShopInformation from "./Pages/Components/ShopManagement/ShopInformation";
import ShopProducts from "./Pages/Components/ShopManagement/ShopProducts";
import ShopManageGroup from "./Pages/Components/GroupManagement/ShopManageGroup";
import ShopManageMember from "./Pages/Components/GroupManagement/ShopManageMember";

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
                element:<BasicInformation/>
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
                element:<BasicInformation/>
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
                element:<BasicInformation/>
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
        ]
    }
]

export default routes