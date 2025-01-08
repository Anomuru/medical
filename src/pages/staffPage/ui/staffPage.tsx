import {useEffect, useMemo, useState} from 'react';
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

const reducers: ReducersList = {
    staffSlice: staffReducer
}

export const StaffPage = () => {

    const {request} = useHttp()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {deleteStaff} = staffActions

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchStaffListData())
    }, [])

    const staffList = useSelector(getStaffListData)

    const [currentPage, setCurrentPage] = useState<number>(1)
    const [currentTableData, setCurrentTableData] = useState<Staff[]>([])
    const pageSize = useMemo(() => 10, [])

    const onDelete = (id: number) => {
        // @ts-ignore
        request({url: `user/staff/crud/delete/${id}`, method: "DELETE", headers: headers(), isJson: false})
            .finally(()=>dispatch(deleteStaff(id)))
    }

    console.log(staffList, 'wdwededed')

    return (
        <DynamicModuleLoader reducers={reducers}>
            <div className={cls.staffPage}>
                <div className={cls.staffPage__header}>
                    <h2 className={cls.staffPage__title}>Staff list</h2>
                    <Button extraClass={cls.staffPage__btn} onClick={() => navigate("/platform/register")}>+</Button>
                </div>
                <StaffList
                    onDelete={onDelete}
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
            </div>
        </DynamicModuleLoader>
    );
}
