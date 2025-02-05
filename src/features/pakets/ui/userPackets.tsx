import React, {memo, useEffect, useState} from 'react';

import {packetsActions, PacketsUserList} from "entities/pakets";
import {ConfirmModal} from "shared/ui/confirm";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {IAnalysisProps, IUserPackets} from "../../../entities/pakets/model/paketsSchema";


interface IPacketsProps {
    item: IUserPackets,
    onDeletePacketAnalysis: (arg: number, arg2: number) => void,
    onDeletePacketId: (arg: number) => void
}

export const UserPackets = memo(({item, onDeletePacketAnalysis, onDeletePacketId}: IPacketsProps) => {

    const {packet_id, packet_name, analysis_list} = item

    const [analysisList, setAnalysisList] = useState<any[]>([])

    useEffect(() => {
        setAnalysisList(analysis_list)
    }, [analysis_list])

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
        if (packet_id) {
            onDeletePacketAnalysis(isActiveAnalysis, packet_id)
            setIsDeleteAnalysis(false)
        }
    }

    const onDeletePacket = () => {
        // dispatch(deletePacket(isActivePacket))
        onDeletePacketId(isActivePacket)
        setIsDeletePacket(false)
    }

    const onClickAnalysis = (id: number) => {
        console.log(id, "id", "userPackets")
        setIsActiveAnalysis(id)
        setIsDeleteAnalysis(true)
    }

    const onClickPacket = (id?: number) => {
        if (id) {
            setIsDeletePacket(true)
            setIsActivePacket(id)
        }
    }

    return (
        <>
            <PacketsUserList
                packet_id={packet_id}
                packet_name={packet_name}
                list={analysisList}
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