import {UserPackets} from "../../../pakets/ui/userPackets";
import React, {FC, useEffect, useState} from "react";
import cls from "./profileAnalysis.module.sass"

import {useSelector} from "react-redux";

import {getProfileAnalysis} from "../../model/selector/profileSelector";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {fetchProfileAnalysis} from "../../model/thunk/profileThunk"
import {useParams} from "react-router";

import {UserAnalysis} from "../../../pakets/ui/userAnalysis";
import {profileAnalysisActions} from "../../model/slice/profileSlice";
import {headers, useHttp} from "shared/api/base";
import {IAnalysis} from "entities/analysis";
import {Button} from "shared/ui/button";
import {IPackets, PacketsList} from "entities/pakets";
import {Packets} from "../../../pakets";
import {Alert} from "entities/alert/ui/alert";
import {alertAction} from "entities/alert/model/slice/alertSlice";
import {IAnalysisProps, IUserPackets} from "../../../../entities/pakets/model/paketsSchema";


export const AnalysisData = () => {


    const [activeSwitch, setActiveSwitch] = useState(true)
    const dispatch = useAppDispatch()
    const {id} = useParams()


    useEffect(() => {
        if (id) {
            dispatch(fetchProfileAnalysis(id))
        }
    }, [id, activeSwitch])


    return (
        <div className={cls.wrapper}>

            <ClassSwitch onSwitch={() => setActiveSwitch(!activeSwitch)} isActive={activeSwitch}/>

            {!activeSwitch ?
                <OldAnalysis setActiveSwitch={setActiveSwitch}/> :
                <ProfileUserAnalysis/>
            }
        </div>


    );
};


