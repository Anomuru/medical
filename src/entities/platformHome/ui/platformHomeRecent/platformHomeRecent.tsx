import React, {useCallback} from 'react';

import cls from "./platformHomeRecent.module.sass";
import classNames from "classnames";

const list = [
    {
        image: "",
        name: "Patient Rounds",
        date: "25 Jan, 2023",
        hour: "04:00 PM"
    }, {
        image: "",
        name: "Laboratory test results review",
        date: "25 Jan, 2023",
        hour: "04:00 PM"
    }, {
        image: "",
        name: "Surgical procedures",
        date: "25 Jan, 2023",
        hour: "04:00 PM"
    },{
        image: "",
        name: "Surgical procedures",
        date: "25 Jan, 2023",
        hour: "04:00 PM"
    },
]

export const PlatformHomeRecent = () => {

    const renderList = useCallback(() => {
        return list.map(item => {
            return (
                <div className={cls.item}>
                    <div className={cls.item__wrapper}>
                        <img className={cls.item__image} src={item.image} alt=""/>
                        <div className={cls.info}>
                            <h3 className={cls.info__title}>{item.name}</h3>
                            <p className={cls.info__text}>
                                <span>{item.date}</span>
                                |
                                <span>{item.hour}</span>
                            </p>
                        </div>
                    </div>
                    <i className={classNames("fa-solid fa-ellipsis-v", cls.item__icon)}/>
                </div>
            )
        })
    }, [])

    return (
        <div className={cls.recent}>
            <h1 className={cls.recent__title}>Recent Conversations</h1>
            <div className={cls.recent__container}>
                {renderList()}
            </div>
        </div>
    );
}
