import {useState} from 'react';

import {Pagination} from "features/pagination";
import {PatientHeader, PatientList} from "entities/patient";

import cls from "./patientPage.module.sass";

export const PatientPage = () => {

    const [currentPage, setCurrentPage] = useState<number>(1);

    return (
        <div className={cls.patient}>
            <PatientHeader/>
            <div className={cls.patient__container}>
                <PatientList/>
            </div>
            <Pagination
                totalCount={6}
                onPageChange={setCurrentPage}
                currentPage={currentPage}
                pageSize={10}
            />
        </div>
    );
}
