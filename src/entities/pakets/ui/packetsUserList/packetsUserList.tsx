import React, {memo, useCallback, useEffect, useRef, useState} from 'react';

import cls from "./packetsUserList.module.sass";
import arrowContainedSquare from "shared/assets/icon/arrowContainedSquare.svg";
import {IAnalysisProps} from "../../model/paketsSchema";
import {Input} from "../../../../shared/ui/input";

interface ICurrentList extends IAnalysisProps {
    isChecked?: boolean
}

interface IPacketsUser {
    packet_id?: number,
    packet_name?: string,
    list?: ICurrentList[],
    total?: string | number,
    onDeleteAnalysis: (arg: number, arg2: number) => void,
    onDeletePacket: (arg?: number) => void,
    onChange?: (arg: number | "all", arg2: number | "another") => void
}

export const PacketsUserList = memo((props: IPacketsUser) => {

    const {
        packet_id,
        total,
        packet_name,
        list,
        onDeleteAnalysis,
        onDeletePacket,
        onChange
    } = props

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const formatSalary = () => {
        return Number(total).toLocaleString();
    };

    function compareById(a: { id: number }, b: { id: number }) {
        return a.id - b.id;
    }

    const render = useCallback(() => {
        return list?.sort(compareById)?.map(item => {
            return (
                <div className={cls.analysis__item}>
                    <h1 className={cls.title}>{item.analysis.name}</h1>
                    <hr/>
                    <h2 className={cls.value}>{item?.price}</h2>
                    {/*<h2 className={cls.value}>0</h2>*/}
                    <Input
                        onChange={() => (!!onChange && packet_id) && onChange(item.id, packet_id)}
                        extraClass={cls.check}
                        name={item.analysis.name}
                        type={"checkbox"}
                        checked={item.isChecked}
                    />
                    {(!item.paid && packet_id) &&
                        <div onClick={() => onDeleteAnalysis(item.id, packet_id)} className={cls.minus}>
                            <i className="fas fa-minus"></i>
                        </div>}
                </div>
            )
        })
    }, [onDeleteAnalysis, list])


    return (
        <div className={cls.paket}>
            <div className={cls.header}>
                <div className={cls.row}>
                    <span>{packet_name ?? "Другой"}</span>
                    {/*<span>Name</span>*/}
                    {/*<span>{price}</span>*/}
                    <span>{formatSalary()}</span>
                </div>
                <div className={cls.subrow}>
                    <span>Списки анализа :</span>
                    <div className={cls.subrow__wrapper}>
                        <span><img onClick={toggleDropdown} src={arrowContainedSquare} alt=""/></span>
                        <Input
                            onChange={() => (!!onChange && packet_id) && onChange("all", packet_id)}
                            extraClass={cls.check}
                            checked={list?.every(item => item.isChecked)}
                            type={"checkbox"}
                            name={"main"}
                        />
                        <div
                            onClick={() => packet_id && onDeletePacket(packet_id)}
                            className={cls.minus}
                        >
                            <i className="fas fa-minus"></i>
                        </div>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className={cls.analysis}>
                    {render()}
                </div>
            )}

        </div>
    )
})