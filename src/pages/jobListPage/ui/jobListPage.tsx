import React, {useCallback, useState} from 'react';
import cls from './jobListPage.module.sass'
import {Button} from "shared/ui/button";
import plusImage from 'shared/assets/icon/plus.png'
import {JobList} from "entities/jobList";
import {AddJobModal,ChangeJobModal} from "features/job";
import {JobSchema} from "shared/types/oftenUsedTypes";



export const JobListPage = () => {


    const [isActiveAdd, setIsActiveAdd] = useState(false);
    const [isActiveChange, setIsActiveChange] = useState(false);
    const [isActiveDelete, setIsActiveDelete] = useState(false);

    const [changingData, setChangingData] = useState<JobSchema>();


    // const authData = useSelector(getUserAuthData);

    const onCloseModal = useCallback(() => {
        setIsActiveAdd(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsActiveAdd(true);
    }, []);


    const onShowChangeModal = () => {
        setIsActiveChange(true)
    }

    const onCloseChangeModal = useCallback(() => {
        setIsActiveChange(false);
    }, []);




     const onShowDeleteModal = () => {
         setIsActiveDelete(true)
    }


    const onSetChangingData = (item: JobSchema) => {
         setChangingData(item)
    }



    return (
        <div className={cls.tableBox}>
            <div className={cls.tableBox__header}>
                <h1>Job lit </h1>
                <div className={cls.tableBox__header__buttonPanel}>
                    {/*<Button extraClass={cls.tableBox__header__buttonPanel__btn} children={<img src={settingImage} alt=""/>}/>*/}
                    <Button onClick={onShowModal} extraClass={cls.tableBox__header__buttonPanel__btn}  children={<img src={plusImage} alt=""/>} />
                </div>
            </div>
            <div className={cls.tableBox__table}>
                <JobList
                    setChangeActive={onShowChangeModal}
                    setChangingData={onSetChangingData}
                    setDeleteActive={onShowDeleteModal}
                />
            </div>


            <AddJobModal active={isActiveAdd} setActive={onCloseModal}/>
            <ChangeJobModal active={isActiveChange} setActive={onCloseChangeModal}/>

        </div>
    );
};
