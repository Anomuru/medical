import {memo, useCallback, useState} from 'react';
import {NavLink} from "react-router";

import cls from "./analysisHeader.module.sass";
import classNames from "classnames";

const list = [
    {
        label: "Paket",
        path: "package"
    },
    {
        label: "Guruh",
        path: "group"
    },
    {
        label: "Container",
        path: "container"
    },
    {
        label: "Analiz",
        path: "analysisGroup"
    }
]




export const AnalysisHeader = memo(() => {
    const [active, setActive] = useState<string>(list[0].label)


    const render = useCallback(() => {
        return list.map(item => {
            return (
                <NavLink
                    className={classNames(cls.header__item , {
                        [cls.active] : item.label === active
                    })}
                    to={`./../${item.path}`}
                    onClick={() => setActive(item.label)}
                >
                    {item.label}
                </NavLink>
            )
        })
    }, [active])

    return (
        <div className={cls.header}>
            {render()}
        </div>
    );
})
