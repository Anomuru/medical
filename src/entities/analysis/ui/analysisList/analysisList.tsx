import React, {memo, useCallback} from 'react';
import {useSelector} from "react-redux";

import {Table} from "shared/ui/table";
import {getAnalysisData} from "../../model/selector/analysisSelector";

import cls from "./analysisList.module.sass";

export const AnalysisList = memo(({isChange}: any) => {

    const data = useSelector(getAnalysisData)


    const render = useCallback(() => {
        return data?.map((item, index) => {
            return (
                <tr>
                    <td>{index + 1}</td>
                    <td>{item?.name}</td>
                    <td>{item?.code_name}</td>
                    <td>{item?.type}</td>
                    <td>{item?.packet}</td>
                    <td>{item?.device}</td>
                    <td>{item?.container}</td>
                    <td>{item.price}</td>
                    <td>
                        <i onClick={() => isChange(item)} className={"fas fa-edit"}/>
                    </td>
                </tr>
            )
        })
    }, [data])

    return (
        <Table>
            <thead>
            <tr>
                <th>№</th>
                <th>Название анализа</th>
                <th>Кодовое имя</th>
                <th>Группа</th>
                <th>Пакет</th>
                <th>Устройство</th>
                <th>Контейнер</th>
                <th>Цена</th>
                <th/>
            </tr>
            </thead>
            <tbody>
            {render()}
            </tbody>
        </Table>
    );
})
