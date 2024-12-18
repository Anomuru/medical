import React, {useCallback, useMemo, useState} from 'react';

import {Button} from "shared/ui/button";
import {Form} from "shared/ui/form";
import {Input} from "shared/ui/input";
import {Radio} from "shared/ui/radio";

import cls from "./hospitalRegPage.module.sass";


export const HospitalRegPage = () => {

    const list = useMemo(() => [
        {
            name: "name_surname",
            isInput: true,
            isDouble: true,
            items: [
                {
                    name: "name",
                    label: "Name",
                }, {
                    name: "surname",
                    label: "Surname",
                },
            ]
        },
        {
            isInput: true,
            name: "pasport_seria",
            label: "Pasport Seria (AB or AD)",
        },{
            isInput: true,
            name: "pasport_number",
            label: "Password Seria (Number)",
        },{
            name: "birth_date__phone",
            isInput: true,
            isDouble: true,
            items: [
                {
                    type: "date",
                    name: "birth_date",
                    label: "Birth Date",
                }, {
                    name: "phone",
                    label: "Phone",
                },
            ]
        },{
            isInput: true,
            name: "email",
            label: "Email Adress",
        },{
            name: "unknown",
            value: [{label: "Man", id: 1}, {label: "Woman", id: 2}],
            isRadio: true,
        },{
            name: "password",
            label: "Password",
            isInput: true,
            type: "password"
        },
    ], [])

    const [selectedRadio, setSelectedRadio] = useState<number>(NaN)

    const renderInput = useCallback(() => {
        return list.map(item => {
            if (item.isDouble) {
                return (
                    <div className={cls.double}>
                        {
                            item.items.map(inner => {
                                return (
                                    <Input
                                        extraLabelClass={cls.double__input}
                                        type={inner.type}
                                        placeholder={inner.label}
                                        name={inner.name}
                                    />
                                )
                            })
                        }
                    </div>
                )
            } else {
                if (item.isRadio) {
                    return (
                        <div className={cls.radios}>
                            {
                                item.value.map(inner => {
                                    return (
                                        <Radio
                                            name={"1_1"}
                                            value={inner.id}
                                            onChange={setSelectedRadio}
                                        >
                                            {inner.label}
                                        </Radio>
                                    )
                                })
                            }
                        </div>
                    )
                } else return (
                    <Input
                        type={item.type}
                        placeholder={item.label}
                        name={item.name}
                    />
                )
            }
        })
    }, [list])

    return (
        <div className={cls.wrapper}>
            <div className={cls.hospital}>
                <div className={cls.hospital__progress}>
                    <div className={cls.info}/>
                </div>
                <Form extraClass={cls.hospital__wrapper}>
                    <div className={cls.hospital__from}>
                        <div className={cls.info}>
                            <div className={cls.info__percent}>
                                <h2 className={cls.text}>Patient Information</h2>
                                <p className={cls.percent}>45%</p>
                            </div>
                            <h1 className={cls.info__title}>Hospital Registration Form</h1>
                            <h2 className={cls.info__text}>Lorem Ipsum has been the industry's standard dummy.</h2>
                        </div>
                    </div>
                    <div className={cls.content}>
                        {renderInput()}
                    </div>
                    <Button extraClass={cls.hospital__btn}>Add</Button>
                </Form>
            </div>
        </div>
    );
}
