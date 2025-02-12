import React, {memo, useCallback, useEffect, useRef, useState} from 'react';

import cls from "./paketsList.module.sass";
import arrowContainedSquare from "shared/assets/icon/arrowContainedSquare.svg";
import {IPackets} from "../../model/paketsSchema";


interface PropsType {
    onDeleteAnalysis: (arg: number) => void,
    onDeletePacket: (arg: number) => void,
    item: IPackets,
    // title: string,
    // totalPrice: number,
    // packages: IAnalysis[]
}

export const PacketsList = memo((props: PropsType) => {

    const {item, onDeleteAnalysis, onDeletePacket} = props
    const {id, analysis, price, name} = item

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

        return analysis?.map((item, index) => {
            return (
                <div className={cls.analysis__item}>
                    <h1 className={cls.title}>{item.name}</h1>
                    <hr/>
                    <h2 className={cls.value}>{item.price}</h2>
                    <div onClick={() => onDeleteAnalysis(item.id)} className={cls.minus}>
                        <i className="fas fa-minus"></i>

                    </div>
                </div>
            )
        })


    }, [onDeleteAnalysis, analysis])


    return (
        <div className={cls.paket}>
            <div className={cls.header}>
                <div className={cls.row}>
                    <span>{name}</span>
                    <span>{price}</span>
                </div>
                <div className={cls.subrow}>
                    <span>Списки анализа :</span>
                    <div className={cls.subrow__wrapper}>
                        <span><img onClick={toggleDropdown} src={arrowContainedSquare} alt=""/></span>
                        {!item.extra &&
                            <div
                                onClick={() => onDeletePacket(id)}
                                className={cls.minus}
                            >
                                <i className="fas fa-minus"></i>
                            </div>
                        }
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