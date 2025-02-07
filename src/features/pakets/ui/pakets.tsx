import {memo, useState} from 'react';

import {PacketsList, IPackets, packetsActions} from "entities/pakets";
import {ConfirmModal} from "shared/ui/confirm";

import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";

interface IPacketProps {
    item: IPackets,
    index: number
}

export const Packets = memo(({item, index}: IPacketProps) => {

    const dispatch = useAppDispatch()
    const {
        deleteAnalysis,
        deletePacket
    } = packetsActions

    const [isDeleteAnalysis, setIsDeleteAnalysis] = useState(false)
    const [isDeletePacket, setIsDeletePacket] = useState(false)
    const [isActiveAnalysis, setIsActiveAnalysis] = useState(NaN)
    const [isActivePacket, setIsActivePacket] = useState(NaN)

    const onDeleteAnalysis = () => {
        let price: number = 0;
        item.analysis?.filter(item => item.id !== isActiveAnalysis)
            .map(inner => {
                price += Number(inner.price)
            })
        dispatch(deleteAnalysis({
            packageId: index,
            analysisId: isActiveAnalysis,
            packagePrice: price
        }))
        setIsDeleteAnalysis(false)
    }

    const onDeletePacket = () => {
        dispatch(deletePacket(isActivePacket))
        setIsDeletePacket(false)
    }

    const onClickAnalysis = (id: number) => {
        setIsActiveAnalysis(id)
        setIsDeleteAnalysis(true)
    }

    const onClickPacket = (id: number) => {
        setIsActivePacket(index)
        setIsDeletePacket(true)
    }

    return (
        <>
            <PacketsList
                item={item}
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