import {memo, useCallback, useState} from 'react';

import {Radio} from "shared/ui/radio";

import cls from "./patientHeader.module.sass";

export const PatientHeader = memo(() => {

    const [activeType, setActiveType] = useState("")
    const toggleActiveType = useCallback((data: string) => setActiveType(data), [])

    return (
        <div className={cls.header}>
            <h1>Patient list</h1>
            <div className={cls.header__filter}>
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
