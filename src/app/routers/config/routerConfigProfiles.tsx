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
import {PaymentPage} from "pages/paymentPage";

import {PatientPage} from "pages/patientPage";
import {AnalysisPage} from "pages/analysisPage";


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
    getWorkTableRoute, getPatientRoute, getAnalysisRoute,
    getWorkerProfile,
    getPaymentRoute, getAllPaymentsPageRoute
} from "shared/const/routers";
import {AllPaymentPage} from "../../../pages/allPaymentPage";


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
    },
    {
        name: "dashboardPage",
        element: <RegisterPage/>,
        path: getDashboardRoute()
    },
    {
        name: "staffPage/profile",
        element: <ProfilePage/>,
        path: getProfileRoute(":id")
    },
    {
        name: "jobPage",
        element: <JobListPage/>,
        path: getJobListRoute()
    }, {
        name: "staffPage",
        element: <StaffPage/>,
        path: getStaffRoute()
    }, {
        name: "patientPage",
        element: <PatientPage/>,
        path: getPatientRoute()

    },
    {
        name: "hospitalRegPage",
        element: <HospitalRegPage/>,
        path: getHospitalRegRoute()
    },
    {
        name: "paymentPage",
        element: <PaymentPage/>,
        path: getPaymentRoute()
    },
    {
        name: "platformHomePage",
        element: <PlatformHomePage/>,
        path: getPlatformHomePage()

    },
    {
        name: "pricePage",
        element: <PricePage/>,
        path: getPricePageRoute()

    },
    {
        name: "devicePage",
        element: <DevicePage/>,
        path: getDevicePageRoute()
    },
    {
        name: "devicePage/deviceProfile/:id",
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
    },
    {
        name: "analysis",
        element: <AnalysisPage/>,
        path: getAnalysisRoute()
    },
    {
        name: "allPayment",
        element: <AllPaymentPage/>,
        path: getAllPaymentsPageRoute()
    }
]
