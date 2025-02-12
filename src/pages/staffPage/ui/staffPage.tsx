import React, {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {Pagination} from "features/pagination";
import {
    StaffList,
    Staff,
    deleteStaffData,
    fetchStaffListData,
    getStaffListData,
    staffReducer,
    staffProfileReducer, staffActions
} from "entities/staff";
import {Button} from "shared/ui/button";

import cls from "./staffPage.module.sass";
import {
    DynamicModuleLoader,
    ReducersList
} from "../../../shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {useNavigate} from "react-router";
import {headers, useHttp} from "../../../shared/api/base";
import {DeleteModal} from "features/deleteModal/ui/DeleteModal";
import {alertAction} from "features/alert/model/slice/alertSlice";
import {useAppDispatch} from "../../../shared/lib/hooks/useAppDispatch/useAppDispatch";

const reducers: ReducersList = {
    staffSlice: staffReducer
}

export const StaffPage = () => {

    const {request} = useHttp()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {deleteStaff} = staffActions
    const [active , setActive] = useState(false)

    useEffect(() => {
        dispatch(fetchStaffListData())
    }, [])

    const staffList = useSelector(getStaffListData)

    const [currentPage, setCurrentPage] = useState<number>(1)
    const [currentTableData, setCurrentTableData] = useState<Staff[]>([])
    const pageSize = useMemo(() => 10, [])
    const [activeItem, setActiveItem] = useState<Staff>({} as Staff)

    const onDelete = () => {

        request({url: `user/staff/crud/delete/${activeItem.id}`, method: "DELETE", headers: headers(), isJson: false})
            .finally(()=>dispatch(deleteStaff(activeItem.id)))
            .then(res => {
                setActive(false)
                dispatch(alertAction.onAddAlertOptions({
                    type: "success",
                    status: true,
                    msg: "Успешно удалено"
                }))
            })
    }



    return (
        <DynamicModuleLoader reducers={reducers}>
            <div className={cls.staffPage}>
                <div className={cls.staffPage__header}>
                    <h2 className={cls.staffPage__title}>Список персонала</h2>
                    <Button extraClass={cls.staffPage__btn} onClick={() => navigate("/platform/register")}>+</Button>
                </div>
                <StaffList
                    onDelete={setActive}
                    setActiveItem={setActiveItem}
                    currentTableData={staffList}
                />
                {/*{*/}
                {/*    staffList &&*/}
                {/*    <Pagination*/}
                {/*        users={staffList}*/}
                {/*        onPageChange={page => {*/}
                {/*            setCurrentPage(page)*/}
                {/*        }}*/}
                {/*        currentPage={currentPage}*/}
                {/*        pageSize={pageSize}*/}
                {/*        setCurrentTableData={setCurrentTableData}*/}
                {/*    />*/}
                {/*}*/}


                <DeleteModal active={active} setActive={() => setActive(false)} onConfirm={onDelete}/>
            </div>
            <Pagination
                totalCount={6}
                onPageChange={setCurrentPage}
                currentPage={currentPage}
                pageSize={10}
            />
        </DynamicModuleLoader>
    );
}
