import React from 'react';

import cls from "./button.module.sass";
import classNames from "classnames";

interface buttonProps {
    children: string,
    id?: string,
    extraClass?: string
}

export const Button = (props: buttonProps) => {

    const {
        children,
        id,
        extraClass
    } = props

    return (
        <button
            id={id}
            className={classNames(cls.button, extraClass)}
        >
            {children}
        </button>
    );
}
