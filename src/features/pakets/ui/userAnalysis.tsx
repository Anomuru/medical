import React, {memo, useState} from 'react';
import {useAppDispatch} from "../../../shared/lib/hooks/useAppDispatch/useAppDispatch";
import {packetsActions, PacketsList, PacketsUserList} from "../../../entities/pakets";
import {ConfirmModal} from "../../../shared/ui/confirm";
import {IAnalysisProps} from "../../../entities/pakets/model/paketsSchema";

interface IUserAnalysis {
    item: IAnalysisProps[],
    onDeleteAnalysisId?: (arg: number) => void,
    onDeleteAllAnalysis?: () => void
}

export const UserAnalysis = memo(({item, onDeleteAnalysisId, onDeleteAllAnalysis}: IUserAnalysis) => {

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
        if (onDeleteAnalysisId){
            onDeleteAnalysisId(isActiveAnalysis)
            setIsDeleteAnalysis(false)
        }
    }

    const onDeletePacket = () => {
        // dispatch(deletePacket(isActivePacket))
        if (onDeleteAllAnalysis){
            onDeleteAllAnalysis()
            setIsDeletePacket(false)
        }
    }

    const onClickAnalysis = (id: number) => {
        setIsActiveAnalysis(id)
        setIsDeleteAnalysis(true)
    }

    const onClickPacket = (arg?: number) => {
        console.log(true)
        setIsDeletePacket(true)
    }

    return (
        <>
            <PacketsUserList
                packet_id={1}
                list={item}
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