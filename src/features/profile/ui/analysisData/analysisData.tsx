import {UserPackets} from "../../../pakets/ui/userPackets";
import React, {FC, useEffect, useState} from "react";
import cls from "./profileAnalysis.module.sass"

import {useSelector} from "react-redux";

import {getProfileAnalysis} from "../../model/selector/profileAnalysisSelector";
import {useAppDispatch} from "../../../../shared/lib/hooks/useAppDispatch/useAppDispatch";
import {fetchProfileAnalysis} from "../../model/thunk/profileAnalysisThunk";
import {useParams} from "react-router";

import {UserAnalysis} from "../../../pakets/ui/userAnalysis";
import {profileAnalysisActions} from "../../model/slice/profileAnalysisSlice";
import {headers, useHttp} from "../../../../shared/api/base";
import {IAnalysis} from "../../../../entities/analysis";
import {Button} from "../../../../shared/ui/button";
import {IPackets, PacketsList} from "../../../../entities/pakets";
import {Packets} from "../../../pakets";


export const AnalysisData = () => {

    const profileData = useSelector(getProfileAnalysis)

    const dispatch = useAppDispatch()
    const {id} = useParams()






    const {request} = useHttp()

    useEffect(() => {
        if (id) {
            dispatch(fetchProfileAnalysis(id))
        }
    }, [id])




    const onDeletePacketAnalysis = (analysisID: number, packetId: number) => {


        dispatch(profileAnalysisActions.onDeletePacketAnalysis({packetId: packetId, analysisId: analysisID}))


    }


    const onDeleteAnalysis = (analysisID: number) => {
        request({url: `user/user_analysis_crud/delete/${analysisID}`, method: "DELETE", headers: headers()})
            .then(res => {
                dispatch(profileAnalysisActions.deleteAnalysis(analysisID))
            })
    }



    return (
        <div className={cls.wrapper}>
            <OldAnalysis/>


            {/*<div className={cls.paket}>*/}
            {/*    {*/}
            {/*        profileData?.packet.map(item => {*/}
            {/*            return (*/}
            {/*                <UserPackets*/}
            {/*                    // @ts-ignore*/}
            {/*                    item={item}*/}
            {/*                    onDeletePacketAnalysis={onDeletePacketAnalysis}*/}
            {/*                    // onDeletePacketId={onDeletePacket}*/}
            {/*                />*/}
            {/*            )*/}
            {/*        })*/}
            {/*    }*/}
            {/*</div>*/}

            {/*<div className={cls.analysis}>*/}

            {/*    <UserAnalysis*/}
            {/*        // @ts-ignore*/}
            {/*        item={profileData?.analysis_list}*/}
            {/*        onDeleteAnalysisId={onDeleteAnalysis}*/}
            {/*        // onDeleteAllAnalysis={onDeleteAllAnalysis}*/}
            {/*    />*/}

            {/*</div>*/}

        </div>


    );
};

const OldAnalysis  = () => {
    const [pakets, setPakets] = useState<IPackets[]>([])
    const [analysis, setAnalysis] = useState<IAnalysis[]>([])
    const [selectedItems, setSelectedItems] = useState<IAnalysis[]>([]);
    const [selectedItemId, setSelectedItemId] = useState<number[]>([]);
    const [selectedPacketItems, setSelectedPacketItems] = useState<IPackets[]>([]);
    const [selectedPacketItemsId, setSelectedPacketItemsId] = useState<[]>([]);
    const {id} = useParams()

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
            body: JSON.stringify({analysis_list: selectedItemId, user: Number(id)}),
            headers: headers(),
        })
            .then(res => {
                console.log("fdsf")
            })
            .catch(err => {
                console.log("re")
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
        // @ts-ignore
        setSelectedPacketItemsId(prev => {
            // @ts-ignore
            return [...prev , item.analysis]
        })


    };
    console.log(selectedPacketItemsId, "selectedPacketItemsId")
    const onClickPacket = (id: number) => {
        setSelectedPacketItems(prev => {
            return prev.filter(item => item.id !== id)
        })
    }

    return(
        <>

            <div className={cls.wrapper__analysis}>

                <div className={cls.oldAnalysis__basic}>
                    <div className={cls.collection}>
                        <h1>Paket</h1>
                        <div className={cls.container}>
                            {
                                pakets.map(item => {
                                    return (
                                        <div onClick={() => handleSelect(item)} className={cls.item} >
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
                            {
                                pakets.map(item => {
                                    return (
                                        <div onClick={() => handleSelect(item)} className={cls.item} >
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

                    <div className={cls.oldAnalysis__main}>
                        {
                            selectedPacketItems?.map(item => {
                                return (
                                    <div className={cls.oldAnalysis__main_packetList}>
                                        <PacketsList onDeleteAnalysis={() => console.log("sfsd")} onDeletePacket={onClickPacket} item={item}/>
                                    </div>

                                )
                            })
                        }
                    </div>


                </div>

                <div className={cls.oldAnalysis__basic}>
                    <div className={cls.collection}>
                        <h1>Analiz</h1>
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

                    <div className={cls.oldAnalysis__main}>
                        {selectedItems.map(item => (
                            <div className={cls.oldAnalysis__main_list}>
                                <div className={cls.oldAnalysis__main_list_name}>
                                    Nomi : <span>{item.name}</span>
                                </div>
                                <div className={cls.oldAnalysis__main_list_price}>
                                    Narxi : <span>{item.price}</span>
                                    <i onClick={() => handleRemove(item)} className={"fa fa-minus"}/>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>


            <Button onClick={onPostSelectedAnalysis} extraClass={cls.button}>Add</Button>
        </>

    )
}