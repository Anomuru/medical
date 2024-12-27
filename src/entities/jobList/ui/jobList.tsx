import React, {useCallback, useMemo, useState} from 'react';
import {Table} from "shared/ui/table";
import cls from './jobList.module.sass'



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


export const JobList = () => {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [currentTableData, setCurrentTableData] = useState<listType>([])
    const pageSize = useMemo(() => 10, [])


    const renderDoctors = useCallback(() => {
        return list.map((item, index) => (
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
                    Edit
                </td>
            </tr>
        ))
    }, [currentTableData])

    return (
        <>
            <div className={cls.tableBox}>
                <Table>
                    <thead className={cls.theadBody}>
                    <tr>
                        <th>№</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Phone number</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody className={cls.thBody}>
                    {renderDoctors()}
                    </tbody>
                </Table>
            </div>

            {/*<Pagination*/}
            {/*    users={list}*/}
            {/*    onPageChange={page => {*/}
            {/*        setCurrentPage(page)*/}
            {/*    }}*/}
            {/*    currentPage={currentPage}*/}
            {/*    pageSize={pageSize}*/}
            {/*    setCurrentTableData={setCurrentTableData}*/}
            {/*/>*/}
        </>


    );
};
