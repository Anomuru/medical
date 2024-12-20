import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useForm} from "react-hook-form";

import {Button} from "shared/ui/button";
import {Input} from "shared/ui/input";
import {Radio} from "shared/ui/radio";
import {Select} from "shared/ui/select";
import {Form} from "shared/ui/form";
import {API_URL, useHttp} from "shared/api/api";

import cls from "./registerPage.module.sass";
import image from "shared/assets/images/registerImage.png";

interface ISubmitData {
    name: string,
    surname: string,
    job: number | string,
    pasport_seria: string,
    pasport_number: string,
    birth_date: string,
    phone: string,
    unknown: number,
    password: string
}

export const RegisterPage = () => {

    const registerStaff = useMemo(() => [
        {
            name: "name",
            label: "Name",
            isInput: true,
        }, {
            name: "surname",
            label: "Surname",
            isInput: true,
        }, {
            name: "job",
            label: "Job",
            isSelect: true,
        }, {
            name: "pasport_seria",
            label: "Pasport seria (A B)",
            isInput: true,
        }, {
            name: "pasport_number",
            label: "Password seria number",
            isInput: true,
        }, {
            name: "birth_date",
            label: "Birthday date",
            isInput: true,
            type: "date"
        }, {
            name: "phone",
            label: "Phone number",
            isInput: true,
        }, {
            name: "email",
            label: "Email adress",
            isInput: true,
        }, {
            name: "unknown",
            label: [{label: "Man", id: 1}, {label: "Woman", id: 2}],
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
        handleSubmit
    } = useForm<ISubmitData>()
    const {request} = useHttp()
    const [selectedRadio, setSelectedRadio] = useState<number>()
    const [selectedSelect, setSelectedSelect] = useState<string>()
    // const [error, setError] = useState<boolean>(false)
    //
    // useEffect(() => {
    //     if (error) {
    //         alert("Radio tanlang")
    //         setError(false)
    //     }
    // }, [error])

    const render = useCallback(() => {
        return registerStaff.map(item => {
            if (item.isInput) {
                return (
                    <Input
                        // @ts-ignore
                        register={register}
                        placeholder={item.label}
                        type={item.type}
                        name={item.name}
                        required
                    />
                )
            } else if (item.isRadio) {
                return (
                    <div className={cls.registerPage__wrapper}>
                        {
                            item.label.map(inner => {
                                return (
                                    <Radio
                                        name={"radio"}
                                        value={inner.id}
                                        onChange={setSelectedRadio}
                                        checked={inner.id === selectedRadio}
                                        // required
                                    >
                                        {inner.label}
                                    </Radio>
                                )
                            })
                        }
                    </div>
                )
            } else if (item.isSelect) {
                return (
                    <Select
                        title={item.label}
                        setSelectOption={setSelectedSelect}
                        optionsData={[]}
                        // required
                    />
                )
            }
        })
    }, [register, registerStaff, selectedRadio])

    const onSubmit = (data: ISubmitData) => {
        if (selectedRadio) {
            const res = {
                ...data,
                selectedSelect,
                selectedRadio
            }
            request(`${API_URL}`, "POST", JSON.stringify(res))
                .then(res => console.log(res, "post res"))
                .catch(err => console.log(err))
        } else {}
            // setError(true)
    }

    return (
        <div className={cls.registerPage}>
            <Form onSubmit={handleSubmit(onSubmit)} extraClass={cls.registerPage__form}>
                <h1>Register Staff</h1>
                <div className={cls.container}>
                    {render()}
                </div>
                <Button extraClass={cls.registerPage__btn}>Register</Button>
            </Form>
            <div className={cls.registerPage__image}>
                <img src={image} alt=""/>
            </div>
        </div>
    );
}
