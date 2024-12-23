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
        console.log("useEffect")
        // @ts-ignore
        dispatch(fetchJobsData())
        // request({url: "job_info/job_get/job_list/", headers: header()})
        //     .then(res => console.log(res))
        // request(`${API_URL_DOC}job_info/job_get/job_list/`)
        //     .then(res => console.log(res))
    }, [])

    const jobsList = useSelector(getJobsData)

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
            selectedRadio,
            selectedSelect
        }

        console.log(res, "res")
        
        // request({
        //     url: "",
        //     method: "POST",
        //     body: JSON.stringify(res),
        //     headers: headers()
        // })
        //     .then(res => {
        //         console.log(res)
        //     })
        //     .catch(err => console.log(err))
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
