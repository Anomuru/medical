import React, {JSX} from 'react';
import classNames from "classnames";

import cls from "./table.module.sass";

interface ITableProps {
    extraClass?: string,
    children: JSX.Element[] | JSX.Element
}

export const Table: React.FC<ITableProps> = ({extraClass, children}) => {
    return (
        <table className={classNames(cls.table, extraClass)}>
            {children}
        </table>
    );
}