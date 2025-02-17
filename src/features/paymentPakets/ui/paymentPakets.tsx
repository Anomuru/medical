import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useSelector} from "react-redux";

import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {ConfirmModal} from "shared/ui/confirm";
import {Input} from "shared/ui/input";
import {paymentPacketsActions} from "../model/paymentPacketsSlice";
import {getPaymentPacketsData} from "../model/paymentPacketsSelector";

import cls from "./paymentPakets.module.sass";
import arrowContainedSquare from "shared/assets/icon/arrowContainedSquare.svg";
import {IAnalysisProps} from "../../../entities/pakets";

export const PaymentPackets = () => {

    const dispatch = useAppDispatch()
    const data = useSelector(getPaymentPacketsData)
    const [isPacket, setIsPacket] = useState<number | "all">()
    const [isPacketDelete, setIsPacketDelete] = useState<boolean>(false)
    const [isAnalysis, setIsAnalysis] = useState<number>()
    const [isAnalysisDelete, setIsAnalysisDelete] = useState<boolean>(false)
    const [isAnalysisId, setIsAnalysisId] = useState<number>()
    const [isAnalysisIdDelete, setIsAnalysisIdDelete] = useState<boolean>(false)
    const [isAnalysisAllDelete, setIsAnalysisAllDelete] = useState<boolean>(false)

    const {
        deletePacketAnalysis,
        deletePacket,
        onChangePacket,
        onChangeAllAnalysis,
        deleteAnalysis,
        deleteAllAnalysis,
        onChangeAnalysis,
        onChangePacketAnalysis
    } = paymentPacketsActions

    const onDeletePacket = () => {
        dispatch(deletePacket(isPacket))
        setIsPacketDelete(false)
    }

    const onClickPacket = (id?: number | "all") => {
        setIsPacket(id)
        setIsPacketDelete(true)
    }

    const onDeletePacketAnalysis = () => {
        dispatch(deletePacketAnalysis(isAnalysis))
    }

    const onClickPacketAnalysis = (id: number, packetId: number | "all") => {
        setIsAnalysis(id)
        setIsPacket(packetId)
        setIsAnalysisDelete(true)
    }

    const onDeleteAnalysis = () => {
        dispatch(deleteAnalysis(isAnalysisId))
        setIsAnalysisIdDelete(false)
    }

    const onClickAnalysis = (id: number) => {
        setIsAnalysisId(id)
        setIsAnalysisIdDelete(true)
    }

    const onDeleteAllAnalysis = () => {
        dispatch(deleteAllAnalysis())
        setIsAnalysisAllDelete(false)
    }

    const onChangeAnalysisCheck = (id: number, packetId: number | "all") => {
        if (packetId === "all") {
            console.log(data, "data")
            const selected = data?.analysis_list
                .filter(item => item.id === id)[0]
            console.log(selected, "isChecked")
            dispatch(onChangeAnalysis({id, status: !selected?.isChecked}))
        } else {
            const selected = data?.packet
                .filter(item => item.packet_id === packetId)[0]?.analysis_list
                .filter(item => item.id === id)[0]
            dispatch(onChangePacketAnalysis({id, packetId, status: !selected?.isChecked}))
        }
    }

    const onChangePacketCheck = (id: number, type: "packet" | "another") => {
        if (type === "packet") {
            const selected = data?.packet
                .filter(item => item.packet_id === id)[0]?.analysis_list
                .every(item => item.isChecked)
            dispatch(onChangePacket({id, status: !selected}))
        } else {
            const selected = data?.analysis_list
                .every(item => item.isChecked)
            dispatch(onChangeAllAnalysis(!selected))
        }
    }

    const formatSalary = (data: IAnalysisProps[]) => {
        return data.reduce((sum, item) => sum + item.price, 0);
    };

    const [isOpen, setIsOpen] = useState<Array<number | "another">>([])
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = (id: number | "another") => setIsOpen(prev =>
        prev?.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen([]);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    function compareById(a: { id: number }, b: { id: number }) {
        return a.id - b.id;
    }

    const render = useCallback((list: IAnalysisProps[], packetId: number | "all") => {
        if (!list) return;
        return [...list]?.sort(compareById)?.map(item => {
            return (
                <div className={cls.analysis__item}>
                    <h1 className={cls.title}>{item.analysis.name}</h1>
                    <hr/>
                    <h2 className={cls.value}>{item?.price}</h2>
                    <Input
                        onChange={() => onChangeAnalysisCheck(item.id, packetId)}
                        extraClass={cls.check}
                        name={item.analysis.name}
                        type={"checkbox"}
                        checked={item.isChecked}
                    />
                    {!item.paid &&
                        <div
                            onClick={() => packetId === "all"
                                ? onClickAnalysis(item.id)
                                : onClickPacketAnalysis(item.id, packetId)}
                            className={cls.minus}
                        >
                            <i className="fas fa-minus"></i>
                        </div>}
                </div>
            )
        })
    }, [onChangeAnalysisCheck])

    const renderPackets = useCallback(() => {
        return data?.packet.map(item => {
            return (
                <div className={cls.paket}>
                    <div className={cls.header}>
                        <div className={cls.row}>
                            <span>{item.packet_name}</span>
                            <span>{formatSalary(item.analysis_list)}</span>
                        </div>
                        <div className={cls.subrow}>
                            <span>Списки анализа :</span>
                            <div className={cls.subrow__wrapper}>
                                <span>
                                    <img
                                        onClick={() => toggleDropdown(item.packet_id)}
                                        src={arrowContainedSquare}
                                        alt=""/>
                                </span>
                                <Input
                                    onChange={() => onChangePacketCheck(item.packet_id, "packet")}
                                    extraClass={cls.check}
                                    checked={item.analysis_list.every(item => item.isChecked)}
                                    type={"checkbox"}
                                    name={"main"}
                                />
                                <div
                                    onClick={() => onClickPacket(item.packet_id)}
                                    className={cls.minus}
                                >
                                    <i className="fas fa-minus"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    {isOpen.includes(item.packet_id) && (
                        <div className={cls.analysis}>
                            {render(item.analysis_list, item.packet_id)}
                        </div>
                    )}

                </div>
            )
        })
    }, [data?.packet, isOpen, onChangePacketCheck, render])

    return (
        <>
            {renderPackets()}
            {!!data?.analysis_list.length && <div className={cls.paket}>
                <div className={cls.header}>
                    <div className={cls.row}>
                        <span>Другое</span>
                        <span>{!!data?.analysis_list && formatSalary(data?.analysis_list)}</span>
                    </div>
                    <div className={cls.subrow}>
                        <span>Списки анализа :</span>
                        <div className={cls.subrow__wrapper}>
                                <span>
                                    <img
                                        onClick={() => toggleDropdown("another")}
                                        src={arrowContainedSquare}
                                        alt=""/>
                                </span>
                            <Input
                                onChange={() => onChangePacketCheck(NaN, "another")}
                                extraClass={cls.check}
                                checked={data?.analysis_list.every(item => item.isChecked)}
                                type={"checkbox"}
                                name={"main"}
                            />
                            <div
                                // onClick={() => onClickPacket(item.packet_id)}
                                className={cls.minus}
                            >
                                <i className="fas fa-minus"></i>
                            </div>
                        </div>
                    </div>
                </div>

                {isOpen.includes("another") && (
                    <div className={cls.analysis}>
                        {!!data?.analysis_list.length && render(data?.analysis_list, "all")}
                    </div>
                )}
            </div>}
            <ConfirmModal
                onClick={onDeletePacket}
                setActive={setIsPacketDelete}
                active={isPacketDelete}
            />
            <ConfirmModal
                onClick={onDeletePacketAnalysis}
                setActive={setIsAnalysisDelete}
                active={isAnalysisDelete}
            />
            <ConfirmModal
                onClick={onDeleteAnalysis}
                setActive={setIsAnalysisIdDelete}
                active={isAnalysisIdDelete}
            />
            <ConfirmModal
                onClick={onDeleteAllAnalysis}
                setActive={setIsAnalysisAllDelete}
                active={isAnalysisAllDelete}
            />
        </>
    );
}
