import React from 'react';
import cls from "./workerProfilePage.module.sass"
import {WorkerProfile} from "entities/workerProfile";
export const WorkerProfilePage = () => {
    return (
        <div className={cls.mainBox}>
            <WorkerProfile/>
        </div>
    );
};

