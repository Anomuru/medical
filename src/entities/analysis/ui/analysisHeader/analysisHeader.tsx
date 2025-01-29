import {memo, useCallback} from 'react';
import {NavLink} from "react-router";

import cls from "./analysisHeader.module.sass";

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
        path: "analysis"
    }
]

export const AnalysisHeader = memo(() => {

    const render = useCallback(() => {
        return list.map(item => {
            return (
                <NavLink
                    className={
                        ({isActive}) =>
                            isActive ? `` : ``
                    }
                    to={item.path}
                >
                    {item.label}
                </NavLink>
            )
        })
    }, [list])

    return (
        <div className={cls.header}>
            {render()}
        </div>
    );
})
