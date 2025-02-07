import React, {useCallback, useEffect, useState} from 'react';

import {AnalysisPackage} from "entities/analysis";
import {Modal} from "shared/ui/modal";
import {Form} from "shared/ui/form";
import {Input} from "shared/ui/input";

import cls from "./analysisPackageModal.module.sass";
import {getAnalysisPackage} from "entities/analysis";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {Button} from "shared/ui/button";

import {analysisPackageAction} from "entities/analysis";
import {DeleteModal} from "../../../deleteModal/ui/DeleteModal";
import {alertAction} from "../../../alert/model/slice/alertSlice";
import {headers, useHttp} from "../../../../shared/api/base";
import {fetchAnalysisPackageList} from "entities/analysis/index";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {
    DynamicModuleLoader,
    ReducersList
} from "../../../../shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {Select} from "../../../../shared/ui/select";
import {fetchBranchData, getBranchesData} from "../../../../entities/oftenUsed";
import {getSelectedLocationData} from "entities/oftenUsed/model/selector/oftenUsedSelector";


export const AnalysisPackageModal = () => {

    const selectedLocation = useSelector(getSelectedLocationData)
    const userBranch = localStorage.getItem("branch")

    const [active, setActive] = useState<boolean>(false)
    const [activeEdit, setActiveEdit] = useState<boolean>(false)
    const [activeEditItem, setActiveEditItem] = useState({})

    const dispatch = useAppDispatch()

    useEffect(() => {

        if (userBranch) {
            dispatch(fetchAnalysisPackageList())
        }
    }, [])


    // console.log(branchId)

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
    // const branchData = branch?.results;

    const branchData = useSelector(getBranchesData)

    const [selectedBranch, setSelectedBranch] = useState<string>()

    const {request} = useHttp()

    const {setValue, handleSubmit, register} = useForm()

    const dispatch = useAppDispatch()

    const onClick = (data: {}) => {

        const res = {
            ...data,
            branch: selectedBranch
        }

        request({
            url: "packet/crud/create/",
            method: "POST",
            body: JSON.stringify(res),
            headers: headers()
        }).then(res => {
            dispatch(analysisPackageAction.onAddAnalysisPackage(res))
            setActive(false)
            setValue("name", "")
            dispatch(alertAction.onAddAlertOptions({
                type: "success",
                status: true,
                msg: "Successfully added"
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
                <Select
                    setSelectOption={setSelectedBranch}
                    optionsData={branchData}
                />
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


        request({
            url: `packet/crud/update/${activeEditItem.id}`,
            method: "PATCH",
            body: JSON.stringify(data),
            headers: headers()
        })
            .then(res => {
                console.log(res)

                dispatch(analysisPackageAction.onEditAnalysisPackage({id: activeEditItem.id, res}))
                setActive(false)
                setValue("name", "")
                dispatch(alertAction.onAddAlertOptions({
                    type: "success",
                    status: true,
                    msg: "Successfully Changed"
                }))
            })
            .catch(err => {
                console.log(err)
            })
        //

    }
    const onDelete = () => {

        request({
            url: `packet/crud/delete/${activeEditItem.id}`,
            method: "DELETE",
            headers: headers()
        })
            .then(res => {
                dispatch(analysisPackageAction.onDeleteAnalysisPackage(activeEditItem.id))
                setActive(false)
                setValue("name", "")
                onCloseDeleteModal()
                dispatch(alertAction.onAddAlertOptions({
                    type: "success",
                    status: true,
                    msg: res.message
                }))
            })


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