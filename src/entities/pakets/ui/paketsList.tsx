import React, {memo, useCallback, useEffect, useRef, useState} from 'react';

import cls from "./paketsList.module.sass";
import arrowContainedSquare from "shared/assets/icon/arrowContainedSquare.svg";
import {IAnalysis} from "entities/analysis";
import {IPackagesWithAnalysis} from "shared/types/oftenUsedTypes";




type PropsType = {
    onDelete: (arg: number) => void;
    title: string,
    totalPrice: number,
    packages: IAnalysis[]
}

export const PaketsList = memo(({onDelete, totalPrice, title,packages}: PropsType) => {


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

        return packages.map(item => {
            return (
                <div className={cls.analysis__item}>
                    <h1 className={cls.title}>Протромбиновое время (ПВ)</h1>
                    <hr/>
                    <h2 className={cls.value}>200.000</h2>
                    <div onClick={() => onDelete(1)} className={cls.minus}>
                        <i className="fas fa-minus"></i>

                    </div>
                </div>
            )
        })


    }, [onDelete,packages])


    return (
        <div className={cls.paket}>
            <div className={cls.header}>
                <div className={cls.row}>
                    <span>{title}</span>
                    <span>{totalPrice}</span>
                </div>
                <div className={cls.subrow}>
                    <span>Analiz ro’yxatlari :</span>
                    <span><img onClick={toggleDropdown} src={arrowContainedSquare} alt=""/></span>
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