import React, {memo, useCallback, useEffect, useRef, useState} from 'react';

import cls from "./packetsUserList.module.sass";
import arrowContainedSquare from "shared/assets/icon/arrowContainedSquare.svg";
import {IAnalysisProps} from "../../model/paketsSchema";
import {Input} from "../../../../shared/ui/input";

interface IPacketsUser {
    packet_id?: number,
    packet_name?: string,
    list?: IAnalysisProps[],
    total?: string | number,
    onDeleteAnalysis: (arg: number) => void
    onDeletePacket: (arg?: number) => void
}

interface ICurrentList extends IAnalysisProps {
    isChecked: boolean
}

export const PacketsUserList = memo((props: IPacketsUser) => {

    const {packet_id, total, packet_name, list, onDeleteAnalysis, onDeletePacket} = props

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [currentList, setCurrentList] = useState<ICurrentList[]>([])
    const [isSelectAll, setIsSelectAll] = useState<boolean>(false)
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (list)
            setCurrentList(list?.map(item => ({...item, isChecked: false})))
    }, [list])

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

    useEffect(() => {
        const filtered = currentList.map(item => ({isChecked: item.isChecked, id: item.id}))
        if (filtered.every(item => item.isChecked)) {
            setIsSelectAll(true)
            console.log(true, "true")
            console.log(filtered, "filtered")
        }
    }, [currentList])

    const onChange = () => {
        if (isSelectAll) {
            setCurrentList(prevState => prevState.map(item => ({...item, isChecked: false})))
            setIsSelectAll(false)
        } else {
            setCurrentList(prevState => prevState.map(item => ({...item, isChecked: true})))
            setIsSelectAll(true)
        }
    }

    const formatSalary = () => {
        return Number(total).toLocaleString();
    };

    function compareById(a: { id: number }, b: { id: number }) {
        return a.id - b.id;
    }

    const render = useCallback(() => {
        return currentList?.sort(compareById)?.map(item => {
            return (
                <div className={cls.analysis__item}>
                    <h1 className={cls.title}>{item.analysis.name}</h1>
                    <hr/>
                    <h2 className={cls.value}>{item?.price}</h2>
                    {/*<h2 className={cls.value}>0</h2>*/}
                    <Input
                        onChange={() => {
                            setCurrentList(prev => {
                                const filtered = prev?.filter(inner => inner.id === item.id)[0]
                                return [
                                    ...prev?.filter(inner => inner.id !== item.id),
                                    {...filtered, isChecked: !filtered?.isChecked}
                                ]
                            })
                        }}
                        extraClass={cls.check}
                        name={item.analysis.name}
                        type={"checkbox"}
                        checked={item.isChecked}
                    />
                    {!item.paid && <div onClick={() => onDeleteAnalysis(item.id)} className={cls.minus}>
                        <i className="fas fa-minus"></i>
                    </div>}
                </div>
            )
        })
    }, [onDeleteAnalysis, currentList])


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
                            onChange={onChange}
                            extraClass={cls.check}
                            checked={isSelectAll}
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