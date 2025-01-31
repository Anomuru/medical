import {useCallback} from 'react';

import {Table} from "shared/ui/table";

import cls from "./patientList.module.sass";

export const PatientList = () => {

    const render = useCallback(() => {
        return [1,2,3,4,5,6, 7].map((item, index) => {
            return (
                <tr>
                    <td>{index+1}</td>
                    <td>
                        <div className={cls.item}>
                            <img className={cls.item__image} src="" alt=""/>
                            <div className={cls.item__info}>
                                <h3>John Smith</h3>
                                <p>Surgeon</p>
                            </div>
                        </div>
                    </td>
                    <td>33</td>
                    <td>+998 90 123-45-67</td>
                    <td>
                        <div className={cls.check}>
                            <i className="fa-solid fa-check"/>
                        </div>
                    </td>
                    <td>
                        <div style={{background: "#FAECEC"}} className={cls.check}>
                            <i style={{color: "#FF0000"}} className="fas fa-times"/>
                        </div>
                    </td>
                </tr>
            )
        })
    }, [])

    return (
        <Table>
            <thead>
            <tr>
                <th>Number</th>
                <th>Staff Name</th>
                <th>Age</th>
                <th>Contact Number</th>
                <th>Paid</th>
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>
            {render()}
            {render()}
            </tbody>
        </Table>
    );
}
