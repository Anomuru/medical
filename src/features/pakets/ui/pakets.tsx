import React, {memo, useState} from 'react';

import {PaketsList} from "entities/pakets";
import {ConfirmModal} from "shared/ui/confirm";

import cls from "./pakets.module.sass";

export const Pakets = memo(() => {

    const [isDelete, setIsDelete] = useState(false)

    return (
        <>
            <PaketsList/>
            <ConfirmModal setActive={setIsDelete} active={isDelete}/>
        </>
    );
})