


import React, {JSX} from 'react';


import cls from "./button.module.sass";
import classNames from "classnames";


interface buttonProps {
    children: string | JSX.Element,
    id?: string,
    extraClass?: string,
    onClick?: SetStateAction<any> | React.MouseEventHandler<HTMLButtonElement>
    type?: string
}

export const Button = (props: buttonProps) => {

    const {
        children,
        id,
        extraClass,
        onClick,
        type
    } = props

    return (
        <button
            onClick={onClick}
            id={id}
            className={classNames(cls.button, extraClass , {
                [cls.denger]: type === "danger"
            })}
        >
            {children}
        </button>
    );
}
