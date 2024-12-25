import React, {useCallback, useMemo, useState} from 'react';
import cls from "./deviceProfile.module.sass";
import {Box} from "shared/ui/box";
import deviceImg from "shared/assets/images/device.png";
import deviceIcon from "shared/assets/icon/device.png";
import {Table} from "shared/ui/table";
import {Pagination} from "features/pagination";
import {Input} from "shared/ui/input";

const list = [
    {
        user: {
            name: "John",
            surname: "Smith",
            job: "Surgeon",
            image: ""
        },
        age: 33,
        phone: "+998 90 123-45-67"
    },
    {
        user: {
            name: "John",
            surname: "Smith",
            job: "Surgeon",
            image: ""
        },
        age: 33,
        phone: "+998 90 123-45-67"
    }, {
        user: {
            name: "John",
            surname: "Smith",
            job: "Surgeon",
            image: ""
        },
        age: 33,
        phone: "+998 90 123-45-67"
    }, {
        user: {
            name: "John",
            surname: "Smith",
            job: "Surgeon",
            image: ""
        },
        age: 33,
        phone: "+998 90 123-45-67"
    }, {
        user: {
            name: "John",
            surname: "Smith",
            job: "Surgeon",
            image: ""
        },
        age: 33,
        phone: "+998 90 123-45-67"
    }, {
        user: {
            name: "John",
            surname: "Smith",
            job: "Surgeon",
            image: ""
        },
        age: 33,
        phone: "+998 90 123-45-67"
    }, {
        user: {
            name: "John",
            surname: "Smith",
            job: "Surgeon",
            image: ""
        },
        age: 33,
        phone: "+998 90 123-45-67"
    }, {
        user: {
            name: "John",
            surname: "Smith",
            job: "Surgeon",
            image: ""
        },
        age: 33,
        phone: "+998 90 123-45-67"
    }, {
        user: {
            name: "John",
            surname: "Smith",
            job: "Surgeon",
            image: ""
        },
        age: 33,
        phone: "+998 90 123-45-67"
    }, {
        user: {
            name: "John",
            surname: "Smith",
            job: "Surgeon",
            image: ""
        },
        age: 33,
        phone: "+998 90 123-45-67"
    }, {
        user: {
            name: "Joooohn",
            surname: "Smith",
            job: "Surgeon",
            image: ""
        },
        age: 33,
        phone: "+998 90 123-45-67"
    },
]

type listType = typeof list

