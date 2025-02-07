import React, {FC, useEffect, useState} from 'react';


import cls from "./paymentPage.module.sass"
import {Input} from "shared/ui/input";
import {Radio} from "shared/ui/radio";
import {Button} from "shared/ui/button";
import {
    DynamicModuleLoader,
    ReducersList
} from "../../../shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {paymentReducer} from "../../../features/paymentFeature/model/paymentSlice";
import {useSelector} from "react-redux";
import {getPaymentData} from "../../../features/paymentFeature/model/paymentSelector";
import {useAppDispatch} from "../../../shared/lib/hooks/useAppDispatch/useAppDispatch";
import {fetchUserPaymentList} from "../../../features/paymentFeature/model/paymentThunk";
import {getBranch, getBranchThunk} from "../../../features/branch";
import {fetchUserAnalys} from "../../../entities/analysis/model/thunk/userAnalysisThunk";
import {branchReducers} from "../../../features/branch/model/slice/getBranchSlice";
import {Packets} from "../../../features/pakets";
import {userAnalysisActions, userAnalysisReducer} from "entities/analysis/model/slice/userAnalysisSlice";
import {getUserAnalysis} from "entities/analysis/model/selector/userAnalySelector";
import {UserPackets} from "features/pakets/ui/userPackets";
import {UserAnalysis} from "features/pakets/ui/userAnalysis";


const reducers: ReducersList = {
    userAnalysisSlice: userAnalysisReducer,
    paymentSlice: paymentReducer,
    branchSlice: branchReducers
}

export const PaymentPage = () => {

    const {
        deletePacketAnalysis,
        deletePacket,
        deleteAnalysis,
        deleteAllAnalysis
    } = userAnalysisActions

    const data = useSelector(getPaymentData)
    const [userId, setUserId] = useState<number>()
    const [search, setSearch] = useState("")
    const branch = useSelector(getBranch)
    const branchId = branch?.results?.[0]?.id;
    const analiz = useSelector(getUserAnalysis)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getBranchThunk())
    }, [])

    useEffect(() => {
        if (branchId)
            dispatch(fetchUserPaymentList({branchId, search}))
    }, [branchId])

    useEffect(() => {
        if (userId)
            dispatch(fetchUserAnalys({userId}))
    }, [userId])


    const onChangeSearch = (e: string) => {
        setSearch(e);
    }

    const onDeletePacketAnalysis = (id: number, packetId: number) => {
        dispatch(deletePacketAnalysis({packetId: packetId, analysisId: id}))
    }

    const onDeletePacket = (id: number) => {
        dispatch(deletePacket(id))
    }

    const onDeleteAnalysis = (id: number) => {
        dispatch(deleteAnalysis(id))
    }

    const onDeleteAllAnalysis = () => {
        dispatch(deleteAllAnalysis())
    }

    //@ts-ignore
    // const onClickGetId = (e) => {
    //     setUserId(e)
    // }


    const [selectedRadio, setSelectedRadio] = useState<string>("")

    const renderData = () => {
        const filteredData = data?.filter(item => item?.surname?.toLowerCase().includes(search?.toLowerCase()));
        return filteredData?.map(item => {
            return (
                <div onClick={() => setUserId(item.id)} key={item.user_id} className={cls.item}>
                    <span>{item.surname}</span>
                    <span>{item.name}</span>
                    <span>{item.user_id}</span>
                    <span>{item.phone_number}</span>
                </div>
            )
        });
    }

    const list = {
        name: "unknown",
        value: [{label: "Cash", id: "cash"}, {label: "Click", id: "click"}, {label: "Bank", id: "bank"}],
        isRadio: true,
    }

    return (
        <DynamicModuleLoader reducers={reducers}>
            <div className={cls.payment}>
                <div className={cls.patientsList}>
                    <div className={cls.header}>
                        <h2>Patients list</h2>
                        <Input
                            onChange={onChangeSearch}
                            name={"search"}
                            placeholder={"search"}
                            value={search}/>
                    </div>

                    <div className={cls.container}>

                        {renderData()}
                    </div>
                </div>

                <div className={cls.payment__list}>
                    {
                        analiz?.packet.map(item => {
                            return (
                                <UserPackets
                                    // @ts-ignore
                                    item={item}
                                    onDeletePacketAnalysis={onDeletePacketAnalysis}
                                    onDeletePacketId={onDeletePacket}
                                />
                            )
                        })
                    }
                    {analiz?.analysis_list.length ? <UserAnalysis
                        // @ts-ignore
                        item={analiz?.analysis_list}
                        onDeleteAnalysisId={onDeleteAnalysis}
                        onDeleteAllAnalysis={onDeleteAllAnalysis}
                    /> : null}
                </div>


                <div className={cls.cashier}>
                    <h1>Kassir</h1>
                    <Input name={"id"} title={"Hisob raqami (ID)"}/>
                    <div className={cls.types}>
                        {
                            list.value.map(item => {
                                return (
                                    <Radio
                                        name={list.name}
                                        // @ts-ignore
                                        value={item.id}
                                        // @ts-ignore
                                        onChange={setSelectedRadio}
                                        checked={item.id === selectedRadio}
                                    >
                                        {item.label}
                                    </Radio>
                                )
                            })
                        }

                    </div>

                    <Button extraClass={cls.submit}>Add</Button>


                </div>


            </div>
        </DynamicModuleLoader>
    );
};

