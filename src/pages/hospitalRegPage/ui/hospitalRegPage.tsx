import React, {useCallback, useEffect, useState} from 'react';
import {useForm} from "react-hook-form";

import {Button} from "shared/ui/button";
import {Form} from "shared/ui/form";
import {Input} from "shared/ui/input";
import {Radio} from "shared/ui/radio";


import cls from "./hospitalRegPage.module.sass";
import {headers, useHttp} from "shared/api/base";
import {Packets} from "features/pakets";
import {useSelector} from "react-redux";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {Select} from "shared/ui/select";
import {analysisPackageReducer, analysisReducer, IAnalysis} from "entities/analysis";
import {
    DynamicModuleLoader,
    ReducersList
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {packetsActions, packetsReducer} from "entities/pakets";
import {getPacketsData, IPackets} from "entities/pakets";
import {paymentReducer} from "features/paymentFeature/model/paymentSlice";
import {getPaymentData} from "features/paymentFeature/model/paymentSelector";
import {fetchUserPaymentList} from "features/paymentFeature/model/paymentThunk";
import {getSelectedBranchData} from "entities/oftenUsed";
import {Table} from "shared/ui/table";
import classNames from "classnames";
import {getUserBranch} from "entities/user";
import {useNavigate} from "react-router";
import {alertAction} from "features/alert/model/slice/alertSlice";


interface IHospitalRegPageData {
    username: string;
    name: string;
    surname: string;
    address: string;
    passport_series: string;
    passport_number: string;
    birth_date: string;
    phone_number: string;
    email: string;
    password: string;
}

const reducers: ReducersList = {
    packetsSlice: packetsReducer,
    analysisSlice: analysisReducer,
    analysisPackageSlice: analysisPackageReducer,
    paymentSlice: paymentReducer
}

const types = [
    {
        id: "create",
        name: "Yangi"
    },
    {
        id: "change",
        name: "Eski"
    }
]

export const HospitalRegPage = () => {

    const data = useSelector(getPaymentData)
    const selectedBranch = useSelector(getUserBranch)
    const packetsData = useSelector(getPacketsData)
    const {
        addAnalysis,
        addPacket,
        addMultipleAnalysis,
        addPackets,
        clearAnalysis
    } = packetsActions
    const dispatch = useAppDispatch()

    const [errorUserName, setErrorUserName] = useState<boolean>(false)
    const [pakets, setPakets] = useState<IPackets[]>([])

    const [doctors, setDoctors] = useState([])
    const [analysis, setAnalysis] = useState<IAnalysis[]>([])

    const [doctor, setDoctor] = useState<string>()
    const [selectedRadio, setSelectedRadio] = useState<string>("")
    const [isChanging, setIsChanging] = useState(false)
    const [changingData, setChangingData] = useState<string>()
    const [isActiveType, setIsActiveType] = useState(types[0]?.id)
    const [userId, setUserId] = useState<number>()
    const [userSearch, setUserSearch] = useState("")
    const [analysisSearch, setAnalysisSearch] = useState("")


    const navigate = useNavigate()


    const {
        register,
        handleSubmit,
        setValue,
        watch,
        setError,
        reset
    } = useForm<IHospitalRegPageData>()
    const {request} = useHttp()




    const list = [
        // {
        //     isInput: true,
        //     name: "username",
        //     label: "Username",
        // },
        {
            name: "name_surname",
            isInput: true,
            isDouble: true,

            items: [
                {
                    name: "name",
                    label: "Name",
                },
                {
                    name: "surname",
                    label: "Surname",
                },
            ]
        },
        {
            isInput: true,
            name: "address",
            label: "Address",
        },
        {
            isInput: true,
            name: "passport_series",
            label: "Pasport Seria (AB or AD)",
        },
        {
            isInput: true,
            name: "passport_number",
            label: "Password Seria (Number)",
        },
        {
            name: "birth_date__phone",
            isInput: true,
            isDouble: true,
            items: [
                {
                    type: "date",
                    name: "birth_date",
                    label: "Birth Date",
                },
                {
                    name: "phone_number",
                    label: "Phone",
                },
            ]
        },
        {
            isInput: true,
            name: "email",
            label: "Email Adress",
            type: "email",
            isRequired: false
        },
        {
            name: "unknown",
            value: [{label: "Man", id: "man"}, {label: "Woman", id: "woman"}],
            isRadio: true,
        },
        // {
        //     name: "password",
        //     label: "Password",
        //     isInput: true,
        //     type: "password",
        //     default: "12345678"
        // },

    ]

    const username = watch("username");

    useEffect(() => {
        if (username ) {
            request({
                url: `user/users/get/check_username/?username=${username}&user_id=${changingData}`,
                method: "GET",
                // headers: headers()
            })
                .then(res => {
                    setErrorUserName(res.available)
                    setError("username", {type: "custom", message: "Username allaqachon belgilangan"})
                })
        }
    }, [username]);


    useEffect(() => {
        if (selectedBranch)
            dispatch(fetchUserPaymentList({selectedBranch, search: ""}))
    }, [selectedBranch])

    useEffect(() => {
        if (isActiveType === "create") {
            setUserId(undefined)
        }

    }, [isActiveType])


    useEffect(() => {


        const ids = JSON.parse(localStorage.getItem("timeTableIds") as any)
        const doctor_id = JSON.parse(localStorage.getItem("doctorIdTable") as string)
        if (ids?.patient) {
            request({
                url: `user/users/get/time_table_profile/${ids.patient}?request_id=${ids.requestId}`,
                method: "GET",
                // headers: headers()
            })
                .then(res => {
                    dispatch(addMultipleAnalysis({
                        analysis: res.analysis_list.individuals,
                        price: res.analysis_list.individual_total_price
                    }))
                    dispatch(addPackets(res.analysis_list.packets))
                    setValue("username", res.username);
                    setValue("name", res.name);
                    setValue("surname", res.surname);
                    setValue("address", res.address);
                    setValue("passport_series", res.passport_series);
                    setValue("passport_number", res.passport_number);
                    setValue("birth_date", res.birth_date);
                    setValue("phone_number", res.phone_number);
                    setValue("email", res.email);
                    setValue("password", "12345678");
                    setSelectedRadio(res.sex)
                    setIsChanging(true)
                    setChangingData(ids.patient)
                    setUserId(ids.requestId)

                })
        }
        setDoctor(doctor_id)
    }, [])


    useEffect(() => {
        request({
            url: "analysis/paket/get/list/",
            method: "GET",
            // headers: headers()
        })
            .then(res => {
                setPakets(res.results.map((item: { total_price: number; }) => ({
                    ...item,
                    price: item.total_price
                })))
            })
    }, [])


    useEffect(() => {
        request({
            url: `job_info/job_get/doctor_list/`,
            method: "GET",
            // headers: headers()
        })
            .then(res => {
                setDoctors(res.results)
            })
    }, [])
    console.log(doctors)

    useEffect(() => {
        request({
            url: `analysis/analysis/get/list/`,
            method: "GET",
            // headers: headers()
        })
            .then(res => {
                setAnalysis(res.results)
            })
    }, [])


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
                                        register={register}
                                        required
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
                                            name={"radio"}
                                            // @ts-ignore
                                            value={inner.id}
                                            // @ts-ignore
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
                        // value={item?.default}
                        type={item.type}
                        placeholder={item.label}
                        name={item.name}
                        register={register}
                        required={item.isRequired !== undefined ? item.isRequired : true}
                    />
                )
            }
        })
    }, [list, register, selectedRadio])


    function combineArraysInOneArray<T>(arrays: T[][]): T[] {
        return arrays.reduce((acc, arr) => acc.concat(arr), []);
    }

    const renderData = () => {
        const filteredData = data?.filter(item =>
            item?.surname?.toLowerCase().includes(userSearch?.toLowerCase()) ||
            item?.name?.toLowerCase().includes(userSearch?.toLowerCase())
        )
        return filteredData?.map(item => {
            return (
                <div
                    onClick={() => setUserId(item.id)}
                    key={item.user_id}
                    className={classNames(cls.item, {
                        [cls.active]: userId === item.id
                    })}
                >
                    <span>{item.surname}</span>
                    <span>{item.name}</span>
                    <span>{item.user_id}</span>
                    <span>{item.phone_number}</span>
                </div>
            )
        });
    }

    const renderAnalysis = () => {
        const filteredData = analysis?.filter(item =>
            item?.name?.toLowerCase().includes(analysisSearch?.toLowerCase())
        )
        return filteredData.map(item => {
            return (
                <div onClick={() => onAddNewAnalysis(item)} className={cls.item}>
                    <h2>
                        {item.name}
                    </h2>
                    <div

                        className={cls.icon}
                    >
                        <i className="fas fa-plus"></i>
                    </div>
                </div>
            )
        })
    }


    const onSubmit = (data: IHospitalRegPageData) => {
        if (packetsData?.length) {
            const analysisData: number[][] = packetsData.filter(item => !item.extra).map(item => item.analysis.map(id => id.id))


            const pakets = combineArraysInOneArray(analysisData);

            const analysis_list = [...packetsData.filter(item => item.extra).map(item => item.analysis.map(id => id.id))[0]]


            const timeString = localStorage.getItem("time");
            const date = JSON.parse(localStorage.getItem("date_calendar") as string);

            const time: { start: string; end: string } = timeString ? JSON.parse(timeString) : {start: '', end: ''};


            let res : object = {
                ...data,
                sex: selectedRadio,
                branch: selectedBranch,
                from_date: time.start,
                to_date: time.end,
                doctor_id: doctor,
                date,
                // analysis,
                analysis_list,
                packet_list: pakets
            }


            if (isChanging) {
                res = {...res, user_request_id: userId}
            }


            const changingUrl = `user/users/crud/update/${changingData}`
            const mainUrl = `user/users/crud/create/`

            request({
                url: isChanging ? changingUrl : mainUrl,
                method: isChanging ? "PUT" : "POST",
                body: JSON.stringify(res),
                headers: headers()
            })
                .then(res => {
                    setErrorUserName(false)
                    if (isChanging){
                        navigate(-1)
                        dispatch(alertAction.onAddAlertOptions({
                            type: "success",
                            status: true,
                            msg: "Запись успешно обновлена"

                        }))
                    }
                    reset()
                    localStorage.removeItem("timeTableIds")
                    localStorage.removeItem("time")
                    localStorage.removeItem("doctorIdTable")
                    localStorage.removeItem("date_calendar")
                    navigate("../table")
                    dispatch(alertAction.onAddAlertOptions({
                        type: "success",
                        status: true,
                        msg: "Muvaffaqiyatli qabul qilindi"
                    }))
                    // reset()
                })
                .catch(err => {
                    setErrorUserName(true)
                    if (errorUserName){
                        dispatch(alertAction.onAddAlertOptions({
                            type: "error",
                            status: true,
                            msg: "Foydalanuvchi mavjud"

                        }))
                    }
                })


            localStorage.removeItem("timeTableIds")

        }


    }
    const onSubmitOldUser = () => {
        if (packetsData?.length) {
            const analysisData: number[][] =
                packetsData.map(item => item.analysis.map(id => id.id))


            const analysis = combineArraysInOneArray(analysisData);
            const timeString = localStorage.getItem("time");
            const date = JSON.parse(localStorage.getItem("date_calendar") as string);

            const time: { start: string; end: string } = timeString ? JSON.parse(timeString) : {start: '', end: ''};


            const res = {
                branch: selectedBranch,
                from_date: time.start,
                to_date: time.end,
                doctor_id: doctor,
                date,
                analysis,
                id: userId
            }


            const mainUrl =  `user/users/crud/add_user_request/`

            request({
                url: mainUrl,
                method: "POST",
                body: JSON.stringify(res),
                headers: headers()
            })
                .then(res => {
                    dispatch(alertAction.onAddAlertOptions({
                        type: "success",
                        status: true,
                        msg: "Ma'lumotlar muvaffaqiyatli o'zgartirldi"
                    }))
                    navigate("../table")

                    // setErrorUserName(false)
                    // reset()
                })
                .catch(err => {
                    console.log(err)
                    // setErrorUserName(true)
                })
        }
    }

    const onAddedPaket = (id: number) => {


        const filtered = pakets.filter(state => state.id === id)[0]

        dispatch(addPacket(
            {
                id: filtered.id,
                name: filtered.name,
                analysis: filtered.analysis,
                price: filtered.price,
            }
        ))

    }

    const onAddNewAnalysis = (data: IAnalysis) => {
        dispatch(addAnalysis(data))
    }

    const onDelete = () => {
        request({
            url: `user_request/crud/delete_request_analysis/?user_request_id=${userId}`,
            method: "DELETE",
            headers: headers()
        })
            .then(res => {
                // setErrorUserName(false)
                dispatch(alertAction.onAddAlertOptions({
                    type: "success",
                    status: true,
                    msg: "Ma'lumot muvaffaqiyatli o'chirildi"

                }))
                navigate("../table")

            })
            .catch(err => {
                console.log(err)
                // setErrorUserName(true)
            })
    }


    return (
        <DynamicModuleLoader reducers={reducers}>
            <div className={cls.wrapper}>
                <div className={cls.hospital}>
                    {/*<div className={cls.hospital__progress}>*/}
                    {/*    <div style={{width: `${calc}%`}} className={cls.info}/>*/}
                    {/*</div>*/}
                    <div className={cls.hospital__switch}>
                        <div className={cls.hospital__switchHeader}>
                            {
                                !isChanging &&
                                <Select
                                    title={"Fo'ydalanuvchi turi"}
                                    extraClass={cls.select}
                                    optionsData={types}
                                    setSelectOption={setIsActiveType}
                                    selectOption={isActiveType}
                                />
                            }

                            {
                                isActiveType === "change" && <Input
                                    onChange={setUserSearch}
                                    name={"search"}
                                    placeholder={"Search"}
                                />
                            }
                        </div>
                        {
                            isActiveType === "create" ?
                                <Form id={"regForm"} onSubmit={handleSubmit(onSubmit)} extraClass={cls.registerForm}>
                                    <div className={cls.registerForm__form}>
                                        <div className={cls.info}>
                                            {
                                                isChanging ?
                                                    <h1 className={cls.info__title}>Changing Information</h1>
                                                    :
                                                    <h1 className={cls.info__title}>Hospital Registration Form</h1>
                                            }
                                        </div>
                                    </div>
                                    <div className={cls.content}>
                                        <h2 style={{color: !errorUserName ? "red" : "green"}}> {!errorUserName ? "Foydalanuvchi nomi mavjud" : "Foydalanuchi nomi bo'sh"}</h2>
                                        <Input name={"username"} register={register} canChange={false}/>
                                        {renderInput()}
                                        <Select selectOption={doctor} setSelectOption={setDoctor} title={"Doctor"}
                                                optionsData={doctors}/>
                                    </div>
                                </Form> :
                                <div className={cls.container}>

                                    {renderData()}
                                </div>
                        }
                    </div>

                    <div className={cls.analizForm}>

                        <div className={cls.header}>
                            <h1>Analiz form</h1>
                            <Input onChange={setAnalysisSearch} name={"search"} placeholder={"Search"}/>
                        </div>


                        <div className={cls.content}>
                            <div className={cls.collection}>
                                <h1>Paket</h1>
                                <div className={cls.container}>
                                    {
                                        pakets.map(item => {
                                            return (
                                                <div className={cls.item} onClick={() => onAddedPaket(item.id)}>
                                                    <h2>
                                                        {item.name}
                                                    </h2>
                                                    <div className={cls.icon}>
                                                        <i className="fas fa-plus"></i>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }

                                </div>
                            </div>
                            <div className={cls.collection}>
                                <h1>Analiz</h1>
                                <div className={cls.container}>
                                    {renderAnalysis()}
                                </div>
                            </div>
                        </div>

                    </div>


                    <div className={cls.list}>
                        <h1>Ro'yxat</h1>
                        <div className={cls.list__container}>
                            {
                                packetsData?.map((item, index) => {
                                    return (
                                        <Packets index={index} item={item}/>
                                    )
                                })
                            }
                            {/*<Pakets/>*/}
                        </div>
                    </div>

                    <div className={cls.buttons}>
                        {
                            isActiveType === "create" ?
                                <Button disabled={errorUserName === undefined && errorUserName === false} id={"regForm"}
                                        extraClass={cls.hospital__btn}>
                                    {isChanging ? "Change" : "Add"}
                                </Button>
                                :
                                <Button onClick={onSubmitOldUser} extraClass={cls.hospital__btn}>
                                    Add
                                </Button>
                        }
                        {
                            isChanging &&
                            <Button onClick={onDelete} type={"danger"} extraClass={cls.hospital__btn}>Delete</Button>

                        }
                    </div>
                </div>
            </div>
        </DynamicModuleLoader>
    );
}





