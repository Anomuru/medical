import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cls from './deviceList.module.sass';
import { Box } from 'shared/ui/box';
import deviceImg from 'shared/assets/images/device.png';
import deviceIcon from 'shared/assets/icon/device.png'
import { Pagination } from 'features/pagination';
import { deviceListThunk } from '../model/thunk/deviceListThunk';
import { getDeviceList } from 'entities/deviceList/model/selector/deviceListSelector';
import {useNavigate} from "react-router";
import {deviceProfileThunk} from "entities/deviceProfile";
import {useAppDispatch} from "../../../shared/lib/hooks/useAppDispatch/useAppDispatch";

interface IList {
    id: number;
    name: string;
    img?: string;
}

interface IDeviceListResponse {
    count: number;
    next?: string;
    previous?: string;
    results?: IList[];
}

export const DeviceList: React.FC = () => {
    const dispatch = useAppDispatch();
    //ts-ignore
    const getData = useSelector(getDeviceList) as IDeviceListResponse;
    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageSize = useMemo(() => 50, []);
    const navigate = useNavigate()

    console.log(getData)
    useEffect(() => {
        dispatch(deviceListThunk(currentPage));
    }, [currentPage, dispatch]);



    const devices = useCallback(() => {
        return getData?.results?.map((item, index) => (
            <Box onClick={() => navigate(`deviceProfile/${item.id}`)} extraClass={cls.deviceBox} key={index}>
                <div className={cls.deviceBox__content}>
                    <div className={cls.deviceBox__content__imgBox}>
                        <img className={cls.deviceBox__content__imgBox__img} loading={"lazy"} src={item?.img || deviceImg} alt={item?.name} />
                    </div>
                    <h1 className={cls.deviceBox__content__text}>
                        <img src={deviceIcon} alt="" />
                        {item?.name}
                    </h1>
                </div>
            </Box>
        ));
    }, [getData?.results]);

    return (
        <div className={cls.arounderBox}>
            <div className={cls.listBox}>
                {devices()}
            </div>
            <Pagination
                totalCount={getData?.count}
                onPageChange={setCurrentPage}
                currentPage={currentPage}
                pageSize={pageSize}
            />
        </div>
    );
};
