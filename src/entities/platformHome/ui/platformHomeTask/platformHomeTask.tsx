import React, {useCallback} from 'react';

import cls from "./platformHomeTask.module.sass";
import image from "shared/assets/images/taskImage.png";

const list = [
    {
        name: "Patient Rounds",
        date: "25 Jan, 2023",
        hour: "04:00 PM"
    }, {
        name: "Laboratory test results review",
        date: "25 Jan, 2023",
        hour: "04:00 PM"
    }, {
        name: "Surgical procedures",
        date: "25 Jan, 2023",
        hour: "04:00 PM"
    },
]

export const PlatformHomeTask = () => {

    const renderList = useCallback(() => {
        return list.map(item => {
            return (
                <div className={cls.item}>
                    <div className={cls.item__ava}>{item.name.slice(0, 1).toUpperCase()}</div>
                    <div className={cls.info}>
                        <h3 className={cls.info__title}>{item.name}</h3>
                        <p className={cls.info__text}>
                            <span>{item.date}</span>
                            |
                            <span>{item.hour}</span>
                        </p>
                    </div>
                </div>
            )
        })
    }, [])

    return (
        <div className={cls.tasks}>
            <div className={cls.content}>
                <h2 className={cls.content__title}>
                    Recently Assigned Tasks
                    <span>62</span>
                </h2>
                <p className={cls.content__more}>View All</p>
                <div className={cls.content__list}>
                    {renderList()}
                </div>
            </div>
            <img className={cls.tasks__image} src={image} alt=""/>
        </div>
    );
}
