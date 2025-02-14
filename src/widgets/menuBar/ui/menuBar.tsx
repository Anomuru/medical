import React, {useCallback} from 'react';
import {useSelector} from "react-redux";

import {getUserId, getUserName, getUserRole, getUserSurname} from "entities/user";
import {Link} from "shared/ui/link";
import {menuConfig} from "../config/menuConfig";

import cls from "./menuBar.module.sass";
import classNames from "classnames";
import {useNavigate} from "react-router";

import {API_URL_DOC} from "shared/api/base";

export const MenuBar = () => {

    const userRole = useSelector(getUserRole)
    // const userRole = localStorage.getItem("role")
    const navigation = useNavigate()
    const userSurname = useSelector(getUserSurname)
    // const userName = useSelector(getUserName)
    const userId = useSelector(getUserId)
    const userPhoto = localStorage.getItem("photo")


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
                <div onClick={() => navigation(`/platform/staff/profile/${userId}`, {replace: true})} className={cls.menu__header}>
                    <img src={`${API_URL_DOC}${userPhoto}`} alt=""/>
                </div>
                {renderMenuItems()}
            </div>
            <Link
                onClick={() => {
                    localStorage.clear()
                    sessionStorage.clear()
                }}
                extraClass={classNames(cls.menu__exit)}
                to={"/login"}
            >
                <i className="fas fa-sign-out-alt"/>
                <p>Выйти</p>
            </Link>
        </div>
    );
}
