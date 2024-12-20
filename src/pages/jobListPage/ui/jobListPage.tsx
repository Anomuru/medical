import React from 'react';
import cls from './jobListPage.module.sass'
import {Button} from "shared/ui/button";
import settingImage from 'shared/assets/icon/setting.png'
import plusImage from 'shared/assets/icon/plus.png'
import {JobList} from "entities/jobList";
import {Box} from "shared/ui/box";
export const JobListPage = () => {
    return (
        <div className={cls.tableBox}>
            <div className={cls.tableBox__header}>
                <h1>Job lsit </h1>
                <div className={cls.tableBox__header__buttonPanel}>
                    <Button extraClass={cls.tableBox__header__buttonPanel__btn} children={<img src={settingImage} alt=""/>}/>
                    <Button extraClass={cls.tableBox__header__buttonPanel__btn}  children={<img src={plusImage} alt=""/>} />
                </div>
            </div>
            <div className={cls.tableBox__table}>
                <JobList/>
            </div>
        </div>
    );
};
