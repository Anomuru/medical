import React, {useCallback, useMemo, useState} from 'react';
import cls from "./deviceList.module.sass"
import {Box} from "shared/ui/box";
import deviceImg from "shared/assets/images/device.png"
import deviceIcon from "shared/assets/icon/device.png"
import {Pagination} from "features/pagination";

const list = [
    {
        user: {
            name: "Ventilator",
            img: deviceImg
        },
    },{
        user: {
            name: "Ventilator",
            img: deviceImg
        },
    },{
        user: {
            name: "Ventilator",
            img: deviceImg
        },
    },{
        user: {
            name: "Ventilator",
            img: deviceImg
        },
    },{
        user: {
            name: "Ventilator",
            img: deviceImg
        },
    },{
        user: {
            name: "Ventilator",
            img: deviceImg
        },
    },{
        user: {
            name: "Ventilator",
            img: deviceImg
        },
    },{
        user: {
            name: "Ventilator",
            img: deviceImg
        },
    },
];

type listType = typeof list
export const DeviceList = () => {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [currentTableData, setCurrentTableData] = useState<listType>([])
    const pageSize = useMemo(() => 10, [])

    const devices = useCallback(() => {
        return list.map((item) => (
            <Box extraClass={cls.deviceBox}>
                <div className={cls.deviceBox__content}>
                    <div className={cls.deviceBox__content__imgBox} >
                        <img className={cls.deviceBox__content__imgBox__img} src={item.user.img} alt=""/>
                    </div>
                    <h1 className={cls.deviceBox__content__text}>
                        <img src={deviceIcon} alt=""/>
                        {item.user.name}</h1>
                </div>
            </Box>
        ))
    }, [currentTableData])


    return (
        <>
            {devices()}
            {/*<Pagination*/}
            {/*    users={list}*/}
            {/*    onPageChange={page => {*/}
            {/*        setCurrentPage(page)*/}
            {/*    }}*/}
            {/*    currentPage={currentPage}*/}
            {/*    pageSize={pageSize}*/}
            {/*    setCurrentTableData={setCurrentTableData}*/}
            {/*/>*/}
        </>
    );
};
