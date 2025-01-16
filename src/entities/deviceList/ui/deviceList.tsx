// import React, {useCallback, useEffect, useMemo, useState} from 'react';
// import cls from "./deviceList.module.sass"
// import {Box} from "shared/ui/box";
// import deviceImg from "shared/assets/images/device.png"
// import deviceIcon from "shared/assets/icon/device.png"
// import {Pagination} from "features/pagination";
// import {useDispatch, useSelector} from "react-redux";
// import {deviceListThunk} from "../model/thunk/deviceListThunk";
// import {getDeviceList} from "entities/deviceList/model/selector/deviceListSelector";
//
// interface IList {
//     id: number,
//     name: string,
//     img?: string
// }
//
// interface IDeviceList {
//     count: number,
//     next?: string,
//     previous?: string,
//     results?: IList[]
// }
//
// export const DeviceList = () => {
//     const getData: any = useSelector(getDeviceList);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [currentTableData, setCurrentTableData] = useState([]);
//     const pageSize = useMemo(() =>14, []);
//
//     const dispatch: any = useDispatch();
//
//     console.log(currentPage)
//
//     useEffect(() => {
//         dispatch(deviceListThunk(currentPage));
//     }, []);
//
//     console.log(getData, 'wdewdww')
//     const devices = useCallback(() => {
//         return currentTableData?.map((item: any, index) => (
//             <Box extraClass={cls.deviceBox} key={index}>
//                 <div className={cls.deviceBox__content}>
//                     <div className={cls.deviceBox__content__imgBox}>
//                         <img className={cls.deviceBox__content__imgBox__img} src={item.img || `${deviceImg}`} alt=""/>
//                     </div>
//                     <h1 className={cls.deviceBox__content__text}>
//                         <img src={deviceIcon} alt=""/>
//                         {item.name}
//                     </h1>
//                 </div>
//             </Box>
//         ));
//     }, [currentTableData]);
//
//     return (
//         <div className={cls.arounderBox}>
//             <div className={cls.listBox}>
//                 {devices()}
//             </div>
//
//             <div className={cls.paginationBox}>
//
//             <Pagination
//                 users={getData.results}
//                 onPageChange={(page) => {
//                     setCurrentPage(page);
//                 }}
//                 currentPage={currentPage}
//                 pageSize={pageSize}
//                 setCurrentTableData={setCurrentTableData}
//             />
//
//             </div>
//         </div>
//     );
// };
//
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
    const dispatch = useDispatch();
    // @ts-ignore
    const getData = useSelector(getDeviceList) as IDeviceListResponse;
    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageSize = useMemo(() => 50, []);
    const navigate = useNavigate()

    useEffect(() => {
        // @ts-ignore
        dispatch(deviceListThunk(currentPage));
    }, [currentPage, dispatch]);


            // useEffect(() => {
            //     //@ts-ignore
            //     dispatch(deviceProfileThunk())
            // }, [])
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
