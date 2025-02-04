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




const reducers: ReducersList = {
    paymentSlice: paymentReducer
}

export const PaymentPage = () => {

    const data = useSelector(getPaymentData)

    const dispatch = useAppDispatch()
    useEffect(() => {

        dispatch(fetchUserPaymentList())
    }, [])


    const [selectedRadio, setSelectedRadio] = useState<string>("")

    const renderData = () => {
        return data?.map(item => {
            return (
                <div className={cls.item}>
                    <span>{item.surname}</span>
                    <span>{item.name}</span>
                    <span>{item.user_id}</span>
                    <span>{item.phone_number}</span>
                </div>
            )
        })
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
                        <Input name={"search"} placeholder={"search"}/>
                    </div>

                    <div className={cls.container}>

                        {renderData()}
                            </div>
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

