import {JSX} from 'react';
import classNames from "classnames";
import {NavLink} from "react-router";

import cls from "./link.module.sass";

interface ILinkProps {
    to: string,
    extraClass?: string,
    children: JSX.Element | JSX.Element[] | string,
    onClick?: () => void
}

export const Link = (props: ILinkProps) => {

    const {
        to,
        extraClass,
        children,
        onClick
    } = props

    return (
        <NavLink
            onClick={onClick}
            className={({isActive}) =>
                isActive ? classNames(cls.link, cls.active, extraClass)
                    : classNames(cls.link, extraClass)
            }
            to={to}
        >
            {children}
        </NavLink>
    );
}
