import React, {memo, useCallback, useEffect, useRef, useState} from 'react';

import cls from "./packetsUserList.module.sass";
import arrowContainedSquare from "shared/assets/icon/arrowContainedSquare.svg";
import {IAnalysisProps} from "../../model/paketsSchema";

interface IPacketsUser {
    packet_id?: number,
    packet_name?: string,
    list?: IAnalysisProps[],
    total?: string,
    onDeleteAnalysis: (arg: number) => void
    onDeletePacket: (arg?: number) => void
}

export const PacketsUserList = memo((props: IPacketsUser) => {

    const {packet_id, total, packet_name, list, onDeleteAnalysis, onDeletePacket} = props

    const [isOpen, setIsOpen] = useState<boolean>(false);
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

    const render = useCallback(() => {

        return list?.map(item => {

            return (
                <div className={cls.analysis__item}>
                    <h1 className={cls.title}>{item.analysis.name}</h1>
                    <hr/>
                    <h2 className={cls.value}>{item?.price}</h2>
                    {/*<h2 className={cls.value}></h2>*/}
                    <div onClick={() => onDeleteAnalysis(item.id)} className={cls.minus}>
                        <i className="fas fa-minus"></i>

                    </div>
                </div>
            )
        })

    }, [onDeleteAnalysis, list])


    return (
        <div className={cls.paket}>
            <div className={cls.header}>
                <div className={cls.row}>
                    <span>{packet_name ?? "Boshqa"}</span>
                    {/*<span>Name</span>*/}
                    {/*<span>{price}</span>*/}
                    <span>{total}</span>
                </div>
                <div className={cls.subrow}>
                    <span>Analiz ro’yxatlari :</span>
                    <div className={cls.subrow__wrapper}>
                        <span><img onClick={toggleDropdown} src={arrowContainedSquare} alt=""/></span>
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