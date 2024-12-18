import React from 'react';
import Calendar from "react-calendar";

import {
    PlatformHomeTask,
    PlatformHomeRecent,
    PlatformHomeDaily,
    PlatformHomeStatistics,
    PlatformHomeUpdates
} from "entities/platformHome";

import cls from "./platformHomePage.module.sass";
import 'react-calendar/dist/Calendar.css';

export const PlatformHomePage = () => {
    return (
        <div className={cls.platform}>
            <PlatformHomeTask/>
            <PlatformHomeRecent/>
            <Calendar className={cls.platform__calendar}/>
            <PlatformHomeDaily/>
            <PlatformHomeUpdates/>
            <PlatformHomeStatistics/>
        </div>
    );
}
