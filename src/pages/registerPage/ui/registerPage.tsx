import {useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";

import {
    fetchBranchData,
    fetchJobsData,
    fetchLocationData,
    getBranchesData,
    getJobsData,
    getLocationsData
} from "entities/oftenUsed";
import {Button} from "shared/ui/button";
import {Input, ErrorType} from "shared/ui/input";
import {Radio} from "shared/ui/radio";
import {MultiSelect, Select} from "shared/ui/select";
import {Form} from "shared/ui/form";
import {headers, useHttp} from "shared/api/base";

import cls from "./registerPage.module.sass";
import image from "shared/assets/images/registerImage.png";
import {useAppDispatch} from "../../../shared/lib/hooks/useAppDispatch/useAppDispatch";
import {
    DynamicModuleLoader,
    ReducersList
} from "../../../shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {getSelectedLocationData} from "entities/oftenUsed/model/selector/oftenUsedSelector";
import {alertAction} from "features/alert/model/slice/alertSlice";
import {useNavigate} from "react-router";
import {getUserBranch} from "entities/user";

interface Branch {
    id: number,
    name: string,
    starts: string,
    ends: string,
    phone_number: string,
    ip_address: string,
    main: boolean,
    location: string

}

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

interface IBranchResponse {
    count: number;
    next?: string;
    previous?: string;
    results?: Branch[];
}


interface IOptionsJobs {
    value: number,
    label: string
}



export const RegisterPage = () => {

    const dispatch = useAppDispatch()
    const {request} = useHttp()

    useEffect(() => {
        dispatch(fetchJobsData())
    }, [])



    const jobsList = useSelector(getJobsData)
    const branch = useSelector(getBranchesData)
    const [selectedJob, setSelectedJob] = useState<IOptionsJobs[]>([])
    const [selectedBranch, setSelectedBranch] = useState<number | null >()
    const getSelectedJob = useCallback((data: any) => setSelectedJob(data), [])
    const navigate = useNavigate()

    const userBranch = useSelector(getUserBranch)


    useEffect(() => {
        setSelectedBranch(userBranch)
    },[userBranch])




    const registerStaff = useMemo(() => [
        {
            name: "username",
            label: "Имя пользователя",
            isInput: true,
        }, {
            name: "name",
            label: "Имя",
            isInput: true,
        }, {
            name: "surname",
            label: "Фамилия",
            isInput: true,
        }, {
            name: "address",
            label: "Адрес",
            isInput: true,
        },
        {
            name: "job",
            label: "Работа",
            isMultiSelect: true,
            onSelect: getSelectedJob,
            list: jobsList?.map(item => ({label: item.name, value: item.id}))
        },
        {
            name: "passport_series",
            label: "Серия паспорта (A B)",
            isInput: true,
        },
        {
            name: "passport_number",
            label: "Пароль серийный номер",
            isInput: true,
        },
        {
            name: "birth_date",
            label: "Дата рождения",
            isInput: true,
            type: "date"
        },
        {
            name: "phone_number",
            label: "Номер телефона",
            isInput: true,
        },
        {
            name: "email",
            label: "Адрес электронной почты",
            isInput: true,
        },
        {
            name: "unknown",
            label: [{label: "Мужчина", id: 1}, {label: "Женщина", id: 2}],
            isRadio: true,
        },
        {
            name: "password",
            label: "Пароль",
            isInput: true,
            type: "password"
        },
    ], [branch, jobsList])

    const {
        register,
        handleSubmit,
        reset
    } = useForm<ISubmitData>()
    const [selectedRadio, setSelectedRadio] = useState<number>()
    const [isCheckUsername, setIsCheckUsername] = useState<ErrorType>()

    const getSelectedRadio = useCallback((data: number) => setSelectedRadio(data), [])

    const render = useCallback(() => {
        return registerStaff.map(item => {
            if (item.isInput) {
                return (
                    <Input
                        register={register}
                        placeholder={item.label}
                        type={item.type}
                        name={item.name}
                        onChange={item.name === "username" ? onCheckUsername : undefined}
                        error={item.name === "username" ? isCheckUsername : undefined}
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
                                        onChange={getSelectedRadio}
                                        checked={inner.id === selectedRadio}
                                    >
                                        {inner.label}
                                    </Radio>
                                )
                            })
                        }
                    </div>
                )
            } else if (item.isMultiSelect) {
                return (
                    <MultiSelect
                        options={item.list}
                        onChange={item.onSelect}
                    />
                )
            }
        })
    }, [jobsList, register, registerStaff, selectedRadio, isCheckUsername])


    const onSubmit = (data: ISubmitData) => {
        console.log(selectedRadio,selectedJob,selectedBranch)
        if (selectedRadio && selectedJob && selectedBranch ) {
            const res = {
                ...data,
                sex: selectedRadio,
                jobs: selectedJob.map(item => {
                    return {label: item.label, id: item.value}
                }),
                branch: selectedBranch
            }

            request({
                url: "user/staff/crud/create/",
                method: "POST",
                body: JSON.stringify(res),
                headers: headers()
            })
                .then(res => {
                    console.log(res)
                    navigate(-1)
                    setSelectedRadio(NaN)
                    setSelectedJob([])
                    reset()
                    dispatch(alertAction.onAddAlertOptions({
                        type: "success",
                        status: true,
                        msg: "Успешно зарегистрирован"
                    }))
                })
                .catch(err => console.log(err))
        }
    }

    const onCheckUsername = (data: string) => {
        console.log(data, "data")
        request({
            url: "user/username-check/",
            method: "POST",
            body: JSON.stringify({username: data})
        })
            .then(res => {
                console.log(res)
                setIsCheckUsername(res)
            })
            .catch(err => console.log(err))
    }


    return (
        <div className={cls.registerPage}>
            <Form onSubmit={handleSubmit(onSubmit)} extraClass={cls.registerPage__form}>
                <h1>Регистрация персонала</h1>
                <div className={cls.container}>
                    {render()}
                </div>
                <Button extraClass={cls.registerPage__btn}>Зарегистрироваться</Button>
            </Form>
            <div className={cls.registerPage__image}>
                <img src={image} alt=""/>
            </div>
        </div>
    );
}
