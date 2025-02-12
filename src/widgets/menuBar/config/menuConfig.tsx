import jobListImage from "shared/assets/icon/list.png";
import timeTableImage from "shared/assets/icon/timetable.png";
import paymentImage from "shared/assets/icon/payment.png";
import staffImage from "shared/assets/icon/staffList.png";
import analysisImage from "shared/assets/icon/analysis.png";
import patientImage from "shared/assets/icon/patient.png";
import deviceImage from "shared/assets/icon/deviceList.png";
import {ROLES} from "shared/const/roles";

export const menuConfig = [
    {
        to: "table",
        image: timeTableImage,
        label: "Расписание",
        roles: [ROLES.operator, ROLES.reception, ROLES.admin]
    },
    {
        to: "patient",
        image: patientImage,
        label: "Пациенты",
        roles: [ROLES.admin]
    },
    {
        to: "payment",
        image: paymentImage,
        label: "Оплата",
        roles: [ROLES.operator, ROLES.reception,ROLES.admin]
    },
    {
        to: "analysisGroup",
        image: analysisImage,
        label: "Анализ",
        roles: [ROLES.operator, ROLES.reception, ROLES.admin]
    },
    // {
    //     to: "dashboard",
    //     image: dashboardImage,
    //     roles: []
    // },
    // {
    //     to: "register",
    //     image: registerImage
    // },
    // {
    //     to: "profile",
    //     image: profileImage
    // },
    {
        to: "staff",
        image: staffImage,
        label: "Персонал",
        roles: [ROLES.admin]
    },
    {
        to: "jobPage",
        image: jobListImage,
        label: "Работа",
        roles: [ROLES.admin]
    },
    // {
    //     to: "hospitalReg",
    //     image: dashboardImage
    // },
    // {
    //     to: "platformHomePage",
    //     image: dashboardImage
    // },
    // {
    //     to: "pricePage",
    //     image: dashboardImage
    // },
    {
        to: "devicePage",
        image: deviceImage,
        label: "Устройство",
        roles: [ROLES.admin]
    },
    {
        to: "allPayment",
        image: deviceImage,
        label: "Платежи",
        roles: [ROLES.admin]
    }
]
