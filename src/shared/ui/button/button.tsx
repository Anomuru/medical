import React, {JSX, SetStateAction} from 'react';

import cls from "./button.module.sass";
import classNames from "classnames";

interface buttonProps {
    children: string | JSX.Element,
    id?: string,
    extraClass?: string,
    onClick?: SetStateAction<any>
}

export const Button = (props: buttonProps) => {

    const {
        children,
        id,
        extraClass,
        onClick
    } = props

    return (
        <button
            id={id}
            className={classNames(cls.button, extraClass)}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
