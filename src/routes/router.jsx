import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Error from "../pages/Error";
import Home from "../pages/Home";

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

    }
])

export default router;