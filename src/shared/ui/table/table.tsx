import React, {JSX} from 'react';
import classNames from "classnames";

import cls from "./table.module.sass";

interface tableProps {
    extraClass?: string,
    children: JSX.Element|JSX.Element[]
}

export const Table = (props: tableProps) => {
    const {
        extraClass,
        children
    } = props
    return (
        <table className={classNames(cls.table, extraClass)}>
            {children}
        </table>
    );
};