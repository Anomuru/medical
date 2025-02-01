import cls from "./analysisAnalysisModal.module.sass";

import React, {useCallback, useEffect, useState} from "react";
import {Modal} from "../../../../shared/ui/modal";
import {Form} from "../../../../shared/ui/form";
import {Input} from "../../../../shared/ui/input";
import {analysisActions, AnalysisList, IAnalysis} from "../../../../entities/analysis";
import {Select} from "../../../../shared/ui/select";
import {Button} from "../../../../shared/ui/button";
import {useForm} from "react-hook-form";
import {useHttp} from "../../../../shared/api/base";
import {useDispatch} from "react-redux";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {analysisThunk} from "entities/analysis/model/thunk/analysisThunk";

interface IAddData {
    name: string,
    code_name: string
}

interface IAddModalProps {
    active: boolean,
    setActive: (arg: boolean) => void
}

interface IChangeModalProps {
    active: boolean,
    setActive: (arg: boolean) => void,
    data?: IAnalysis
}

export const AnalysisAnalysis = () => {
    const [active, setActive] = useState<boolean>(false)
    const [change, setChange] = useState(false)
    const [changedItem, setChangedItem] = useState()


    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(analysisThunk())
    },[])


    const getChangedItem = (data: any) => {
        setChangedItem(data)
        setChange(true)
    }

    return (
        <div className={cls.modal}>
            <div className={cls.modal__wrapper}>
                <div onClick={() => setActive(true)} className={cls.modal__add}>
                    <i className={"fas fa-plus"}/>
                </div>
            </div>
            <AnalysisList isChange={getChangedItem}/>

            <AnalysisAnalysisAddModal active={active} setActive={setActive}/>
            <AnalysisAnalysisChangeModal active={change} setActive={setChange} data={changedItem}/>
        </div>
    );
};

const AnalysisAnalysisAddModal = ({active, setActive}: IAddModalProps) => {

    const {request} = useHttp()
    const dispatch = useDispatch()
    const {createAnalysis} = analysisActions
    const {register, handleSubmit} = useForm<IAddData>()

    const [selectedGroup, setSelectedGroup] = useState(NaN)
    const [selectedPackage, setSelectedPackage] = useState(NaN)
    const [selectedDevice, setSelectedDevice] = useState(NaN)
    const [selectedContainer, setSelectedContainer] = useState(NaN)

    const getGroupId = useCallback((id: number) => setSelectedGroup(id), [])
    const getPackageId = useCallback((id: number) => setSelectedPackage(id), [])
    const getDeviceId = useCallback((id: number) => setSelectedDevice(id), [])
    const getContainerId = useCallback((id: number) => setSelectedContainer(id), [])

    const onSubmit = (data: IAddData) => {
        const res = {
            ...data,
            group_id: selectedGroup,
            package_id: selectedPackage,
            device_id: selectedDevice,
            container_id: selectedContainer
        }
        request({url: "", body: JSON.stringify(res), method: "POST"})
            .then(res => {
                console.log(res)
                dispatch(createAnalysis(res))
            })
            .catch(err => console.log(err))
    }

    return (
        <Modal title={"Add"} active={active} setActive={setActive}>
            <Form onSubmit={handleSubmit(onSubmit)} extraClass={cls.modal__form}>
                <Input
                    required
                    register={register}
                    placeholder={"Name"}
                    name={"name"}
                />
                <Input
                    required
                    register={register}
                    placeholder={"Kod nomi"}
                    name={"cod_name"}
                />
                <Select title={"Group"} setSelectOption={getGroupId} optionsData={[]}/>
                <Select title={"Paket"} setSelectOption={getPackageId} optionsData={[]}/>
                <Select title={"Device"} setSelectOption={getDeviceId} optionsData={[]}/>
                <Select title={"Container"} setSelectOption={getContainerId} optionsData={[]}/>
                <Button>Add</Button>
            </Form>
        </Modal>
    )
}

const AnalysisAnalysisChangeModal = ({active, setActive, data}: IChangeModalProps) => {

    console.log(data, "data2")

    const {request} = useHttp()
    // const dispatch = useDispatch()
    // const {createAnalysis} = analysisActions
    const {register, handleSubmit} = useForm<IAddData>()

    const onSubmit = (data: IAddData) => {
        const res = {
            ...data,
            group_id: selectedGroup,
            package_id: selectedPackage,
            device_id: selectedDevice,
            container_id: selectedContainer
        }
        console.log(res)
        // request({url: "", body: JSON.stringify(res), method: "PATCH"})
        //     .then(res => {
        //         console.log(res)
        //     })
        //     .catch(err => console.log(err))
    }

    const [selectedGroup, setSelectedGroup] = useState(NaN)
    const [selectedPackage, setSelectedPackage] = useState(NaN)
    const [selectedDevice, setSelectedDevice] = useState(NaN)
    const [selectedContainer, setSelectedContainer] = useState(NaN)

    const getGroupId = useCallback((id: number) => setSelectedGroup(id ?? data?.group), [data?.group])
    const getPackageId = useCallback((id: number) => setSelectedPackage(id ?? data?.package), [data?.package])
    const getDeviceId = useCallback((id: number) => setSelectedDevice(id ?? data?.device), [data?.device])
    const getContainerId = useCallback((id: number) => setSelectedContainer(id ?? data?.container), [data?.container])

    return (
        <Modal title={"Change"} active={active} setActive={setActive}>
            <Form onSubmit={handleSubmit(onSubmit)} extraClass={cls.modal__form}>
                <Input
                    required
                    register={register}
                    placeholder={"Name"}
                    name={"name"}
                    // rules={{value: data?.name}}
                    value={data?.name}
                />
                <Input
                    required
                    register={register}
                    placeholder={"Kod nomi"}
                    name={"cod_name"}
                    value={data?.code_name}
                    // rules={{value: data?.code_name}}
                />
                <Select
                    selectOption={data?.group}
                    title={"Group"}
                    setSelectOption={getGroupId}
                    optionsData={[{name: "Group tr"}, {name: "Group gh"}, {name: "Group asd"},]}
                />
                <Select
                    selectOption={data?.package}
                    title={"Paket"}
                    setSelectOption={getPackageId}
                    optionsData={[{name: "Group Name"}, {name: "КОАГУЛОЛОГИЯ"}, {name: "Britsh"},]}
                />
                <Select
                    selectOption={data?.device}
                    title={"Device"}
                    setSelectOption={getDeviceId}
                    optionsData={[{name: "Group Name"}, {name: "КОАГУЛОЛОГИЯ"}, {name: "Device nomi"},]}
                />
                <Select
                    selectOption={data?.container}
                    title={"Container"}
                    setSelectOption={getContainerId}
                    optionsData={[{name: "Container nomi"}, {name: "КОАГУЛОЛОГИЯ"}, {name: "Device nomi"},]}
                />
                <Button>Add</Button>
            </Form>
        </Modal>
    )
}