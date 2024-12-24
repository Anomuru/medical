import {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {Pagination} from "features/pagination";
import {StaffList, Staff, deleteStaffData, fetchStaffListData, getStaffListData} from "entities/staff";
import {Button} from "shared/ui/button";

import cls from "./staffPage.module.sass";

export const StaffPage = () => {

    const dispatch = useDispatch()

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
        dispatch(deleteStaffData({id}))
    }

    return (
        <div className={cls.staffPage}>
            <div className={cls.staffPage__header}>
                <h2 className={cls.staffPage__title}>Staff list</h2>
                <Button extraClass={cls.staffPage__btn}>+</Button>
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
    );
}
