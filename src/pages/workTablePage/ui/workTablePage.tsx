import React, {JSX} from 'react';
import cls from './workTablePage.module.sass'
import {WorkTable} from "entities/workTable";


export const WorkTablePage = () => {

    return (
        <div className={cls.mainBox}>
            <WorkTable/>
        </div>
    );
};