const ClassSwitch = ({isActive, onSwitch}: { isActive: boolean, onSwitch: (isActive: boolean) => void }) => {


    const handleSwitch = () => {

        onSwitch(!isActive);
    };

    return (
        <div className={cls.switch} onClick={handleSwitch}>
            <div className={`${cls.switch__left} ${!isActive ? cls.active : ""}`}>
                {isActive ? <i className="fa-solid fa-vial-circle-check"></i> : <i className="fa-solid fa-vial"></i>}
                {/*    <div className={cls.switch__wrapper_left}>*/}

                {/*        User Analysis*/}

                {/*    </div>*/}
                {/*    <div className={cls.switch__wrapper_right}>*/}
                {/*        Add Analysis*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>

        </div>
    );
}


const OldAnalysis = ({setActiveSwitch}: { setActiveSwitch: (isActive: boolean) => void }) => {
    const [pakets, setPakets] = useState<IPackets[]>([])
    const [analysis, setAnalysis] = useState<IAnalysis[]>([])
    const [selectedItems, setSelectedItems] = useState<IAnalysis[]>([]);
    const [selectedItemId, setSelectedItemId] = useState<number[]>([]);
    const [selectedPacketItems, setSelectedPacketItems] = useState<IPackets[]>([]);
    const [selectedPacketItemsId, setSelectedPacketItemsId] = useState<number[]>([]);
    const {id} = useParams()

    const dispatch = useAppDispatch()
    const {request} = useHttp()

    useEffect(() => {
        request({
            url: "analysis/paket/get/list/",
            method: "GET",
            // headers: headers()
        })
            .then(res => {
                setPakets(res.results.map((item: { total_price: number; }) => ({
                    ...item,
                    price: item.total_price
                })))
            })
    }, [])

    useEffect(() => {

        request({
            url: `analysis/analysis/get/list/`,
            method: "GET",
            // headers: headers()
        })
            .then(res => {
                setAnalysis(res.results)
            })
    }, [])


    const onPostSelectedAnalysis = () => {
        request({
            url: `user/user_analysis_crud/create/`,
            method: "POST",
            body: JSON.stringify({
                user: Number(id),
                analysis_list: selectedItemId,
                packet_list: selectedPacketItemsId,

            }),
            headers: headers(),
        })
            .then(res => {
                dispatch(alertAction.onAddAlertOptions({
                    type: "success",
                    status: true,
                    msg: "Успешно создано"
                }))
                setActiveSwitch(true)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleRemove = (item: IAnalysis) => {
        setSelectedItems(prev => prev.filter(i => i !== item));
        setSelectedItemId(prev => prev.filter(i => i !== item.id));
    };

    const handleAddItem = (item: IAnalysis) => {
        setSelectedItems(prev => {
            return [...prev, item];
        });
        setSelectedItemId(prev => [...prev, item.id]);
    }


    const handleSelect = (item: IPackets) => {

        setSelectedPacketItems(prev => {
            return [...prev, item]
        })


        setSelectedPacketItemsId(prev => [
            ...prev,
            ...item.analysis.map(analysisItem => analysisItem.id)
        ]);


    };


    const onClickPacket = (id: number) => {
        setSelectedPacketItems(prev => {
            return prev.filter(item => item.id !== id)
        })
        setSelectedPacketItemsId(prev => prev.filter(i => i !== id))
    }

    return (
        <>

            <div className={cls.wrapper__analysis}>

                <div className={cls.oldAnalysis__basic}>
                    <div className={cls.collection}>
                        <h1>Пакет</h1>
                        <div className={cls.container}>
                            {
                                pakets.map(item => {
                                    return (
                                        <div onClick={() => handleSelect(item)} className={cls.item}>
                                            <h2>
                                                {item.name}
                                            </h2>
                                            <div className={cls.icon}>
                                                <i className="fas fa-plus"></i>
                                            </div>
                                        </div>
                                    )
                                })
                            }


                        </div>
                    </div>

                    {selectedPacketItems.length ? <div className={cls.oldAnalysis__main}>
                        {
                            selectedPacketItems?.map(item => {
                                return (
                                    <div className={cls.oldAnalysis__main_packetList}>
                                        <PacketsList onDeleteAnalysis={() => console.log("sfsd")}
                                                     onDeletePacket={onClickPacket} item={item}/>
                                    </div>

                                )
                            })
                        }
                    </div> : null
                    }

                </div>

                <div className={cls.oldAnalysis__basic}>
                    <div className={cls.collection}>
                        <h1>Анализ</h1>
                        <div className={cls.container}>
                            {
                                analysis.map(item => {
                                    return (
                                        <div onClick={() => handleAddItem(item)} className={cls.item}>
                                            <h2>
                                                {item.name}
                                            </h2>
                                            <div

                                                className={cls.icon}
                                            >
                                                <i className="fas fa-plus"></i>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    {selectedItems.length ? <div className={cls.oldAnalysis__main}>
                        {selectedItems.map(item => (
                            <div className={cls.oldAnalysis__main_list}>
                                <div className={cls.oldAnalysis__main_list_name}>
                                    Название : <span>{item.name}</span>
                                </div>
                                <div className={cls.oldAnalysis__main_list_price}>
                                    Цена : <span>{item.price}</span>
                                    <i onClick={() => handleRemove(item)} className={"fa fa-minus"}/>
                                </div>
                            </div>
                        ))}
                    </div> : null}

                </div>
            </div>


            <Button onClick={onPostSelectedAnalysis} extraClass={cls.button}>Добавлять</Button>
        </>

    )
}


interface IProfileDataProps {packet: IUserPackets[], analysis_list:IAnalysisProps[]}

const ProfileUserAnalysis = () => {
    const profileData = useSelector(getProfileAnalysis) as IProfileDataProps

    const dispatch = useAppDispatch()
    const {request} = useHttp()

    const {id} = useParams()
    const onDeletePacketAnalysis = (analysisID: number, packetId: number) => {

        dispatch(profileAnalysisActions.onDeletePacketAnalysis({packetId: packetId, analysisId: analysisID}))
    }
    const onDeletePacket = (packet_id: number) => {

        request({
            url: `user/user_analysis_crud/delete/`,
            method: "DELETE",
            body: JSON.stringify({packet_id: packet_id, type: "packet", user: Number(id)}),
            headers: headers()
        })
            .then(res => {
                dispatch(profileAnalysisActions.deletePacket(packet_id))
                dispatch(alertAction.onAddAlertOptions({
                    type: "success",
                    status: true,
                    msg: "Успешно удалено"
                }))

            })
        // request({url: `user/user_packet_crud/delete/${id}`, method: "DELETE", headers: headers()})
        //     .then(res => {
        //     })
    }


    const onDeleteAnalysis = (analysisID: number) => {
        request({
            url: `user/user_analysis_crud/delete/`,
            method: "DELETE",
            body: JSON.stringify({analysis_id: analysisID, type: "analysis", user: Number(id)}),
            headers: headers()
        })
            .then(res => {
                dispatch(profileAnalysisActions.deleteAnalysis(analysisID))
                dispatch(alertAction.onAddAlertOptions({
                    type: "success",
                    status: true,
                    msg: "Успешно удалено"
                }))
            })
    }

    const totalPrice = profileData?.analysis_list.reduce((sum, item) => sum + item.price, 0);
    return (
        <>
            <div className={cls.paket}>
                {profileData?.packet.length ?
                    profileData?.packet.map(item => {
                        return (
                            <UserPackets
                                item={item}
                                onDeletePacketAnalysis={onDeletePacketAnalysis}
                                onDeletePacketId={onDeletePacket}
                            />
                        )
                    }) : <h2>Пакетов пока нет</h2>
                }
            </div>

            <div className={cls.analysis}>

                <UserAnalysis

                    total={totalPrice}
                    item={profileData?.analysis_list}
                    onDeleteAnalysisId={onDeleteAnalysis}
                    // onDeleteAllAnalysis={onDeleteAllAnalysis}
                />

            </div>
        </>
    )
}