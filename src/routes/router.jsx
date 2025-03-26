import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Error from "../pages/Error";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard/Dashboard";
import NoRelationship from "../pages/DashPage/NoRelationship";

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
            }
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