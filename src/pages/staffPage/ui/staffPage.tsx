import React, {useCallback, useMemo, useState} from 'react';
import classNames from "classnames";

import {Pagination} from "features/pagination";
import {Button} from "shared/ui/button";
import {Table} from "shared/ui/table";

import cls from "./staffPage.module.sass";

const list = [
    {
        user: {
            name: "John",
            surname: "Smith",
            job: "Surgeon",
            image: ""
        },
        age: 33,
        phone: "+998 90 123-45-67"
    }, {
        user: {
            name: "John",
            surname: "Smith",
            job: "Surgeon",
            image: ""
        },
        age: 33,
        phone: "+998 90 123-45-67"
    }, {
        user: {
            name: "John",
            surname: "Smith",
            job: "Surgeon",
            image: ""
        },
        age: 33,
        phone: "+998 90 123-45-67"
    }, {
        user: {
            name: "John",
            surname: "Smith",
            job: "Surgeon",
            image: ""
        },
        age: 33,
        phone: "+998 90 123-45-67"
    }, {
        user: {
            name: "John",
            surname: "Smith",
            job: "Surgeon",
            image: ""
        },
        age: 33,
        phone: "+998 90 123-45-67"
    }, {
        user: {
            name: "John",
            surname: "Smith",
            job: "Surgeon",
            image: ""
        },
        age: 33,
        phone: "+998 90 123-45-67"
    }, {
        user: {
            name: "John",
            surname: "Smith",
            job: "Surgeon",
            image: ""
        },
        age: 33,
        phone: "+998 90 123-45-67"
    }, {
        user: {
            name: "John",
            surname: "Smith",
            job: "Surgeon",
            image: ""
        },
        age: 33,
        phone: "+998 90 123-45-67"
    }, {
        user: {
            name: "John",
            surname: "Smith",
            job: "Surgeon",
            image: ""
        },
        age: 33,
        phone: "+998 90 123-45-67"
    }, {
        user: {
            name: "John",
            surname: "Smith",
            job: "Surgeon",
            image: ""
        },
        age: 33,
        phone: "+998 90 123-45-67"
    }, {
        user: {
            name: "John",
            surname: "Smith",
            job: "Surgeon",
            image: ""
        },
        age: 33,
        phone: "+998 90 123-45-67"
    },
]

type listType = typeof list

export const StaffPage = () => {

    const [currentPage, setCurrentPage] = useState<number>(1)
    const [currentTableData, setCurrentTableData] = useState<listType>([])
    const pageSize = useMemo(() => 10, [])

    const renderList = useCallback(() => {
        return currentTableData?.map((item, index) => {
            return (
                <tr>
                    <td>{index + 1}</td>
                    <td>
                        <div className={cls.profile}>
                            <img className={cls.profile__img} src={item.user.image} alt=""/>
                            <div className={cls.profile__info}>
                                <p className={cls.profile__title}>
                                    {item.user.name} {item.user.surname}
                                </p>
                                <span className={cls.profile__job}>{item.user.job}</span>
                            </div>
                        </div>
                    </td>
                    <td>{item.age}</td>
                    <td>{item.phone}</td>
                    <td>
                        <i className={classNames("fas fa-times", cls.staffPage__delete)}/>
                    </td>
                </tr>
            )
        })
    }, [currentTableData])

    return (
        <div className={cls.staffPage}>
            <div className={cls.staffPage__header}>
                <h2 className={cls.staffPage__title}>Staff list</h2>
                <Button extraClass={cls.staffPage__btn}>+</Button>
            </div>
            <div className={cls.staffPage__content}>
                <Table>
                    <thead>
                    <tr>
                        <th>Number</th>
                        <th>Staff Name</th>
                        <th>Age</th>
                        <th>Contact Number</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {renderList()}
                    </tbody>
                </Table>
            </div>
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
