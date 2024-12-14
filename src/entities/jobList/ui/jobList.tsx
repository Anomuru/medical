import React from 'react';
import {Table} from "../../../shared/ui/table";
import cls from './jobList.module.sass'

interface IDoctors {
    id: number,
    name: string,
    age: number,
    phone_number: string,
    type: string
}


const list: IDoctors[] = [
    {
        id: 1,
        name: "Doctor D",
        age: 43,
        phone_number: "+99899 784 45 25",
        type: 'urolog'
    },
    {
        id: 2,
        name: "Doctor D",
        age: 43,
        phone_number: "+99899 784 45 25",
        type: 'urolog'
    },
    {
        id: 3,
        name: "Doctor D",
        age: 43,
        phone_number: "+99899 784 45 25",
        type: 'urolog'
    },
    {
        id: 4,
        name: "Doctor D",
        age: 43,
        phone_number: "+99899 784 45 25",
        type: 'urolog'
    },
    {
        id: 5,
        name: "Doctor D",
        age: 43,
        phone_number: "+99899 784 45 25",
        type: 'urolog'
    },
    {
        id: 6,
        name: "Doctor D",
        age: 43,
        phone_number: "+99899 784 45 25",
        type: 'urolog'
    },
    {
        id: 7,
        name: "Doctor D",
        age: 43,
        phone_number: "+99899 784 45 25",
        type: 'urolog'
    },
    {
        id: 8,
        name: "Doctor D",
        age: 43,
        phone_number: "+99899 784 45 25",
        type: 'urolog'
    },
    {
        id: 9,
        name: "Doctor D",
        age: 43,
        phone_number: "+99899 784 45 25",
        type: 'urolog'
    },
    {
        id: 10,
        name: "Doctor D",
        age: 43,
        phone_number: "+99899 784 45 25",
        type: 'urolog'
    },
    {
        id: 11,
        name: "Doctor D",
        age: 43,
        phone_number: "+99899 784 45 25",
        type: 'urolog'
    },
    {
        id: 12,
        name: "Doctor D",
        age: 43,
        phone_number: "+99899 784 45 25",
        type: 'urolog'
    },
    {
        id: 13,
        name: "Doctor D",
        age: 43,
        phone_number: "+99899 784 45 25",
        type: 'urolog'
    },
    {
        id: 14,
        name: "Doctor D",
        age: 43,
        phone_number: "+99899 784 45 25",
        type: 'urolog'
    },
    {
        id: 15,
        name: "Doctor D",
        age: 43,
        phone_number: "+99899 784 45 25",
        type: 'urolog'
    },
    {
        id: 16,
        name: "Doctor D",
        age: 43,
        phone_number: "+99899 784 45 25",
        type: 'urolog'
    },
    {
        id: 17,
        name: "Doctor D",
        age: 43,
        phone_number: "+99899 784 45 25",
        type: 'urolog'
    },
    {
        id: 18,
        name: "Doctor D",
        age: 43,
        phone_number: "+99899 784 45 25",
        type: 'urolog'
    },
    {
        id: 19,
        name: "Doctor D",
        age: 43,
        phone_number: "+99899 784 45 25",
        type: 'urolog'
    },
    {
        id: 20,
        name: "Doctor D",
        age: 43,
        phone_number: "+99899 784 45 25",
        type: 'urolog'
    },
    {
        id: 21,
        name: "Doctor D",
        age: 43,
        phone_number: "+99899 784 45 25",
        type: 'urolog'
    },
    {
        id: 22,
        name: "Doctor D",
        age: 43,
        phone_number: "+99899 784 45 25",
        type: 'urolog'
    },
    {
        id: 23,
        name: "Doctor D",
        age: 43,
        phone_number: "+99899 784 45 25",
        type: 'urolog'
    },
    {
        id: 24,
        name: "Doctor D",
        age: 43,
        phone_number: "+99899 784 45 25",
        type: 'urolog'
    }
]

export const JobList = () => {

    const renderDoctors = () => {
        return list.map((item, index) => (
            <tr key={index + 1}>
                <td>{index + 1}</td>
                <td className={cls.name}>{item.name} <br/> {item.type}</td>
                <td>{item.age}</td>
                <td>{item.phone_number}</td>
                {/*<td>{item.type}</td>*/}
            </tr>
        ))
    }

    return (
        <Table>
            <thead className={cls.theadBody}>
            <tr>
                <th>№</th>
                <th>Name</th>
                <th>Age</th>
                <th>Phone number</th>
            </tr>
            </thead>
            <tbody className={cls.thBody}>
            {renderDoctors()}
            </tbody>
        </Table>
    );
};
