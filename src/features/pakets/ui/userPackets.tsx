import React, {memo, useCallback, useEffect, useRef, useState} from 'react';

import {packetsActions, PacketsUserList} from "entities/pakets";
import {ConfirmModal} from "shared/ui/confirm";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {IAnalysisProps, IUserPackets} from "../../../entities/pakets/model/paketsSchema";

interface ICurrentList extends IAnalysisProps {
    isChecked?: boolean
}

interface IPacketsProps {
    item: IUserPackets,
    onDeletePacketAnalysis?: (arg: number, arg2: number) => void,
    onDeletePacketId?: (arg: number) => void,
    onGetSelectedAnalysis?: (arg: number[]) => void,
    selectedAnalysis?: number[]
}

export const UserPackets = memo((props: IPacketsProps) => {

    const {
        item,
        onDeletePacketAnalysis,
        onDeletePacketId,
        selectedAnalysis,
        onGetSelectedAnalysis
    } = props
    const {
        packet_id,
        packet_name,
        analysis_list,
        total
    } = item

    const [analysisList, setAnalysisList] = useState<ICurrentList[]>([])

    const prevAnalysisListRef = useRef<IAnalysisProps[]>([]);

    useEffect(() => {
        if (!analysis_list) return;

        const newAnalysisList = analysis_list.map(item => ({
            ...item,
            isChecked: selectedAnalysis?.includes(item.id) || false
        }));

        if (
            prevAnalysisListRef.current.length === newAnalysisList.length &&
            prevAnalysisListRef.current.every((item, index) => item.id === newAnalysisList[index].id)
        ) {
            return;
        }

        prevAnalysisListRef.current = newAnalysisList;
        setAnalysisList(newAnalysisList);
    }, [analysis_list, selectedAnalysis]);

    useEffect(() => {
        if (!onGetSelectedAnalysis) return;

        const selectedSet = new Set(selectedAnalysis);
        const newSelected = analysisList.filter(item => item.isChecked).map(item => item.id);

        if (newSelected.length !== selectedSet.size || newSelected.some(id => !selectedSet.has(id))) {
            onGetSelectedAnalysis(newSelected);
        }
    }, [onGetSelectedAnalysis, analysisList, selectedAnalysis]);

    const dispatch = useAppDispatch()

    const [isDeleteAnalysis, setIsDeleteAnalysis] = useState(false)
    const [isDeletePacket, setIsDeletePacket] = useState(false)
    const [isActiveAnalysis, setIsActiveAnalysis] = useState(NaN)
    const [isActivePacket, setIsActivePacket] = useState(NaN)

    const onDeleteAnalysis = () => {
        let price: number = 0;
        // item.analysis?.filter(item => item.id !== isActiveAnalysis)
        //     .map(inner => {
        //         price += Number(inner.price)
        //     })
        // dispatch(deleteAnalysis({
        //     packageId: item.id,
        //     analysisId: isActiveAnalysis,
        //     packagePrice: price
        // }))
        // dispatch(deleteUserPacketsAnalysis(isActiveAnalysis))
        if (packet_id && onDeletePacketAnalysis) {
            onDeletePacketAnalysis(isActiveAnalysis, packet_id)
            setIsDeleteAnalysis(false)
        }
    }

    const onDeletePacket = () => {
        // dispatch(deletePacket(isActivePacket))
        if (onDeletePacketId) {
            onDeletePacketId(isActivePacket)
            setIsDeletePacket(false)
        }
    }

    const onClickAnalysis = (id: number) => {
        setIsActiveAnalysis(id)
        setIsDeleteAnalysis(true)
    }

    const onClickPacket = (id?: number) => {
        if (id) {
            setIsDeletePacket(true)
            setIsActivePacket(id)
        }
    }

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