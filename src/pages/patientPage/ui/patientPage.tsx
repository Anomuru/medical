import {useEffect, useState} from 'react';

import {Pagination} from "features/pagination";
import {fetchPatientData, PatientHeader, PatientList, patientReducer} from "entities/patient";
import {
    DynamicModuleLoader,
    ReducersList
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";

import cls from "./patientPage.module.sass";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";

const reducers: ReducersList = {
    patientSlice: patientReducer
};

export const PatientPage = () => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchPatientData())
    }, [])

    const [currentPage, setCurrentPage] = useState<number>(1);

    return (
        <DynamicModuleLoader reducers={reducers}>
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
        </DynamicModuleLoader>
    );
}
