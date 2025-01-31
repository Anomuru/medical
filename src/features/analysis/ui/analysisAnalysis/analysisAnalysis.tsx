import cls from "./analysisAnalysisModal.module.sass";

import React, {useCallback, useState} from "react";
import {Modal} from "../../../../shared/ui/modal";
import {Form} from "../../../../shared/ui/form";
import {Input} from "../../../../shared/ui/input";
import {AnalysisList} from "../../../../entities/analysis";
import {Select} from "../../../../shared/ui/select";
import {Button} from "../../../../shared/ui/button";
import {useForm} from "react-hook-form";
import {useHttp} from "../../../../shared/api/base";

export const AnalysisAnalysis = () => {
    const [active, setActive] = useState<boolean>(false)
    // const []

    return (
        <div className={cls.modal}>
            <div className={cls.modal__wrapper}>
                <div onClick={() => setActive(true)} className={cls.modal__add}>
                    <i className={"fas fa-plus"}/>
                </div>
            </div>
            <AnalysisList/>

            <AnalysisAnalysisAddModal active={active} setActive={setActive}/>
        </div>
    );
};

interface IAddData {
    name: string,
    code_name: string
}

interface IModalProps {
    active: boolean,
    setActive: (arg: boolean) => void
}

const AnalysisAnalysisAddModal = ({active, setActive}: IModalProps) => {

    const {request} = useHttp()
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
            })
            .catch(err => console.log(err))
    }

    return (
        <>

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
        </>
    )
}