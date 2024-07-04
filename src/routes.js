import InitialPage from "./Pages/InitialPage";
import SignInPage from "./Pages/SignInPage/SignInPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import AdminPage from "./Pages/AdminPage/AdminPage";
import TouristPage from "./Pages/TouristPage/TouristPage";
import ShopkeeperPage from "./Pages/ShopkeeperPage/ShopkeeperPage";
import ShopkeeperRegister from "./Pages/RegisterPage/ShopkeeperRegister";
import TouristRegister from "./Pages/RegisterPage/TouristRegister";

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
        path: '/Admin',
        element:<AdminPage/>
    },
    {
        path: '/Tourist',
        element:<TouristPage/>
    },
    {
        path: '/Shopkeeper',
        element:<ShopkeeperPage/>
    }
]

export default routes