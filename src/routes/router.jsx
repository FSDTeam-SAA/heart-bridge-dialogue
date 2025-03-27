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
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const router = createBrowserRouter([
    {
        path : '/',
        element : <Main/>,
        children : [
            {
                path : "/",
                element : <PrivateRoute><Home/></PrivateRoute>
            },
            {
                path : "*",
                element : <Error/>
            },
            {
                path : "upgrade",
                element : <PrivateRoute><Upgrade /></PrivateRoute>
            },
            {
                path : "/signup",
                element : <SignUp />
            },
            {
                path : "/login",
                element : <PublicRoute><Login /></PublicRoute>
            },
            {
                path: '/account',
                element: <PrivateRoute><Account /></PrivateRoute>,
                children: [
                  {
                    index: true,
                    element: <Navigate to="profile" replace={true}/>,
                  },
                  {
                    path: 'profile',
                    element: <PrivateRoute><Profile /></PrivateRoute>,
                  },
                  {
                    path: 'subscription',
                    element: <PrivateRoute><Subscription /></PrivateRoute>,
                  },
                ],
            },
        ]

    },

    {
        path : "/dashboard",
        element : <PrivateRoute><Dashboard /></PrivateRoute>,
        children : [
            {
                path : "/dashboard",
                element : <PrivateRoute><NoRelationship/></PrivateRoute>
            }
        ]
    }
])

export default router;