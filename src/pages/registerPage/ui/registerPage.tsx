import {useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";

import {fetchJobsData, getJobsData} from "entities/oftenUsed";
import {Button} from "shared/ui/button";
import {Input} from "shared/ui/input";
import {Radio} from "shared/ui/radio";
import {Select} from "shared/ui/select";
import {Form} from "shared/ui/form";
import {API_URL, API_URL_DOC, header, headers, useHttp} from "shared/api/base";

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

    const dispatch = useDispatch()
    const {request} = useHttp()

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchJobsData())
    }, [])

    const jobsList = useSelector(getJobsData)

    const registerStaff = useMemo(() => [
        {
            name: "username",
            label: "Username",
            isInput: true,
        },{
            name: "name",
            label: "Name",
            isInput: true,
        }, {
            name: "surname",
            label: "Surname",
            isInput: true,
        },{
            name: "address",
            label: "Address",
            isInput: true,
        }, {
            name: "job",
            label: "Job",
            isSelect: true,
        }, {
            name: "passport_series",
            label: "Pasport seria (A B)",
            isInput: true,
        }, {
            name: "passport_number",
            label: "Password seria number",
            isInput: true,
        }, {
            name: "birth_date",
            label: "Birthday date",
            isInput: true,
            type: "date"
        }, {
            name: "phone_number",
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
    const [selectedRadio, setSelectedRadio] = useState<number>()
    const [selectedSelect, setSelectedSelect] = useState<string>()

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
                    />
                )
            } else if (item.isRadio) {
                return (
                    <div className={cls.registerPage__wrapper}>
                        {
                            item.label.map(inner => {
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
            } else if (item.isSelect) {
                return (
                    <Select
                        title={item.label}
                        setSelectOption={setSelectedSelect}
                        optionsData={jobsList}
                    />
                )
            }
        })
    }, [jobsList, register, registerStaff, selectedRadio])

    const onSubmit = (data: ISubmitData) => {
        const res = {
            ...data,
            sex: selectedRadio,
            job_id: selectedSelect,
            branch: 1
        }
        
        request({
            url: "user/staff/crud/create/",
            method: "POST",
            body: JSON.stringify(res),
            headers: headers()
        })
            .then(res => {
                console.log(res)
                setSelectedRadio(NaN)
                setSelectedSelect("")
            })
            .catch(err => console.log(err))
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