export const DeviceProfile = () => {

    const [currentPage, setCurrentPage] = useState<number>(1)
    const [currentTableData, setCurrentTableData] = useState<listType>([])
    const pageSize = useMemo(() => 10, [])

    const renderPatientsData = useCallback(() => {
        return list.map((item, index) => (
            <tr>
                <td>{index + 1}</td>
                <td>
                    <div className={cls.profile}>
                        <img className={cls.profile__img} src={item.user.image} alt=""/>
                        <div className={cls.profile__info}>
                            <p className={cls.profile__title}>
                                {item.user.name} {item.user.surname}
                            </p>
                        </div>
                    </div>
                </td>
            </tr>
        ))
    }, [currentTableData])




    return (
        <div className={cls.profileContainer}>
            <div className={cls.profileContainer__leftSight}>
                <Box extraClass={cls.profileContainer__leftSight__deviceBox}>
                    <div className={cls.profileContainer__leftSight__deviceBox__content}>
                        <div className={cls.profileContainer__leftSight__deviceBox__content__imgBox} >
                            <img className={cls.profileContainer__leftSight__deviceBox__content__imgBox__img} src={deviceImg} alt=""/>
                        </div>
                        <h1 className={cls.profileContainer__leftSight__deviceBox__content__text}>
                            <img src={deviceIcon} alt=""/>
                            Ventilator</h1>
                    </div>
                </Box>
                <h1 className={cls.profileContainer__leftSight__content}>Patients</h1>
                <div className={cls.profileContainer__leftSight__arounder}>
                    <Table>
                        <thead className={cls.profileContainer__leftSight__arounder__head}>
                        <tr>
                            <th>Number</th>
                            <th>Name/Surname</th>
                        </tr>
                        </thead>
                        <tbody>
                        {renderPatientsData()}
                        </tbody>
                    </Table>
                </div>

                <Pagination
                    users={list}
                    onPageChange={page => {
                        setCurrentPage(page)
                    }}
                    currentPage={currentPage}
                    pageSize={pageSize}
                    setCurrentTableData={setCurrentTableData}
                />
            </div>
            <Box extraClass={cls.profileContainer__rightContainer}>
                <h1 className={cls.profileContainer__rightContainer__content}>Analiz</h1>
                <h1 className={cls.profileContainer__rightContainer__content}>Standart</h1>
                <div className={cls.profileContainer__rightContainer__analizBox}>
                    <Input
                        extraClass={cls.profileContainer__rightContainer__analizBox__disabledInput}
                        name="oxygen"
                        placeholder="7.56-7.80"
                        title="Oksigen (O₂) miqdori"/>
                    <Input
                        extraClass={cls.profileContainer__rightContainer__analizBox__disabledInput}
                        name="heartCount"
                        placeholder="80-100 mmHg"
                        title="pH darajasi"/>
                    <Input
                        extraClass={cls.profileContainer__rightContainer__analizBox__disabledInput}
                        name="heartCount"
                        placeholder="80-100 mmHg"
                        title="Positive End-Expiratory Pressure"/>
                    <Input
                        extraClass={cls.profileContainer__rightContainer__analizBox__disabledInput}
                        name="heartCount"
                        placeholder="80-100 mmHg"
                        title="Tidal hajm (VT)"/>
                    <Input
                        extraClass={cls.profileContainer__rightContainer__analizBox__disabledInput}
                        name="heartCount"
                        placeholder="80-100 mmHg"
                        title="Karbondioksid (CO₂)"/>
                    <Input
                        extraClass={cls.profileContainer__rightContainer__analizBox__disabledInput}
                        name="heartCount"
                        placeholder="80-100 mmHg"
                        title="Nafas olish tezligi (RR)"/>
                </div>
                <div className={cls.profileContainer__rightContainer__nameBox}>
                    <h1 className={cls.profileContainer__rightContainer__nameBox__content}>
                        Javoblari
                    </h1>
                    <h1 className={cls.profileContainer__rightContainer__nameBox__content}>
                        John Smith
                    </h1>
                </div>
                <div className={cls.profileContainer__rightContainer__analizCurrentBox}>
                    <Input
                        extraClass={cls.profileContainer__rightContainer__analizCurrentBox__disabledInput}
                        name="oxygen"
                        placeholder="7.56-7.80"
                        title="Oksigen (O₂) miqdori"/>
                    <Input
                        extraClass={cls.profileContainer__rightContainer__analizCurrentBox__disabledInput}
                        name="heartCount"
                        placeholder="80-100 mmHg"
                        title="pH darajasi"/>
                    <Input
                        extraClass={cls.profileContainer__rightContainer__analizCurrentBox__disabledInput}
                        name="heartCount"
                        placeholder="80-100 mmHg"
                        title="Positive End-Expiratory Pressure"/>
                    <Input
                        extraClass={cls.profileContainer__rightContainer__analizCurrentBox__disabledInput}
                        name="heartCount"
                        placeholder="80-100 mmHg"
                        title="Tidal hajm (VT)"/>
                    <Input
                        extraClass={cls.profileContainer__rightContainer__analizBox__disabledInput}
                        name="heartCount"
                        placeholder="80-100 mmHg"
                        title="Karbondioksid (CO₂)"/>
                    <Input
                        extraClass={cls.profileContainer__rightContainer__analizCurrentBox__disabledInput}
                        name="heartCount"
                        placeholder="80-100 mmHg"
                        title="Nafas olish tezligi (RR)"/>
                </div>
            </Box>
        </div>
    );
};