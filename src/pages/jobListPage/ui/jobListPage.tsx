import React, {useCallback, useState} from 'react';
import cls from './jobListPage.module.sass'
import {Button} from "shared/ui/button";
import settingImage from 'shared/assets/icon/setting.png'
import plusImage from 'shared/assets/icon/plus.png'
import {JobList} from "entities/jobList";
import {AddJobModal} from "features/job";
import {useSelector} from "react-redux";



export const JobListPage = () => {


    const [isActiveAdd, setIsActiveAdd] = useState(false);
    // const authData = useSelector(getUserAuthData);

    const onCloseModal = useCallback(() => {
        setIsActiveAdd(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsActiveAdd(true);
    }, []);





    return (
        <div className={cls.tableBox}>
            <div className={cls.tableBox__header}>
                <h1>Job lit </h1>
                <div className={cls.tableBox__header__buttonPanel}>
                    <Button extraClass={cls.tableBox__header__buttonPanel__btn} children={<img src={settingImage} alt=""/>}/>
                    <Button onClick={onShowModal} extraClass={cls.tableBox__header__buttonPanel__btn}  children={<img src={plusImage} alt=""/>} />
                </div>
            </div>
            <div className={cls.tableBox__table}>
                <JobList/>
            </div>


            <AddJobModal active={isActiveAdd} setActive={onCloseModal}/>
        </div>
    );
};
