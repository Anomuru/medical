import React from 'react';

import cls from "./platformHomeUpdates.module.sass";
// import

export const PlatformHomeUpdates = () => {
    return (
        <div className={cls.updates}>
            <div className={cls.updates__header}>
                <h1 className={cls.updates__title}>Updates</h1>
                <p className={cls.updates__text}>View All</p>
            </div>
            <div className={cls.updates__content}>
                <img className={cls.updates__image} src="" alt=""/>
                <div className={cls.info}>
                    <h2 className={cls.info__title}>Montly doctor’s meet</h2>
                    <p className={cls.info__text}>
                        <span>30 Jan, 2023</span>
                        |
                        <span>04:00 PM</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
