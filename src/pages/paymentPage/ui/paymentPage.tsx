import React, {useMemo, useState} from 'react';


import cls from "./paymentPage.module.sass"
import {Input} from "shared/ui/input";
import {Radio} from "shared/ui/radio";
import {Button} from "shared/ui/button";


export const PaymentPage = () => {



    const [selectedRadio, setSelectedRadio] = useState<string>("")


    const list = {
            name: "unknown",
            value: [{label: "Cash", id: "cash"}, {label: "Click", id: "click"}, {label: "Bank", id: "bank"}],
            isRadio: true,
        }

    return (
        <div className={cls.payment}>

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

            <div className={cls.patientsList}>
                <div className={cls.header}>
                    <h2>Patients list</h2>


                    <Input name={"search"} placeholder={"search"}/>
                </div>

                <div className={cls.container}>
                    <div className={cls.item}>
                        <span>Fatxullayev</span>
                        <span>Ulug'bek</span>
                        <span>+998920003</span>
                    </div>
                    <div className={cls.item}>
                        <span>Fatxullayev</span>
                        <span>Ulug'bek</span>
                        <span>+998920003</span>
                    </div>
                    <div className={cls.item}>
                        <span>Fatxullayev</span>
                        <span>Ulug'bek</span>
                        <span>+998920003</span>
                    </div>
                    <div className={cls.item}>
                        <span>Fatxullayev</span>
                        <span>Ulug'bek</span>
                        <span>+998920003</span>
                    </div>
                </div>
            </div>




        </div>
    );
};

