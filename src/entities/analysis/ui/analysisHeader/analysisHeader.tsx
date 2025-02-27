import {memo, useCallback, useState} from 'react';
import {NavLink} from "react-router";

import cls from "./analysisHeader.module.sass";
import classNames from "classnames";

const list = [
    {
        label: "Пакет",
        path: "package"
    },
    {
        label: "Группа",
        path: "group"
    },
    {
        label: "Контейнер",
        path: "container"
    },
    {
        label: "Анализ",
        path: "analysisGroup"
    }
]


export const AnalysisHeader = memo(() => {
    const [active, setActive] = useState<string>(list[0].label)


    const route = localStorage.getItem("route")


    const render = useCallback(() => {
        return list.map(item => {
            return (
                <NavLink
                    className={classNames(cls.header__item, {
                        [cls.active]: item.path === route
                    })}
                    to={`./../${item.path}`}
                    onClick={() => {
                        setActive(item.label)
                        localStorage.setItem("route", item.path)
                    }}
                >
                    {item.label}
                </NavLink>
            )
        })
    }, [active, route])

    return (
        <div className={cls.header}>
            {render()}
        </div>
    );
})
