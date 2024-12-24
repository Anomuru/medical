import React, {JSX, SetStateAction} from 'react';
import classNames from "classnames";

import cls from "./button.module.sass";

interface buttonProps {
    children: string | JSX.Element,
    id?: string,
    extraClass?: string,
    onClick?: SetStateAction<any> | React.MouseEventHandler<HTMLButtonElement>
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
