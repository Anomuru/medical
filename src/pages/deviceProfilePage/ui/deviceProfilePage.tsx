import React from 'react';
import cls from './deviceProfilePage.module.sass'
import {DeviceProfile} from "entities/deviceProfile";
export const DeviceProfilePage = () => {
    return (
        <div className={cls.profileBox}>
            <DeviceProfile/>
        </div>
    );
};