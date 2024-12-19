import {JSX} from "react";

import {RegisterPage} from "pages/registerPage";
import {ProfilePage} from "pages/profilePage";
import {JobListPage} from "pages/jobListPage";
import {StaffPage} from "pages/staffPage";
import {HospitalRegPage} from "pages/hospitalRegPage";
import {PlatformHomePage} from "pages/platformHomePage";
import {PricePage} from "pages/pricePage";
import {DevicePage} from "pages/devicePage";
import {DeviceProfilePage} from "pages/deviceProfilePage";
import {WorkTablePage} from "pages/workTablePage";
import {WorkerProfilePage} from "pages/workerProfilePage";
import {
    getDashboardRoute,
    getRegisterRoute,
    getStaffRoute,
    getHospitalRegRoute,
    getPlatformHomePage,
    getPricePageRoute,
    getDevicePageRoute,
    getJobListRoute,
    getProfileRoute,
    getDeviceProfileRoute,
    getWorkTableRoute,
    getWorkerProfile
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
    },
    {
        name: "profile",
        element: <ProfilePage/>,
        path: getProfileRoute()
    },
    {
        name: "jobPage",
        element: <JobListPage/>,
        path: getJobListRoute()
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
    },{
        name: "devicePage",
        element: <DevicePage/>,
        path: getDevicePageRoute()
    },
    {
        name: "devicePage/deviceProfile",
        element: <DeviceProfilePage/>,
        path: getDeviceProfileRoute()
    },
    {
        name: "table",
        element: <WorkTablePage/>,
        path: getWorkTableRoute()
    },
    {
        name: "table/workerProfile",
        element: <WorkerProfilePage/>,
        path: getWorkerProfile()
    }
]