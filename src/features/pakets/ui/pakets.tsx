import React, {memo, useState} from 'react';

import {PaketsList} from "entities/pakets";
import {ConfirmModal} from "shared/ui/confirm";

import cls from "./pakets.module.sass";

export const Pakets = memo(() => {

    const [isDelete, setIsDelete] = useState(false)
    const [isActive, setIsActive] = useState(NaN)

    const onDelete = () => {
        console.log(isActive, 'is already delete')
        setIsDelete(false)
    }

    const onClick = (id:number) => {
        setIsActive(id)
        setIsDelete(true)
    }

    return (
        <>
            <PaketsList onDelete={onClick}/>
            <ConfirmModal onClick={onDelete} setActive={setIsDelete} active={isDelete}/>
        </>
    );
})