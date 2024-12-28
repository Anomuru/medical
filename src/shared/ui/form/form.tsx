import React, {JSX} from 'react';
import classNames from "classnames";

import cls from "./form.module.sass";

interface formProps {
    id?: string,
    children: JSX.Element | JSX.Element[],
    onSubmit?: (arg: any) => void,
    extraClass?: string,
}

export const Form = (props: formProps) => {

    const {
        id,
        children,
        onSubmit,
        extraClass,
    } = props

    return (
        <form
            className={classNames(cls.form, extraClass)}
            id={id}
            onSubmit={onSubmit}
        >
            {children}
        </form>
    );
}
