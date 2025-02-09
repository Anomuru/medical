import React, {useCallback} from 'react';
import {useSelector} from "react-redux";

import {getUserRole} from "entities/user";
import {Link} from "shared/ui/link";
import {menuConfig} from "../config/menuConfig";

import cls from "./menuBar.module.sass";
import classNames from "classnames";

export const MenuBar = () => {

    const userRole = useSelector(getUserRole)
    // const userRole = localStorage.getItem("role")

    const renderMenuItems = useCallback(() => {
        return menuConfig.map(item => {
            if (userRole && item.roles.includes(userRole))
                return (
                    <Link extraClass={cls.item} to={item.to}>
                        <img
                            style={{color: "white"}}
                            src={item.image}
                            alt={item.to}
                        />
                        <p>{item.label}</p>
                    </Link>
                )
        })
    }, [userRole])

    return (
        <div className={cls.menu}>
            <div className={cls.menu__items}>
                {renderMenuItems()}
            </div>
            <Link
                onClick={() => localStorage.clear()}
                extraClass={classNames(cls.menu__exit)}
                to={"/login"}
            >
                <i className="fas fa-sign-out-alt"/>
                <p>Log out</p>
            </Link>
        </div>
    );
}
