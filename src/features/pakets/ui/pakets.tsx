import React, {memo, useState} from 'react';

import {PaketsList} from "entities/pakets";
import {ConfirmModal} from "shared/ui/confirm";


import cls from "./pakets.module.sass";
import {IPackagesWithAnalysis} from "shared/types/oftenUsedTypes";
import {IAnalysis} from "entities/analysis";


interface IPakets {
    title: string,
    totalPrice: number,
    packages: IAnalysis[]
}



export const Pakets = memo(({packages,title,totalPrice}: IPakets) => {

    const [isDelete, setIsDelete] = useState(false)
    const [isActive, setIsActive] = useState(NaN)

    const onDelete = () => {
        setIsDelete(false)
    }

    const onClick = (id: number) => {
        setIsActive(id)
        setIsDelete(true)
    }

    return (
        <>
            <PaketsList title={title} totalPrice={totalPrice} packages={packages} onDelete={onClick}/>
            <ConfirmModal
                onClick={onDelete}
                setActive={setIsDelete}
                active={isDelete}
            />
        </>
    );
})