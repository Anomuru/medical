import React, {useCallback} from 'react';

import {Link} from "shared/ui/link";
import {menuConfig} from "../config/menuConfig";

import cls from "./menuBar.module.sass";

export const MenuBar = () => {

    const renderMenuItems = useCallback(() => {
        return menuConfig.map(item => {
            return (
                <Link to={item.to}>
                    <img
                        src={item.image}
                        alt={item.to}
                    />
                </Link>
            )
        })
    }, [menuConfig])

    return (
        <div className={cls.menu}>
            {renderMenuItems()}
        </div>
    );
}
