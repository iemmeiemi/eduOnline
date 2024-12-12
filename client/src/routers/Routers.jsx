import {createBrowserRouter} from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import Menu from "../pages/Menu/Menu";

import ErrorPage from "../pages/Error";
import SignUp from "../pages/Auth/SignUp";

    const routers = createBrowserRouter([
        {
            path: "/",
            element: <Main />, 
            errorElement: <ErrorPage />,
            children: [
                {
                    path: "/",
                    element: <Home />
                }, 
                {
                    path: "/class",
                    element: <Menu />
                },
                
            ]
        },
        {
            path: "/signup",
            element: <SignUp />,
            errorElement: <ErrorPage />,
        },

    ]);

export default routers;