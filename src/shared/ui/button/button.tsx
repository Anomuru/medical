


import React, {JSX, SetStateAction} from 'react';


import cls from "./button.module.sass";
import classNames from "classnames";


interface buttonProps {
    children: string | JSX.Element,
    id?: string,
    extraClass?: string,
    onClick?: SetStateAction<any> | React.MouseEventHandler<HTMLButtonElement>
    type?: "simple" | "success" | "danger" | "warning" ,
    disabled?: boolean
}

export const Button = (props: buttonProps) => {

    const {
        children,
        id,
        extraClass,
        onClick,
        type = "simple",
        disabled
    } = props

    return (
        <button
            form={id}
            onClick={onClick}
            id={id}
            disabled={disabled}
            className={classNames(cls.button, extraClass , cls[type])}
        >
            {children}
        </button>
    );
}
