import React from 'react';
import {DeviceList} from "entities/deviceList";
import cls from "./devicePage.module.sass"
export const DevicePage = () => {
    return (
        <div className={cls.deviceBox}>
            <DeviceList/>
        </div>
    );
};
