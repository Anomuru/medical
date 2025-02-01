import React, {useCallback, useEffect, useState} from 'react';

import {AnalysisPackage} from "entities/analysis";
import {Modal} from "shared/ui/modal";
import {Form} from "shared/ui/form";
import {Input} from "shared/ui/input";

import cls from "./analysisPackageModal.module.sass";
import {getAnalysisPackage} from "entities/analysis/model/selector/analysisPackageSelector";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {Button} from "../../../../shared/ui/button";
import {di} from "@fullcalendar/core/internal-common";
import {analysisPackageAction} from "../../../../entities/analysis/model/slice/analysisPackageSlice";
import {DeleteModal} from "../../../deleteModal/ui/DeleteModal";
import {alertAction} from "../../../alert/model/slice/alertSlice";
import {headers, useHttp} from "../../../../shared/api/base";
import {fetchAnalysisPackageList} from "../../../../entities/analysis/model/thunk/analysisPackage";
import {useAppDispatch} from "../../../../shared/lib/hooks/useAppDispatch/useAppDispatch";

export const AnalysisPackageModal = () => {

    const [active, setActive] = useState<boolean>(false)
    const [activeEdit, setActiveEdit] = useState<boolean>(false)
    const [activeEditItem, setActiveEditItem] = useState({})

    const dispatch = useAppDispatch()

    useEffect(() => {

        dispatch(fetchAnalysisPackageList())
    }, [])

    const analysisPackageData = useSelector(getAnalysisPackage)

    return (
        <div className={cls.modal}>
            <div className={cls.modal__wrapper}>
                <div onClick={() => setActive(true)} className={cls.modal__add}>
                    <i className={"fas fa-plus"}/>
                </div>
            </div>
            <AnalysisPackage data={analysisPackageData} setActiveEditItem={setActiveEditItem}
                             setActiveEdit={setActiveEdit}/>
            <AddPackageAddModal setActive={setActive} active={active}/>
            <EditPackageAddModal active={activeEdit} setActive={setActiveEdit} activeEditItem={activeEditItem}/>

        </div>
    );
}

const AddPackageAddModal = ({active, setActive}: { active: boolean, setActive: (arg: boolean) => void }) => {
    const {request} = useHttp()

    const {setValue, handleSubmit, register} = useForm()

    const dispatch = useAppDispatch()

    const onClick = (data: {}) => {


        request({
            url: "packet/crud/create/",
            method: "POST",
            body: JSON.stringify(data),
            headers: headers()
        }).then(res => {
            dispatch(analysisPackageAction.onAddAnalysisPackage(res))
            setActive(false)
            setValue("name", "")
            dispatch(alertAction.onAddAlertOptions({
                type: "success",
                status: true,
                msg: "sherzod gandon"
            }))
        })
            .catch(err => {
                console.log(err)
            })


    }

    return (
        <Modal title={"Add"} active={active} setActive={setActive}>
            <Form extraClass={cls.modal__form} onSubmit={handleSubmit(onClick)}>
                <Input name={"name"} register={register}/>
                <Button>Add</Button>

            </Form>
        </Modal>
    )
}

const EditPackageAddModal = ({active, setActive, activeEditItem}: {
    activeEditItem: any,
    active: boolean,
    setActive: (arg: boolean) => void
}) => {


    const {request} = useHttp()

    const {setValue, handleSubmit, register} = useForm()

    const [activeConfirm, setActiveConfirm] = useState<boolean>(false)
    const dispatch = useAppDispatch()

    useEffect(() => {
        setValue("name", activeEditItem.name)
    }, [setValue, activeEditItem])

    const onClick = (data: {}) => {


        // request({
        //     url: ``,
        //     method: "PATCH",
        //     body: JSON.stringify(),
        //     headers: headers()
        // })
        //

        dispatch(analysisPackageAction.onEditAnalysisPackage({id: activeEditItem.id, data}))
        setActive(false)
        setValue("name", "")
    }
    const onDelete = () => {


        // request({
        //     url: ``,
        //     method: "PATCH",
        //     body: JSON.stringify(),
        //     headers: headers()
        // })
        //

        dispatch(analysisPackageAction.onDeleteAnalysisPackage(activeEditItem.id))
        setActive(false)
        setValue("name", "")
        onCloseDeleteModal()
    }
    const onCloseDeleteModal = useCallback(() => {
        setActiveConfirm(false);
    }, []);
    return (
        <Modal title={"Edit"} active={active} setActive={setActive}>
            <Form extraClass={cls.modal__form}>
                <Input name={"name"} register={register}/>
                <div className={cls.modal__buttons}>
                    <Button onClick={handleSubmit(onClick)}>Edit</Button>
                    <Button type={"danger"} onClick={handleSubmit(() => setActiveConfirm(true))}>Delete</Button>
                </div>

            </Form>
            <DeleteModal active={activeConfirm} setActive={onCloseDeleteModal} onConfirm={onDelete}/>
        </Modal>
    )
}