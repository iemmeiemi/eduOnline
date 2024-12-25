import {createBrowserRouter} from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import Menu from "../pages/Menu/Menu";

import ErrorPage from "../pages/Error";
import SignUp from "../pages/Auth/SignUp";
import CreateClass from "../pages/Class/CreateClass";

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
                {
                    path: "/class-create",
                    element: <CreateClass />
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