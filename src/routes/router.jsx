import { createBrowserRouter, Navigate } from "react-router-dom";
import Main from "../layout/Main";
import Error from "../pages/Error";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard/Dashboard";
import NoRelationship from "../pages/DashPage/NoRelationship";
import Upgrade from "../pages/Upgrade";
import SignUp from "../pages/Authentication/SignUp";
import Login from "../pages/Authentication/Login";
import Account from "../pages/Account/Account";
import Profile from "../pages/Account/Profile";
import Subscription from "../pages/Account/Subscription";

const router = createBrowserRouter([
    {
        path : '/',
        element : <Main/>,
        children : [
            {
                path : "/",
                element : <Home/>
            },
            {
                path : "*",
                element : <Error/>
            },
            {
                path : "upgrade",
                element : <Upgrade />
            },
            {
                path : "/signup",
                element : <SignUp />
            },
            {
                path : "/login",
                element : <Login />
            },
            {
                path: '/account',
                element: <Account />,
                children: [
                  {
                    index: true,
                    element: <Navigate to="profile" replace={true}/>,
                  },
                  {
                    path: 'profile',
                    element: <Profile />,
                  },
                  {
                    path: 'subscription',
                    element: <Subscription />,
                  },
                ],
            },
        ]

    },

    {
        path : "/dashboard",
        element : <Dashboard />,
        children : [
            {
                path : "/dashboard",
                element : <NoRelationship/>
            }
        ]
    }
])

export default router;