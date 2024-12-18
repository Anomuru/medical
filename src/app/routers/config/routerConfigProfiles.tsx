import {JSX} from "react";

import {RegisterPage} from "pages/registerPage";
import {StaffPage} from "pages/staffPage";
import {HospitalRegPage} from "pages/hospitalRegPage";
import {PlatformHomePage} from "pages/platformHomePage";
import {PricePage} from "pages/pricePage";

import {
    getDashboardRoute,
    getRegisterRoute,
    getStaffRoute,
    getHospitalRegRoute,
    getPlatformHomePage,
    getPricePageRoute
} from "shared/const/routers";

interface IRouterConfigProfiles {
    name: string,
    path: string,
    element: JSX.Element
}

export const routersConfigProfile: IRouterConfigProfiles[] = [
    {
        name: "registerPage",
        element: <RegisterPage/>,
        path: getRegisterRoute()
    }, {
        name: "dashboardPage",
        element: <RegisterPage/>,
        path: getDashboardRoute()
    }, {
        name: "staffPage",
        element: <StaffPage/>,
        path: getStaffRoute()
    },{
        name: "hospitalRegPage",
        element: <HospitalRegPage/>,
        path: getHospitalRegRoute()
    },{
        name: "platformHomePage",
        element: <PlatformHomePage/>,
        path: getPlatformHomePage()
    },{
        name: "pricePage",
        element: <PricePage/>,
        path: getPricePageRoute()
    },
]