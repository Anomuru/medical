import React, {useCallback} from 'react';
import {useSelector} from "react-redux";

import {getUserJob} from "entities/user";
import {Link} from "shared/ui/link";
import {menuConfig} from "../config/menuConfig";

import cls from "./menuBar.module.sass";

export const MenuBar = () => {

    const userRole = useSelector(getUserJob)
    // const userRole = localStorage.getItem("role")

    const renderMenuItems = useCallback(() => {
        return menuConfig.map(item => {
            if (userRole && item.roles.includes(userRole))
                return (
                    <Link to={item.to}>
                        <img
                            style={{color: "white"}}
                            src={item.image}
                            alt={item.to}
                        />
                    </Link>
                )
        })
    }, [userRole])

    return (
        <div className={cls.menu}>
            {renderMenuItems()}
        </div>
    );
}
