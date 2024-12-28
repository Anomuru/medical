import React from 'react';
import classNames from "classnames";

import {Input} from "shared/ui/input";

import cls from "./header.module.sass";
import logo from "shared/assets/logo/medicalLogo.png";
import profileImage from "shared/assets/images/loginImage.png";

export const Header = () => {
    return (
        <div className={cls.header}>
            <img
                className={cls.header__logo}
                src={logo}
                alt=""
            />
            <div className={cls.setting}>
                <div className={cls.setting__search}>
                    <i className={classNames("fa-solid fa-search", cls.setting__icon)}/>
                    <Input extraClass={cls.setting__input} name={"search"}/>
                </div>
                <div className={cls.setting__notifications}>
                    <i className={classNames("fa-solid fa-bell", cls.setting__notification)}/>
                    <div className={cls.setting__newMessage}/>
                </div>
                <div className={cls.profile}>
                    <img
                        className={cls.profile__image}
                        src={profileImage}
                        alt="profileImage"
                    />
                    <h2 className={cls.profile__surname}>Dr. Ram</h2>
                </div>
            </div>
        </div>
    )
}
