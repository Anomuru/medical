import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useForm} from "react-hook-form";

import {Button} from "shared/ui/button";
import {Form} from "shared/ui/form";
import {Input} from "shared/ui/input";
import {Radio} from "shared/ui/radio";
import {API_URL, useHttp} from "shared/api/api";

import cls from "./hospitalRegPage.module.sass";

interface IHospitalRegPageData {

}

interface IProgress {
    name: string,
    status: boolean
}

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
        }, {
            isInput: true,
            name: "pasport_number",
            label: "Password Seria (Number)",
        }, {
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
        }, {
            isInput: true,
            name: "email",
            label: "Email Adress",
        }, {
            name: "unknown",
            value: [{label: "Man", id: 1}, {label: "Woman", id: 2}],
            isRadio: true,
        }, {
            name: "password",
            label: "Password",
            isInput: true,
            type: "password"
        },
    ], [])

    const {
        register,
        handleSubmit,
        setValue
    } = useForm<IHospitalRegPageData>()
    const {request} = useHttp()

    useEffect(() => {
        setProgress(list.map(item => {
            let arr
            if (item.isDouble) {
                item.items.map(inner => ({name: inner.name, status: false}))
                return {name: item.name, status: false}
            } else return {name: item.name, status: false}
        }))
    }, [list])

    const [selectedRadio, setSelectedRadio] = useState<number>(NaN)
    const [progress, setProgress] = useState<IProgress[]>([])

    const onProgress = (data: { name: string, value: string }) => {
        setProgress(
            prev =>
                prev.map(item => item.name === data.name ? {name: item.name, status: true} : item)
        )
    }

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
                                        onChange={(value) => onProgress({name: inner.name, value})}
                                        register={register}
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
                                            checked={inner.id === selectedRadio}
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
                        register={register}
                        onChange={(value) => onProgress({name: item.name, value})}
                    />
                )
            }
        })
    }, [list, selectedRadio])

    const calc = useMemo(() =>
        Math.floor((progress.filter(item => item.status).length / progress.length) * 100), [progress])

    console.log(calc, "calc")
    console.log(progress.filter(item => item.status).length, "calc")
    console.log(progress.length, "calc")

    const onSubmit = (data: IHospitalRegPageData) => {
        const res = {
            ...data,
            selectedRadio
        }
        console.log(res)
        request(`${API_URL}`, "POST", JSON.stringify(res))
            .then(res => {
                console.log(res)
                // list.map(item => {
                //     if (item.isDouble) {
                //
                //     } else {
                //         setValue(item.name, "")
                //     }
                // })
            })
            .catch(err => console.log(err))
    }

    return (
        <div className={cls.wrapper}>
            <div className={cls.hospital}>
                <div className={cls.hospital__progress}>
                    <div style={{width: `${calc}%`}} className={cls.info}/>
                </div>
                <Form onSubmit={handleSubmit(onSubmit)} extraClass={cls.hospital__wrapper}>
                    <div className={cls.hospital__from}>
                        <div className={cls.info}>
                            <div className={cls.info__percent}>
                                <h2 className={cls.text}>Patient Information</h2>
                                <p className={cls.percent}>{calc}%</p>
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
