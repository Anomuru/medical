import React, {memo, useCallback, useEffect, useRef, useState} from 'react';

import {PacketsUserList} from "entities/pakets";
import {ConfirmModal} from "shared/ui/confirm";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {IAnalysisProps, IUserPackets} from "entities/pakets/model/paketsSchema";
import {userAnalysisActions} from "entities/analysis";

interface ICurrentList extends IAnalysisProps {
    isChecked?: boolean
}

interface IPacketsProps {
    item: IUserPackets
}

export const PaymentPackets = memo(({item}: IPacketsProps) => {

    const {
        packet_id,
        packet_name,
        analysis_list,
        total
    } = item

    const dispatch = useAppDispatch()

    const {
        deletePacketAnalysis,
        deletePacket,
        onCheckedPacket,
        onCheckedPacketAnalysis
    } = userAnalysisActions
    // const {
    //     getSelectedAnalysis,
    //     addSelectedAnalysis,
    //     deleteSelectedAnalysis
    // } = paymentPacketActions

    // useEffect(() => {
    //     if (packet_id)
    //         dispatch(addSelectedAnalysis({packetId: packet_id, analysisIdes: []}))
    // }, [addSelectedAnalysis, dispatch, packet_id])

    // const selectedAnalysis = useSelector(getPaymentPacketSelected)

    const [analysisList, setAnalysisList] = useState<ICurrentList[]>([])
    const [isDeleteAnalysis, setIsDeleteAnalysis] = useState<boolean>(false)
    const [isDeletePacket, setIsDeletePacket] = useState<boolean>(false)
    const [isActiveAnalysis, setIsActiveAnalysis] = useState<number>(NaN)
    const [selectedAnalysis, setSelectedAnalysis] = useState<number[]>([])

    useEffect(() => {
        if (analysis_list.length !== analysisList.length)
            setAnalysisList(analysis_list.map(item => ({...item, isChecked: false})))
    }, [analysisList.length, analysis_list])

    // useEffect(() => {
    //     if (selectedAnalysis) {
    //         const filtered = selectedAnalysis
    //             ?.filter(item => item.packetId === packet_id)[0]?.analysisIdes
    //         if (!!filtered?.length) {
    //             setAnalysisList(prevState =>
    //                 prevState.map(item =>
    //                     ({...item, isChecked: filtered.includes(item.id)}))
    //             )
    //         }
    //     }
    // }, [analysis_list, packet_id, selectedAnalysis])

    // useEffect(() => {
    //     if (!!analysisList && packet_id) {
    //         const selected = analysisList
    //             .filter(item => item.isChecked)
    //             .map(item => item.id)
    //         const notSelected = analysisList
    //             .filter(item => !item.isChecked)
    //             .map(item => item.id)
    //         if (!!selected.length) {
    //             dispatch(getSelectedAnalysis({packetId: packet_id, analysisIdes: selected}))
    //         }
    //         if (!!notSelected.length) {
    //             dispatch(deleteSelectedAnalysis({packetId: packet_id, analysisIdes: notSelected}))
    //         }
    //     }
    // }, [analysisList, deleteSelectedAnalysis, dispatch, getSelectedAnalysis, packet_id])

    const onDeleteAnalysis = () => {
        dispatch(deletePacketAnalysis({packetId: packet_id, analysisId: isActiveAnalysis}))
        setIsDeleteAnalysis(false)
    }

    const onClickAnalysis = (id: number) => {
        setIsActiveAnalysis(id)
        setIsDeleteAnalysis(true)
    }

    const onDeletePacket = () => {
        dispatch(deletePacket(packet_id))
        setIsDeletePacket(false)
    }

    const onClickPacket = () => {
        setIsDeletePacket(true)
    }

    useEffect(() => {
        if (selectedAnalysis) console.log(selectedAnalysis, "selectedAnalysis")
    }, [selectedAnalysis])

    useEffect(() => {
        if (analysisList) {
            const selected = analysisList
                .filter(item => item.isChecked)
                .map(item => item.id)
            setSelectedAnalysis(selected)
        }
    }, [analysisList])

    const onChange = useCallback((id: number | "all") => {
        setAnalysisList(prevState => {
            if (id === "all") {
                const allChecked = prevState.every(item => item.isChecked);
                return prevState.map(item => ({...item, isChecked: !allChecked}));
            }

            return prevState.map(item =>
                item.id === id ? {...item, isChecked: !item.isChecked} : item
            );
        });
    }, [])

    return (
        <>
            <PacketsUserList
                onChange={onChange}
                packet_id={packet_id}
                packet_name={packet_name}
                list={analysisList}
                total={total}
                onDeleteAnalysis={onClickAnalysis}
                onDeletePacket={onClickPacket}
            />
            <ConfirmModal
                onClick={onDeleteAnalysis}
                setActive={setIsDeleteAnalysis}
                active={isDeleteAnalysis}
            />
            <ConfirmModal
                onClick={onDeletePacket}
                setActive={setIsDeletePacket}
                active={isDeletePacket}
            />
        </>
    );
})