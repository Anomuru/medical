import {JSX} from "react";

import {RegisterPage} from "pages/registerPage";
import {getDashboardRoute, getJobListRoute, getProfileRoute, getRegisterRoute} from "shared/const/routers";
import {ProfilePage} from "pages/profilePage";
import {JobListPage} from "pages/jobListPage";


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
        name: "profile",
        element: <ProfilePage/>,
        path: getProfileRoute()
    },
    {
        name: "jobList",
        element: <JobListPage/>,
        path: getJobListRoute()
    },

]