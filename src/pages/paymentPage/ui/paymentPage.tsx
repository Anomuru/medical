import React, {FC, useCallback, useEffect, useState} from 'react';


import cls from "./paymentPage.module.sass"
import {Input} from "shared/ui/input";
import {Radio} from "shared/ui/radio";
import {Button} from "shared/ui/button";
import {
    DynamicModuleLoader,
    ReducersList
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {paymentReducer} from "entities/payment/model/slice/paymentSlice";
import {useSelector} from "react-redux";
import {getPaymentData, getPaymentTypeData} from "entities/payment/model/selector/paymentSelector";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {
    fetchUserPaymentList,
    givePaymentThunk,
    paymentTypeThunk, userPaymentData, userPaymentThunk
} from "entities/payment/model/thunk/paymentThunk";

import {userAnalysisActions, userAnalysisReducer} from "entities/analysis";
import {fetchBranchData, getSelectedBranchData, oftenUsedReducer} from "entities/oftenUsed";
import {getSelectedLocationData} from "entities/oftenUsed/model/selector/oftenUsedSelector";
import {Form} from "shared/ui/form";
import {SubmitHandler, useForm} from "react-hook-form";
import classNames from "classnames";
import {givePaymentReducer} from "entities/payment/model/slice/givePaymentSlice";
import {paymentTypeReducer} from "entities/payment/model/slice/paymentTypeSlice";
import {Table} from "shared/ui/table";
import {Pagination} from "features/pagination";
import {getUserPaymentData, getUserPaymentList} from "entities/payment/model/selector/userPaymentSelector";
import {userPaymentReducer} from "entities/payment/model/slice/userPaymentSlice";
import {
    fetchPacketsAnalysis,
    getPaymentPacketsData,
    paymentPacketsReducer,
    PaymentPackets
} from "features/paymentPakets";
import {itemsEqual} from "@dnd-kit/sortable/dist/utilities";

interface IPaymentData {
    payment_type: string,
    user: number,
}

const reducers: ReducersList = {
    userAnalysisSlice: userAnalysisReducer,
    paymentSlice: paymentReducer,
    givePaymentSlice: givePaymentReducer,
    paymentTypeSlice: paymentTypeReducer,
    userPaymentSlice: userPaymentReducer,
    paymentPacketsSlice: paymentPacketsReducer
}

export const PaymentPage = () => {

    const {
        deletePacketAnalysis,
        deletePacket,
        deleteAnalysis,
        deleteAllAnalysis
    } = userAnalysisActions

    const selectedLocation = useSelector(getSelectedLocationData)
    const selectedBranch = localStorage.getItem("branch")
    const [currentPage, setCurrentPage] = useState<number>(1);
    const {register, setValue, handleSubmit} = useForm<IPaymentData>()
    const data = useSelector(getPaymentData)
    const [userId, setUserId] = useState<number>()
    const [search, setSearch] = useState("")
    const analiz = useSelector(getPaymentPacketsData)
    const prices = analiz?.analysis_list?.map(item => item.price)
    const totalOther = prices?.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const payType = useSelector(getPaymentTypeData)
    const [activeSwitch, setActiveSwitch] = useState(true)
    const getPayment = useSelector(getUserPaymentData)
    const totalAnalis = analiz?.packet.map(item => item.total)
    const generalAmount = Number(totalAnalis) + Number(totalOther)
    const userTotalPayment = useSelector(getUserPaymentList)

    const dispatch = useAppDispatch()
    useEffect(() => {
        if (selectedLocation)
            dispatch(fetchBranchData({id: selectedLocation}))
    }, [selectedLocation])

    useEffect(() => {
        dispatch(paymentTypeThunk())
    }, [])

    useEffect(() => {
        dispatch(fetchUserPaymentList({selectedBranch: Number(selectedBranch), search}))
    }, [])


    useEffect(() => {
        if (userId) {
            dispatch(fetchPacketsAnalysis({userId}))
            dispatch(userPaymentThunk(userId))
        }
    }, [userId])

    useEffect(() => {
        dispatch(userPaymentData())
    }, [])

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


    const onClick: SubmitHandler<IPaymentData> = () => {
        if (analiz) {
            let packetSelected: number[] = []
            analiz.packet
                .map(item => item.analysis_list
                    .map(item => {
                        if (item.isChecked) {
                            packetSelected = [...packetSelected, item.id]
                        }
                    }))
            const data = {
                payment_type: selectedRadio,
                user: userId,
                branch: selectedBranch,
                analysis_list: [
                    ...packetSelected,
                    ...analiz.analysis_list
                        .filter(item => item.isChecked)
                        .map(item => item.id)
                ]
            }

            dispatch(givePaymentThunk(data))
        }
    }

    const ClassSwitch = ({isActive, onSwitch}: { isActive: boolean, onSwitch: (isActive: boolean) => void }) => {


        const handleSwitch = () => {

            onSwitch(!isActive);
        };

        return (
            <div className={cls.switch} onClick={handleSwitch}>
                <div className={`${cls.switch__left} ${!isActive ? cls.active : ""}`}>
                    {isActive ? <i style={{color: "#02B2B9FF"}} className="fa-solid fa-credit-card"></i> :
                        <i style={{color: "green"}} className="fa-solid fa-circle-check"></i>}
                </div>

            </div>
        );
    }


    const [selectedRadio, setSelectedRadio] = useState<string>("")

    const renderData = () => {
        const filteredData = data?.filter(item => item?.user_id?.toString().includes(search.toLowerCase()) || item?.surname?.toLowerCase().includes(search?.toLowerCase()));
        return filteredData?.map(item => {
            return (
                <tr onClick={() => setUserId(item.id)} key={item.user_id} className={classNames(cls.item, {
                    [cls.active]: userId === item.id
                })}>

                    <td>{item.surname}</td>
                    <td>{item.name}</td>
                    <td>{item.user_id}</td>
                    <td>{item.phone_number}</td>
                    {/*</div>*/}
                </tr>

            )
        });
    }
    const renderPayment = useCallback(() => {
        return getPayment?.map((item, index) => {
            return (
                <tr>
                    {
                        !item.deleted &&
                        <>
                            <td>{index + 1}</td>
                            <td>
                                <div className={cls.item}>
                                    <div className={cls.item__info}>
                                        <h3>{item.user}</h3>
                                        <p>{item.user}</p>
                                    </div>
                                </div>
                            </td>
                            <td>{item.date}</td>
                            <td>{item.payment_type?.payment_type}</td>
                        </>
                    }
                </tr>
            )
        })
    }, [getPayment])


    // const render = useCallback(() => {
    //     return userTotalPayment?.map((item, index) => {
    //         return (
    //
    //             <tr>
    //                 {
    //                     !item.deleted &&
    //                     <>
    //                         <td>{index + 1}</td>
    //                         <td
    //                             // onClick={() => navigate(`../staff/profile/${item.id}`)}
    //                         >
    //                             <div className={cls.item}>
    //                                 <div className={cls.item__info}>
    //                                     <h3>{item.user}</h3>
    //                                     <p>{item.user}</p>
    //                                 </div>
    //                             </div>
    //                         </td>
    //                         <td>{item.date}</td>
    //
    //                         <td>
    //                             <div onClick={() => {
    //                                 // setActiveEditItem(item)
    //                                 // setActiveEdit(true)
    //                             }} style={{background: "#edfaec"}} className={cls.check}>
    //                                 {item.payment_type?.payment_type}
    //                             </div>
    //                         </td>
    //                         <td>{item.amount}</td>
    //                         <td>
    //                             <div onClick={() => {
    //                                 // setActiveDeleteItem(item)
    //                                 // setActiveDelete(true)
    //                             }} style={{background: "#FAECEC"}} className={cls.check}>
    //                                 <i style={{color: "#FF0000"}} className="fas fa-times"/>
    //                             </div>
    //                         </td>
    //                     </>
    //                 }
    //
    //             </tr>
    //         )
    //     })
    // }, [userTotalPayment])

    return (
        <DynamicModuleLoader reducers={reducers}>
            <div className={cls.payment}>
                <div className={cls.header}>
                    <h2>Список пациентов</h2>
                    <Input
                        onChange={onChangeSearch}
                        name={"search"}
                        placeholder={"Поиск"}
                        value={search}/>
                </div>
                <div className={cls.patientsList}>
                    <ClassSwitch onSwitch={() => setActiveSwitch(!activeSwitch)} isActive={activeSwitch}/>

                    {activeSwitch ?
                        <>
                            <div className={cls.container}>
                                <Table>
                                    <thead>
                                    <tr>
                                        <th>Фамилия</th>
                                        <th>Имя</th>
                                        <th>ID пользователя</th>
                                        <th>Номер телефона</th>
                                    </tr>

                                    </thead>
                                    <tbody>
                                    {renderData()}
                                    </tbody>
                                </Table>

                            </div>
                            <Pagination
                                totalCount={6}
                                onPageChange={setCurrentPage}
                                currentPage={currentPage}
                                pageSize={10}
                            />
                        </>
                        :
                        <>
                            <div className={cls.container}>
                                <Table>
                                    <thead>
                                    <tr>
                                        <th>№</th>
                                        <th>Имя и фамилия</th>
                                        <th>Дата оплаты</th>
                                        <th>Оплата</th>
                                        <th>Тип оплаты</th>
                                        <th>Сумма</th>
                                        <th/>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {/*{render()}*/}

                                    </tbody>
                                </Table>
                            </div>
                        </>
                    }
                </div>

                <div className={cls.payment__list}>
                    <div className={cls.payment__list__header}>
                        <h1>Общая сумма:</h1>
                        <h1>{generalAmount}</h1>
                    </div>
                    <div className={cls.payment__list__section}>
                        {/*{analiz?.packet && analiz?.packet.length > 0 ? (*/}
                        {/*    analiz.packet.map(item => (*/}
                        {/*        <PaymentPackets*/}
                        {/*            item={item}*/}
                        {/*        />*/}
                        {/*    ))*/}
                        {/*) : null}*/}
                        {/*{analiz?.analysis_list && analiz.analysis_list.length > 0 ? (*/}
                        {/*    <UserAnalysis*/}
                        {/*        item={analiz.analysis_list}*/}
                        {/*        total={totalOther}*/}
                        {/*        onDeleteAnalysisId={onDeleteAnalysis}*/}
                        {/*        onDeleteAllAnalysis={onDeleteAllAnalysis}*/}
                        {/*    />*/}
                        {/*) : null}*/}
                        <PaymentPackets/>
                        {(!analiz?.packet || analiz.packet.length === 0) && (!analiz?.analysis_list || analiz.analysis_list.length === 0) && (
                            <h1 style={{
                                color: "#fff",
                                alignSelf: "center",
                                marginTop: "3rem",
                                textAlign: "center"
                            }}>Пожалуйста, выберите одного из пациентов 😊</h1>
                        )}
                    </div>
                </div>


                <Form extraClass={cls.cashier}>
                    <div className={cls.cashier__box}>
                        <h1>Кассир</h1>

                    </div>

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

                    <Button extraClass={cls.submit} onClick={handleSubmit(onClick)}>Добавлять</Button>


                </Form>


            </div>
        </DynamicModuleLoader>
    );
};

