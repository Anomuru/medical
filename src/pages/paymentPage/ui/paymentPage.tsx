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
import {getPaymentData, getPaymentTypeData} from "../../../features/paymentFeature/model/paymentSelector";
import {useAppDispatch} from "../../../shared/lib/hooks/useAppDispatch/useAppDispatch";
import {
    fetchUserPaymentList,
    givePaymentThunk,
    paymentTypeThunk
} from "../../../features/paymentFeature/model/paymentThunk";
import {getBranch, getBranchThunk} from "../../../features/branch";
import {fetchUserAnalys} from "../../../entities/analysis/model/thunk/userAnalysisThunk";
import {branchReducers} from "../../../features/branch/model/slice/getBranchSlice";
import {Packets} from "../../../features/pakets";
import {userAnalysisActions, userAnalysisReducer} from "../../../entities/analysis/model/slice/userAnalysisSlice";
import {getUserAnalysis} from "../../../entities/analysis/model/selector/userAnalySelector";
import {UserPackets} from "../../../features/pakets/ui/userPackets";
import {UserAnalysis} from "../../../features/pakets/ui/userAnalysis";
import {paymentTypeReducer} from "../../../features/paymentFeature/model/paymentTypeSlice";
import {Form} from "../../../shared/ui/form";
import {givePaymentReducer} from "../../../features/paymentFeature/model/givePaymentSlice";
import {useForm} from "react-hook-form";

interface IPaymentData {
    date: string,
    payment_type: string,
    user: number,


}

const reducers: ReducersList = {
    userAnalysisSlice: userAnalysisReducer,
    paymentSlice: paymentReducer,
    branchSlice: branchReducers,
    paymentTypeSlice: paymentTypeReducer,
    givePaymentSlice: givePaymentReducer
}

export const PaymentPage = () => {

    const {
        deletePacketAnalysis,
        deletePacket,
        deleteAnalysis,
        deleteAllAnalysis
    } = userAnalysisActions

    const {register, setValue, handleSubmit} = useForm()

    const data = useSelector(getPaymentData)
    const [userId, setUserId] = useState<number>()
    const [search, setSearch] = useState("")
    const branch = useSelector(getBranch)
    const branchId = branch?.results?.[0]?.id;
    const analiz = useSelector(getUserAnalysis)
    //@ts-ignore
    const prices = analiz?.analysis_list?.map(item => item.price)
    const totalOther = prices?.reduce((accumulator, currentValue) => accumulator + currentValue, 0);


    const payType = useSelector(getPaymentTypeData)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getBranchThunk())
        dispatch(paymentTypeThunk())
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

    const onClick = (completeData: IPaymentData) => {
        const data = {
            ...completeData,
            payment_type: selectedRadio,
            user: userId,
        }
        //@ts-ignore
        dispatch(givePaymentThunk(data))
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
                        total={totalOther}
                        onDeleteAnalysisId={onDeleteAnalysis}
                        onDeleteAllAnalysis={onDeleteAllAnalysis}
                    /> : null}
                </div>


                <Form extraClass={cls.cashier}>
                    <h1>Kassir</h1>
                    <Input name={"date"} title={"Kun"} type={"date"} register={register}/>
                    <div className={cls.types}>
                        {
                            payType?.map(item => {
                                return (
                                    <Radio
                                        name={item.payment_type}
                                        // @ts-ignore
                                        value={item.id}
                                        // @ts-ignore
                                        onChange={setSelectedRadio}
                                        //@ts-ignore
                                        checked={item.id === selectedRadio}
                                    >
                                        {item.payment_type}
                                    </Radio>
                                )
                            })
                        }

                    </div>
                    {
                        //@ts-ignore
                        <Button extraClass={cls.submit} onClick={handleSubmit(onClick)}>Add</Button>
                    }



                </Form>


            </div>
        </DynamicModuleLoader>
    );
};

