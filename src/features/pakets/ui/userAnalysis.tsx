import React, {memo, useEffect, useState} from 'react';
import {useAppDispatch} from "../../../shared/lib/hooks/useAppDispatch/useAppDispatch";
import {packetsActions, PacketsList, PacketsUserList} from "../../../entities/pakets";
import {ConfirmModal} from "../../../shared/ui/confirm";
import {IAnalysisProps, IUserPackets} from "../../../entities/pakets/model/paketsSchema";

interface IUserAnalysis {
    item: IAnalysisProps[],
    total?: string | number,
    onDeleteAnalysisId?: (arg: number) => void,
    onDeleteAllAnalysis?: () => void,
    onGetSelectedAnalysis?: (arg: number[]) => void,
    selectedAnalysis?: number[]
}

interface ICurrentList extends IAnalysisProps {
    isChecked?: boolean
}

export const UserAnalysis = memo((props: IUserAnalysis) => {

    const {
        item,
        onDeleteAnalysisId,
        onDeleteAllAnalysis,
        total,
        onGetSelectedAnalysis,
        selectedAnalysis
    } = props

    const [isDeleteAnalysis, setIsDeleteAnalysis] = useState(false)
    const [isDeletePacket, setIsDeletePacket] = useState(false)
    const [isActiveAnalysis, setIsActiveAnalysis] = useState(NaN)
    // const [isActivePacket, setIsActivePacket] = useState(NaN)

    const [currentList, setCurrentList] = useState<ICurrentList[]>([])

    useEffect(() => {
        if (item && currentList.length !== item.length) {
            if (!!selectedAnalysis) {
                setCurrentList(
                    item.map(item => selectedAnalysis.includes(item.id)
                        ? {...item, isChecked: true}
                        : {...item, isChecked: false}
                    )
                )
            } else
                setCurrentList(item.map(item => ({...item, isChecked: false})))
        }
    }, [currentList.length, item, selectedAnalysis])

    useEffect(() => {
        if (onGetSelectedAnalysis) {
            const selected = currentList
                .filter(item => item.isChecked)
                .map(item => item.id)
            if (selected.length !== selectedAnalysis?.length)
                onGetSelectedAnalysis(selected)
        }
    }, [onGetSelectedAnalysis, currentList, selectedAnalysis?.length])

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
        if (onDeleteAnalysisId) {
            onDeleteAnalysisId(isActiveAnalysis)
            setIsDeleteAnalysis(false)
        }
    }

    const onDeletePacket = () => {
        // dispatch(deletePacket(isActivePacket))
        if (onDeleteAllAnalysis) {
            onDeleteAllAnalysis()
            // setSelectedAnalysis([])
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

    const onChange = (id: number | "all") => {
        if (id === "all") {
            if (currentList.every(item => item.isChecked)) {
                setCurrentList(prevState =>
                    prevState.map(item => ({...item, isChecked: false})))
            } else {
                setCurrentList(prevState =>
                    prevState.map(item => ({...item, isChecked: true})))
            }
        } else {
            setCurrentList(prevState =>
                prevState
                    .map(item => {
                        if (item.id === id) {
                            return {...item, isChecked: !item.isChecked}
                        }
                        return item
                    })
            )
        }
    }

    return (
        <>
            <PacketsUserList
                onChange={onChange}
                packet_id={1}
                list={currentList}
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