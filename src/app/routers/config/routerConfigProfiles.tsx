import {JSX} from "react";

import {RegisterPage} from "pages/registerPage";

import {getDashboardRoute, getRegisterRoute} from "shared/const/routers";

interface IRouterConfigProfiles {
    name: string,
    path: string,
    element: JSX.Element
}

export const routersConfigProfile: IRouterConfigProfiles[] = [
    {
        name: "register",
        element: <RegisterPage/>,
        path: getRegisterRoute()
    },
    {
        name: "dashboard",
        element: <RegisterPage/>,
        path: getDashboardRoute()
    }
]