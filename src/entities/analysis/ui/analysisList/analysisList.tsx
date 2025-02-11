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
                <th>Number</th>
                <th>Analiz nomi</th>
                <th>Kod nomi</th>
                <th>Guruh</th>
                <th>Paket</th>
                <th>Device</th>
                <th>Conatiner</th>
                <th>Narxi</th>
                <th/>
            </tr>
            </thead>
            <tbody>
            {render()}
            </tbody>
        </Table>
    );
})
