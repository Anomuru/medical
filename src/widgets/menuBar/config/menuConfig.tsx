import dashboardImage from "shared/assets/icon/dashboard.png";
import registerImage from "shared/assets/icon/register.png";
import profileImage from "shared/assets/icon/setting.png"
import jobListImage from "shared/assets/icon/list.png"

export const menuConfig = [
    {
        to: "dashboard",
        image: dashboardImage
    },
    // {
    //     to: "register",
    //     image: registerImage
    // },
    // {
    //     to: "profile",
    //     image: profileImage
    // },
    {
        to: "jobPage",
        image: jobListImage
    }, {
        to: "staff",
        image: dashboardImage
    }, {
        to: "patient",
        image: jobListImage
    },{
        to: "analysis",
        image: jobListImage
    }, {
        to: "hospitalReg",
        image: dashboardImage
    }, {
        to: "platformHomePage",
        image: dashboardImage
    }, {
        to: "pricePage",
        image: dashboardImage
    }, {
        to: "devicePage",
        image: dashboardImage
    }, {
        to: "table",
        image: dashboardImage
    },
]
