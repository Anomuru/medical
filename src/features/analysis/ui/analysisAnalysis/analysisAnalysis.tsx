import cls from "./analysisAnalysisModal.module.sass";

import React, {useCallback, useEffect, useMemo, useState} from "react";
import {Modal} from "../../../../shared/ui/modal";
import {Form} from "../../../../shared/ui/form";
import {Input} from "../../../../shared/ui/input";
import {
    analysisActions,
    AnalysisList,
    fetchAnalysisGroupList,
    fetchAnalysisPackageList, getAnalysisData, getAnalysisPackage,
    IAnalysis
} from "../../../../entities/analysis";
import {Select} from "../../../../shared/ui/select";
import {Button} from "../../../../shared/ui/button";
import {useForm} from "react-hook-form";
import {useHttp} from "../../../../shared/api/base";
import {useDispatch, useSelector} from "react-redux";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {analysisThunk} from "entities/analysis/model/thunk/analysisThunk";
import {getAnalysisGroup} from "../../../../entities/analysis/model/selector/analysisGroupSelector";

import {analysisContainerThunk} from "../../../../entities/analysis/model/thunk/analysisContainerThunk";
import {getAnalysisContainer} from "../../../../entities/analysis/model/selector/analysisContainerSelector";
import {oftenUsedDeviceListThunk} from "../../../../entities/oftenUsed/model/thunk/ofternUsedDeviceList";
import {getOftenDevice} from "../../../../entities/oftenUsed/model/selector/oftenUsedDeviceSelector";
import {Pagination} from "../../../pagination";
import {getAnalysisCount} from "../../../../entities/analysis/model/selector/analysisSelector";

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
    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageSize = useMemo(() => 50, []);
    const count = useSelector(getAnalysisCount)





    const dispatch = useAppDispatch()



    useEffect(() => {

        dispatch(analysisThunk(currentPage))
    }, [currentPage])


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

            <Pagination
                // @ts-ignore
                totalCount={count}
                onPageChange={setCurrentPage}
                currentPage={currentPage}
                pageSize={pageSize}
            />

            <AnalysisAnalysisAddModal active={active} setActive={setActive}/>
            <AnalysisAnalysisChangeModal active={change} setActive={setChange} data={changedItem}/>
        </div>
    );
};


const AnalysisAnalysisAddModal = ({active, setActive}: IAddModalProps) => {

    const {request} = useHttp()
    const dispatch = useAppDispatch()

    const {register, handleSubmit} = useForm<IAddData>()

    const [selectedGroup, setSelectedGroup] = useState(NaN)
    const [selectedPackage, setSelectedPackage] = useState(NaN)
    const [selectedDevice, setSelectedDevice] = useState(NaN)
    const [selectedContainer, setSelectedContainer] = useState(NaN)

    const getGroupId = useCallback((id: number) => setSelectedGroup(id), [])
    const getPackageId = useCallback((id: number) => setSelectedPackage(id), [])
    const getDeviceId = useCallback((id: number) => setSelectedDevice(id), [])
    const getContainerId = useCallback((id: number) => setSelectedContainer(id), [])


    const groupAnalysisData = useSelector(getAnalysisGroup)
    const analysisPackageData = useSelector(getAnalysisPackage)
    const getData = useSelector(getOftenDevice)
    const analysisDate = useSelector(getAnalysisContainer)

    useEffect(() => {
        dispatch(fetchAnalysisGroupList())
        dispatch(fetchAnalysisPackageList())
        dispatch(analysisContainerThunk())
        dispatch(oftenUsedDeviceListThunk())
    }, [])


    const onSubmit = (data: IAddData) => {
        const res = {
            ...data,
            type: selectedGroup,
            packet: selectedPackage,
            device: selectedDevice,
            container: selectedContainer
        }
        request({url: "analysis/analysis/crud/create/", body: JSON.stringify(res), method: "POST"})
            .then(res => {
                console.log(res)
                setActive(false)
                dispatch(analysisActions.createAnalysis(res))
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
                    name={"code_name"}
                />
                <Input
                    required
                    register={register}
                    placeholder={"Narxi"}
                    name={"price"}
                />
                <Select title={"Group"} setSelectOption={getGroupId} optionsData={groupAnalysisData}/>
                <Select title={"Paket"} setSelectOption={getPackageId} optionsData={analysisPackageData}/>
                <Select title={"Device"} setSelectOption={getDeviceId} optionsData={getData?.results}/>
                <Select title={"Container"} setSelectOption={getContainerId} optionsData={analysisDate}/>
                <Button>Add</Button>
            </Form>
        </Modal>
    )
}

const AnalysisAnalysisChangeModal = ({active, setActive, data}: IChangeModalProps) => {


    const dispatch = useAppDispatch()

    const {request} = useHttp()
    // const dispatch = useDispatch()
    // const {createAnalysis} = analysisActions
    const {register, handleSubmit , setValue} = useForm<IAddData>()

    const onSubmit = (data: IAddData) => {
        const res = {
            ...data,
            type: selectedGroup,
            packet: selectedPackage,
            device: selectedDevice,
            container: selectedContainer
        }

        request({url: "", body: JSON.stringify(res), method: "PATCH"})
            .then(res => {
                console.log(res)
                dispatch(analysisActions.editAnalysis(res))
            })
            .catch(err => console.log(err))
    }

    const [selectedGroup, setSelectedGroup] = useState(NaN)
    const [selectedPackage, setSelectedPackage] = useState(NaN)
    const [selectedDevice, setSelectedDevice] = useState(NaN)
    const [selectedContainer, setSelectedContainer] = useState(NaN)

    const getGroupId = useCallback((id: number) => setSelectedGroup(id ?? data?.type), [data?.type])
    const getPackageId = useCallback((id: number) => setSelectedPackage(id ?? data?.packet), [data?.packet])
    const getDeviceId = useCallback((id: number) => setSelectedDevice(id ?? data?.device), [data?.device])
    const getContainerId = useCallback((id: number) => setSelectedContainer(id ?? data?.container), [data?.container])


    const groupAnalysisData = useSelector(getAnalysisGroup)
    const analysisPackageData = useSelector(getAnalysisPackage)
    const getData = useSelector(getOftenDevice)
    const analysisDate = useSelector(getAnalysisContainer)

    useEffect(() => {
        // @ts-ignore
        setValue("name" , data?.name)
        // @ts-ignore
        setValue("code_name" , data?.code_name)
    } , [data])


    return (
        <Modal title={"Change"} active={active} setActive={setActive}>
            <Form onSubmit={handleSubmit(onSubmit)} extraClass={cls.modal__form}>
                <Input
                    required
                    register={register}
                    placeholder={"Name"}
                    name={"name"}

                    // rules={{value: data?.name}}

                />
                <Input
                    required
                    register={register}
                    placeholder={"Kod nomi"}
                    name={"code_name"}


                    // rules={{value: data?.code_name}}
                />
                <Select
                    selectOption={data?.type}
                    title={"Group"}
                    setSelectOption={getGroupId}
                    optionsData={groupAnalysisData}
                />
                <Select
                    selectOption={data?.packet}
                    title={"Paket"}
                    setSelectOption={getPackageId}
                    optionsData={analysisPackageData}
                />
                <Select
                    selectOption={data?.device}
                    title={"Device"}
                    setSelectOption={getDeviceId}
                    optionsData={getData?.results}
                />
                <Select
                    selectOption={data?.container}
                    title={"Container"}
                    setSelectOption={getContainerId}
                    optionsData={analysisDate}
                />
                <Button>Add</Button>
            </Form>
        </Modal>
    )
}