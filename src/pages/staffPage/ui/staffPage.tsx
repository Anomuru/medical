import {useMemo, useState} from 'react';
import {useDispatch} from "react-redux";

import {Pagination} from "features/pagination";
import {StaffList, Staff, deleteStaffData} from "entities/staff";
import {Button} from "shared/ui/button";

import cls from "./staffPage.module.sass";

const list = [
    {
        id: 1,
        name: "John",
        surname: "Smith",
        job: "Surgeon",
        image: "",
        age: 33,
        phone: "+998 90 123-45-67"
    },{
        id: 1,
        name: "John",
        surname: "Smith",
        job: "Surgeon",
        image: "",
        age: 33,
        phone: "+998 90 123-45-67"
    },{
        id: 1,
        name: "John",
        surname: "Smith",
        job: "Surgeon",
        image: "",
        age: 33,
        phone: "+998 90 123-45-67"
    },{
        id: 1,
        name: "John",
        surname: "Smith",
        job: "Surgeon",
        image: "",
        age: 33,
        phone: "+998 90 123-45-67"
    },{
        id: 1,
        name: "John",
        surname: "Smith",
        job: "Surgeon",
        image: "",
        age: 33,
        phone: "+998 90 123-45-67"
    },{
        id: 1,
        name: "John",
        surname: "Smith",
        job: "Surgeon",
        image: "",
        age: 33,
        phone: "+998 90 123-45-67"
    },{
        id: 1,
        name: "John",
        surname: "Smith",
        job: "Surgeon",
        image: "",
        age: 33,
        phone: "+998 90 123-45-67"
    },{
        id: 1,
        name: "John",
        surname: "Smith",
        job: "Surgeon",
        image: "",
        age: 33,
        phone: "+998 90 123-45-67"
    },{
        id: 1,
        name: "John",
        surname: "Smith",
        job: "Surgeon",
        image: "",
        age: 33,
        phone: "+998 90 123-45-67"
    },{
        id: 1,
        name: "John",
        surname: "Smith",
        job: "Surgeon",
        image: "",
        age: 33,
        phone: "+998 90 123-45-67"
    },{
        id: 1,
        name: "John",
        surname: "Smith",
        job: "Surgeon",
        image: "",
        age: 33,
        phone: "+998 90 123-45-67"
    },{
        id: 1,
        name: "John",
        surname: "Smith",
        job: "Surgeon",
        image: "",
        age: 33,
        phone: "+998 90 123-45-67"
    },{
        id: 1,
        name: "John",
        surname: "Smith",
        job: "Surgeon",
        image: "",
        age: 33,
        phone: "+998 90 123-45-67"
    },
]

export const StaffPage = () => {

    const dispatch = useDispatch()

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
                currentTableData={currentTableData}
            />
            <Pagination
                users={list}
                onPageChange={page => {
                    setCurrentPage(page)
                }}
                currentPage={currentPage}
                pageSize={pageSize}
                setCurrentTableData={setCurrentTableData}
            />
        </div>
    );
}
