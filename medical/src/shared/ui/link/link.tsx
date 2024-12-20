import {JSX} from 'react';
import classNames from "classnames";
import {NavLink} from "react-router";

import cls from "./link.module.sass";

interface ILinkProps {
    to: string,
    extraClass?: string,
    children: JSX.Element | string
}

export const Link = (props: ILinkProps) => {

    const {
        to,
        extraClass,
        children
    } = props

    return (
        <NavLink
            className={({isActive}) =>
                isActive ? classNames(cls.link, cls.active) : cls.link
            }
            to={to}
        >
            {children}
        </NavLink>
    );
}
