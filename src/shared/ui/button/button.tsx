import React, {JSX} from 'react';

import cls from "./button.module.sass";
import classNames from "classnames";

interface buttonProps {
    children: string | JSX.Element,
    id?: string,
    extraClass?: string
    onClick?: React.MouseEventHandler<HTMLButtonElement>
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
