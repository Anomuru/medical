import React, {FC, useCallback, useEffect, useState} from 'react';

import {AnalysisContainer} from "entities/analysis";
import {Modal} from "shared/ui/modal";
import {Form} from "shared/ui/form";
import {Input} from "shared/ui/input";

import cls from "./analysisContainerModal.module.sass";

import {Button} from "../../../../shared/ui/button";
import {useForm} from "react-hook-form";



import {analysisContainerActions} from "entities/analysis/model/slice/analysisContainerSlice";
import {useDispatch, useSelector} from "react-redux";
import {getAnalysisContainer} from "../../../../entities/analysis/model/selector/analysisContainerSelector";

import {DeleteModal} from "../../../deleteModal/ui/DeleteModal";
import {headers, useHttp} from "../../../../shared/api/base";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {analysisContainerThunk} from "entities/analysis/model/thunk/analysisContainerThunk";
import {alertAction} from "../../../alert/model/slice/alertSlice";
import {
    DynamicModuleLoader,
    ReducersList
} from "../../../../shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {branchReducers} from "../../../branch/model/slice/getBranchSlice";
import {getBranch, getBranchThunk} from "../../../branch";
import {Select} from "../../../../shared/ui/select";


interface IAnalysisContainerModalProps {
    name?: string,
    color?: string,
}

interface IAddAnalysisContainerModalProps {
    active: boolean,
    setActive: (arg: boolean) => void
}

interface IEditAnalysisContainerModalProps {
    active: boolean,
    setActive: (arg: boolean) => void,
    activeEditItem: any
}

const reducers: ReducersList = {
    branchSlice: branchReducers

}
export const AnalysisContainerModal = () => {

    const [active, setActive] = useState<boolean>(false)
    const [activeEdit, setActiveEdit] = useState<boolean>(false)
    const [activeEditItem, setActiveEditItem] = useState(null)

    const analysisDate = useSelector(getAnalysisContainer)

    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(analysisContainerThunk())
        dispatch(getBranchThunk())
    },[])


    return (

           <DynamicModuleLoader reducers={reducers}>
               <div className={cls.modal}>
                   <div className={cls.modal__wrapper}>
                       <div onClick={() => setActive(true)} className={cls.modal__add}>
                           <i className={"fas fa-plus"}/>
                       </div>

                   </div>



                   <AnalysisContainer setActiveEdit={setActiveEdit} setActiveEditItem={setActiveEditItem} data={analysisDate}/>

                   <AddContainerModal active={active} setActive={setActive}/>
                   <EditContainerModal active={activeEdit} setActive={setActiveEdit} activeEditItem={activeEditItem}/>
               </div>
           </DynamicModuleLoader>

    );
}


const AddContainerModal: FC<IAddAnalysisContainerModalProps> = ({active, setActive}) => {

    const {register, setValue, handleSubmit} = useForm();
    const dispatch = useDispatch();
    const branch = useSelector(getBranch)
    const branchData = branch?.results;
    const [selectedBranch, setSelectedBranch] = useState<string>()

    const {request} = useHttp()

    const onClick = (data: IAnalysisContainerModalProps) => {
        const completeData = {
            ...data,
            branch: selectedBranch
        }

        request({
            url: "container/crud/create/",
            method: "POST",
            body: JSON.stringify(completeData),
            headers: headers()
        }).then(res => {
            setActive(false)
            setValue("name" , "")
            setValue("size" , "")
            setValue("color" , "")
            dispatch(analysisContainerActions.onAddAnalysis(res))
            dispatch(alertAction.onAddAlertOptions({
                type: "success",
                status: true,
                msg: "Successfully added"
            }))
        })





    }
    return (
        <Modal
            active={active}
            setActive={setActive}
            title={"Add"}
        >
            <Form extraClass={cls.modal__form}>
                <Input required extraClass={cls.modal__input} name={"name"} placeholder={"Nomi"} register={register}/>
                <Input required extraClass={cls.modal__input} name={"size"} placeholder={"Hajmi"} register={register}/>

                <label htmlFor="">Choose color<Input extraLabelClass={cls.label} name={"color"} register={register} type={"color"}/></label>
                <Select
                    extraClass={cls.modal__input}
                    setSelectOption={setSelectedBranch}
                    optionsData={branchData}
                    selectOption={selectedBranch}
                />
                <Button extraClass={cls.modal__button} onClick={handleSubmit(onClick)}>
                    Add
                </Button>
            </Form>
        </Modal>
    )
}



const EditContainerModal: FC<IEditAnalysisContainerModalProps> = ({active, setActive , activeEditItem}) => {
    const [color, setColor] = useState("#aabbcc");

    const {register, setValue, handleSubmit} = useForm()

    const [activeConfirm , setActiveConfirm] = useState<boolean>(false)


    const {request} = useHttp()

    useEffect(() => {
        setValue("name" , activeEditItem?.name)
        setValue("size" , activeEditItem?.size)
        setValue("color" , activeEditItem?.color)

    } , [activeEditItem , active])


    const dispatch = useDispatch()

    const onCloseDeleteModal = useCallback(() => {
        setActiveConfirm(false);
    }, []);

    const onEdit = (data: IAnalysisContainerModalProps) => {
        request({
            url: `container/crud/${activeEditItem.id}/update`,
            method: "PATCH",
            body: JSON.stringify(data),
            headers: headers()
        }).then(res => {

            setActive(false)
            dispatch(analysisContainerActions.onEditAnalysis({id: activeEditItem.id , data : res}))
            dispatch(alertAction.onAddAlertOptions({
                type: "success",
                status: true,
                msg: "Successfully changed"
            }))
        })





    }

    const onDelete = () => {


        // request({
        //     url: ``,
        //     method: "PATCH",
        //     body: JSON.stringify(),
        //     headers: headers()
        // })
        //
        request({
            url: `container/crud/${activeEditItem.id}/delete`,
            method: "DELETE",
            headers: headers()
        }).then(res => {
            dispatch(analysisContainerActions.onDeleteAnalysis(activeEditItem.id))
            setActive(false)
            onCloseDeleteModal()
            dispatch(alertAction.onAddAlertOptions({
                type: "success",
                status: true,
                msg: "Successfully changed"
            }))
        })



    }
    return (
        <Modal
            active={active}
            setActive={setActive}
            title={"Add"}
        >
            <Form extraClass={cls.modal__form}>
                <Input extraClass={cls.modal__input} name={"name"} placeholder={"Nomi"} register={register}/>
                <Input extraClass={cls.modal__input} name={"size"} placeholder={"Hajmi"} register={register}/>
                <label htmlFor="">
                    Change color
                    <Input extraLabelClass={cls.label} name={"color"}  register={register} type={"color"}/>
                </label>
                <div style={{display: "flex" , justifyContent: "space-between"}}>
                    <Button extraClass={cls.modal__button} onClick={handleSubmit(onEdit)}>
                        Edit
                    </Button>
                    <Button type={"danger"} extraClass={cls.modal__button} onClick={handleSubmit(() => setActiveConfirm(true))}>
                        Delete
                    </Button>
                </div>
            </Form>
            <DeleteModal active={activeConfirm} setActive={onCloseDeleteModal} onConfirm={onDelete}/>
        </Modal>
    )
}
