import React from 'react';

import cls from "./platformHomeDaily.module.sass";
import image from "shared/assets/images/dailyImage.png";

export const PlatformHomeDaily = () => {
    return (
        <div className={cls.daily}>
            <h2 className={cls.daily__title}>Daily Read</h2>
            <p className={cls.daily__text}>New rules in the dose of medicines to be consumed.</p>
            <img
                className={cls.daily__image}
                src={image}
                alt=""
            />
        </div>
    );
}
