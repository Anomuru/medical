import {JSX} from "react";

import {RegisterPage} from "pages/registerPage";
import {WorkTablePage} from "pages/workTablePage";
import {getDashboardRoute, getRegisterRoute, getWorkTableRoute} from "shared/const/routers";


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
    },
    {
        name: "table",
        element: <WorkTablePage/>,
        path: getWorkTableRoute()
    },

]