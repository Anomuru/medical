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
    import {fetchUserAnalys} from "../../../entities/analysis/model/thunk/userAnalysisThunk";
    import {Packets} from "../../../features/pakets";
    import {userAnalysisActions, userAnalysisReducer} from "../../../entities/analysis/model/slice/userAnalysisSlice";
    import {getUserAnalysis} from "../../../entities/analysis/model/selector/userAnalySelector";
    import {UserPackets} from "../../../features/pakets/ui/userPackets";
    import {UserAnalysis} from "../../../features/pakets/ui/userAnalysis";
    import {fetchBranchData, getSelectedBranchData, oftenUsedReducer} from "../../../entities/oftenUsed";
    import {getSelectedLocationData} from "entities/oftenUsed/model/selector/oftenUsedSelector";
    import {Form} from "../../../shared/ui/form";
    import {SubmitHandler, useForm} from "react-hook-form";
    import classNames from "classnames";
    import {givePaymentReducer} from "../../../features/paymentFeature/model/givePaymentSlice";
    import {paymentTypeReducer} from "../../../features/paymentFeature/model/paymentTypeSlice";

    interface IPaymentData {
        date: string,
        payment_type: string,
        user: number,


    }

    const reducers: ReducersList = {
        userAnalysisSlice: userAnalysisReducer,
        paymentSlice: paymentReducer,
        givePaymentSlice: givePaymentReducer,
        paymentTypeSlice: paymentTypeReducer
    }

    export const PaymentPage = () => {

        const {
            deletePacketAnalysis,
            deletePacket,
            deleteAnalysis,
            deleteAllAnalysis
        } = userAnalysisActions

        const selectedLocation = useSelector(getSelectedLocationData)
        const selectedBranch = useSelector(getSelectedBranchData)

        const {register, setValue, handleSubmit} = useForm<IPaymentData>()
        const data = useSelector(getPaymentData)
        const [userId, setUserId] = useState<number>()
        const [search, setSearch] = useState("")
        const analiz = useSelector(getUserAnalysis)
        const prices = analiz?.analysis_list?.map(item => item.price)
        const totalOther = prices?.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        const payType = useSelector(getPaymentTypeData)
        const dispatch = useAppDispatch()
        useEffect(() => {
            if (selectedLocation)
                dispatch(fetchBranchData({id: selectedLocation}))
        }, [selectedLocation])

        useEffect(() => {
            dispatch(paymentTypeThunk())
        }, [])

        useEffect(() => {
            if (selectedBranch)

                dispatch(fetchUserPaymentList({selectedBranch, search}))
        }, [selectedBranch])



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
        console.log(payType, "dfrfr")

        const onClick: SubmitHandler<IPaymentData> = (completeData) => {
            const data = {
                ...completeData,
                payment_type: selectedRadio,
                user: userId,
                branch: selectedBranch
            }

            dispatch(givePaymentThunk(data))
        }



        const [selectedRadio, setSelectedRadio] = useState<string>("")

        const renderData = () => {
            const filteredData = data?.filter(item => item?.surname?.toLowerCase().includes(search?.toLowerCase()));
            return filteredData?.map(item => {
                return (
                    <div onClick={() => setUserId(item.id)} key={item.user_id} className={classNames(cls.item, {
                        [cls.active] : userId === item.id
                    })}>
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
                        {analiz?.packet && analiz?.packet.length > 0 ? (
                            analiz.packet.map(item => (
                                <UserPackets
                                    item={item}
                                    onDeletePacketAnalysis={onDeletePacketAnalysis}
                                    onDeletePacketId={onDeletePacket}
                                />
                            ))
                        ) : null}
                        {analiz?.analysis_list && analiz.analysis_list.length > 0 ? (
                            <UserAnalysis
                                item={analiz.analysis_list}
                                total={totalOther}
                                onDeleteAnalysisId={onDeleteAnalysis}
                                onDeleteAllAnalysis={onDeleteAllAnalysis}
                            />
                        ) : null}
                        {(!analiz?.packet || analiz.packet.length === 0) && (!analiz?.analysis_list || analiz.analysis_list.length === 0) && (
                            <h1 style={{color: "#fff", alignSelf: "center", marginTop: "3rem", textAlign: "center"}}>Iltimos bemorlardan birini tanlang 😊</h1>
                        )}
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
                                            value={item.id}
                                            onChange={setSelectedRadio}

                                            checked={item.id === Number(selectedRadio)}
                                        >
                                            {item.payment_type}
                                        </Radio>
                                    )
                                })
                            }

                        </div>

                        <Button extraClass={cls.submit} onClick={handleSubmit(onClick)}>Add</Button>

                    </Form>


                </div>
            </DynamicModuleLoader>
        );
    };

