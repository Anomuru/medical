import {FC, memo, useCallback, useState} from 'react';

import {Radio} from "shared/ui/radio";

import cls from "./patientHeader.module.sass";


interface IPatientFilter {
    patientFilter?: [],

}


export const PatientHeader: FC<IPatientFilter> = memo(({patientFilter}) => {

    const [activeType, setActiveType] = useState("")
    const toggleActiveType = useCallback((data: string) => setActiveType(data), [])

    return (
        <div className={cls.header}>
            <h1>Patient list</h1>
            <div className={cls.header__filter}>
                <Radio
                    value={"all"}
                    name={"radio"}
                    onChange={toggleActiveType}
                    checked={"all" === activeType}
                >
                    All
                </Radio>
                <Radio
                    value={"paid"}
                    name={"radio"}
                    onChange={toggleActiveType}
                    checked={"paid" === activeType}
                >
                    Paid
                </Radio>
                <Radio
                    value={"unpaid"}
                    name={"radio"}
                    onChange={toggleActiveType}
                    checked={"unpaid" === activeType}
                >
                    Unpaid
                </Radio>
            </div>
        </div>
    );
})
