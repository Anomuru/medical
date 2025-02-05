import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useForm} from "react-hook-form";

import {Button} from "shared/ui/button";
import {Form} from "shared/ui/form";
import {Input} from "shared/ui/input";
import {Radio} from "shared/ui/radio";


import cls from "./hospitalRegPage.module.sass";
import {API_URL, headers, useHttp} from "shared/api/base";
import {Packets} from "features/pakets";
import {IAnalysisPackage} from "entities/analysis/model/types/analysisPackageScheme";
import {useDispatch, useSelector} from "react-redux";
import {fetchJobsData, getJobsData} from "entities/oftenUsed";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {Select} from "shared/ui/select";
import {analysisPackageReducer, analysisReducer, IAnalysis} from "entities/analysis";
import {
    DynamicModuleLoader,
    ReducersList
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {packetsActions, packetsReducer} from "../../../entities/pakets/model/paketsSlice";
import {getPacketsData, IPackets} from "entities/pakets";


interface IHospitalRegPageData {

}

interface IProgress {
    name: string,
    status: boolean,

}

const reducers: ReducersList = {
    packetsSlice: packetsReducer,
    analysisSlice: analysisReducer,
    analysisPackageSlice: analysisPackageReducer
}

export const HospitalRegPage = () => {

    const packetsData = useSelector(getPacketsData)
    const {
        addAnalysis,
        addPacket
    } = packetsActions

    const [errorUserName, setErrorUserName] = useState<boolean>(false)
    const [pakets, setPakets] = useState<IPackets[]>([])

    const jobs = useSelector(getJobsData)
    const [doctors, setDoctors] = useState([])
    const [analysis, setAnalysis] = useState<IAnalysis[]>([])

    const [job, setJob] = useState()
    const [doctor, setDoctor] = useState()


    const [packs, setPacks] = useState([])
    const [customPack, setCustomPack] = useState([])


    const list = useMemo(() => [
        {
            isInput: true,
            name: "username",
            label: "Username",
        },
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
            name: "pasport_number",
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
        {
            name: "password",
            label: "Password",
            isInput: true,
            type: "password"
        },

    ], [jobs, doctors])

    const {
        register,
        handleSubmit,
        setValue,
        reset
    } = useForm<IHospitalRegPageData>()
    const {request} = useHttp()

    const dispatch = useAppDispatch()


    useEffect(() => {
        setProgress(list.map(item => {
            let arr
            if (item.isDouble) {
                item.items.map(inner => ({name: inner.name, status: false}))
                return {name: item.name, status: false}
            } else return {name: item.name, status: false}
        }))
    }, [list])

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
        dispatch(fetchJobsData())
    }, [])



    useEffect(() => {
        if (job)
            request({
                url: `job_info/job_get/doctor_list/?job_id=${job}`,
                method: "GET",
                // headers: headers()
            })
                .then(res => {
                    setDoctors(res.results)
                })
    }, [job])

    useEffect(() => {
        if (job)
            request({
                url: `analysis/analysis/get/list/`,
                method: "GET",
                // headers: headers()
            })
                .then(res => {
                    setAnalysis(res.results)
                })
    }, [job])


    const [selectedRadio, setSelectedRadio] = useState<string>("")
    const [progress, setProgress] = useState<IProgress[]>([])


    const onProgress = (data: { name: string, value: string }) => {
        setProgress(
            prev =>
                prev.map(item => item.name === data.name ? {name: item.name, status: true} : item)
        )
    }

    const renderInput = useCallback(() => {
        return list.map(item => {


            console.log(item)
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
                        type={item.type}
                        placeholder={item.label}
                        name={item.name}
                        register={register}
                        onChange={(value) => onProgress({name: item.name, value})}
                        required={item.isRequired !== undefined ? item.isRequired : true}
                    />
                )
            }
        })
    }, [list, selectedRadio])


    console.log(list)
    function combineArraysInOneArray<T>(arrays: T[][]): T[] {
        return arrays.reduce((acc, arr) => acc.concat(arr), []);
    }



    const onSubmit = (data: IHospitalRegPageData) => {
        if (packetsData?.length) {
            const analysisData: number[][]  =
                packetsData.map(item => item.analysis.map(id => id.id))


            const analysis = combineArraysInOneArray(analysisData );
            const timeString = localStorage.getItem("time");
            const date = JSON.parse(localStorage.getItem("date_calendar") as string);

            const time: { start: string; end: string } = timeString ? JSON.parse(timeString) : { start: '', end: '' };


            console.log(analysis, "analysis")

            const res = {
                ...data,
                sex: selectedRadio,
                branch: 1,
                from_date: time.start,
                to_date: time.end,
                doctor_id: doctor,
                date,
                analysis
            }

            console.log(res)

            request({
                url: "user/users/crud/create/",
                method: "POST",
                body: JSON.stringify(res),
                headers: headers()
            })
                .then(res => {
                    console.log(res)
                    setErrorUserName(false)
                    // list.map(item => {
                    //     if (item.isDouble) {
                    //
                    //     } else {
                    //         setValue(item.name, "")
                    //     }
                    // })
                    reset()
                })
                .catch(err => {
                    console.log(err)
                    setErrorUserName(true)
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
        // setAnalysis(prev => prev.filter(item => item.id !== data.id))
    }


    console.log(packetsData)


    return (
        <DynamicModuleLoader reducers={reducers}>
            <div className={cls.wrapper}>
                <div className={cls.hospital}>
                    {/*<div className={cls.hospital__progress}>*/}
                    {/*    <div style={{width: `${calc}%`}} className={cls.info}/>*/}
                    {/*</div>*/}
                    <Form id={"regForm"} onSubmit={handleSubmit(onSubmit)} extraClass={cls.registerForm}>
                        <div className={cls.registerForm__form}>
                            <div className={cls.info}>
                                {/*<div className={cls.info__percent}>*/}
                                {/*    <h2 className={cls.text}>Patient Information</h2>*/}
                                {/*    <p className={cls.percent}>{calc}%</p>*/}
                                {/*</div>*/}
                                <h1 className={cls.info__title}>Hospital Registration Form</h1>
                                <h2 className={cls.info__text}>Lorem Ipsum has been the industry's standard dummy.</h2>
                            </div>
                        </div>
                        <div className={cls.content}>
                            <h2> {errorUserName ? "Username already exist" : null}</h2>
                            {renderInput()}
                            <Select selectOption={job} setSelectOption={setJob} title={"Jobs"} optionsData={jobs}/>
                            <Select selectOption={doctor} setSelectOption={setDoctor} title={"Doctor"}
                                    optionsData={doctors}/>
                        </div>
                    </Form>

                    <div className={cls.analizForm}>

                        <div className={cls.header}>
                            <h1>Analiz form</h1>
                            <Input name={"search"} placeholder={"Search"}/>
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
                                    {
                                        analysis.map(item => {
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


                                </div>
                            </div>
                        </div>

                    </div>


                    <div className={cls.list}>
                        <h1>Ro'yxat</h1>
                        <div className={cls.list__container}>
                            {
                                packetsData?.map(item => {
                                    return (
                                        <Packets item={item}/>

                                    )
                                })
                            }
                            {/*<Pakets/>*/}
                        </div>
                    </div>
                    <Button id={"regForm"} extraClass={cls.hospital__btn}>Add</Button>

                </div>
            </div>
        </DynamicModuleLoader>
    );
}





