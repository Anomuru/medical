import React, {FC, useCallback, useEffect, useState} from 'react';


import {Modal} from "shared/ui/modal";
import {Form} from "shared/ui/form";
import {Input} from "shared/ui/input";

import cls from "./analysisGroupModal.module.sass";

import {Button} from "../../../../shared/ui/button";
import {useForm} from "react-hook-form";


import {useDispatch, useSelector} from "react-redux";
import {getAnalysisGroup} from "../../../../entities/analysis/model/selector/analysisGroupSelector";
import {AnalysisGroup} from "../../../../entities/analysis/ui/analysisGroup/analysisGroup";
import {analysisGroupActions} from "../../../../entities/analysis/model/slice/analysisGroupSlice";
import {DeleteModal} from "../../../deleteModal/ui/DeleteModal";


interface IAnalysisContainerModalProps {
    name?: string,
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

export const AnalysisGroupModal = () => {

    const [active, setActive] = useState<boolean>(false)
    const [activeEdit, setActiveEdit] = useState<boolean>(false)
    const [activeEditItem, setActiveEditItem] = useState(null)

    const groupAnalysisData = useSelector(getAnalysisGroup)



    return (
        <div className={cls.modal}>
            <div className={cls.modal__wrapper}>
                <div onClick={() => setActive(true)} className={cls.modal__add}>
                    <i className={"fas fa-plus"}/>
                </div>

            </div>


            <AnalysisGroup
                setActiveEdit={setActiveEdit} setActiveEditItem={setActiveEditItem} data={groupAnalysisData}
            />

            <AddGroupModal active={active} setActive={setActive}/>
            <EditContainerModal active={activeEdit} setActive={setActiveEdit} activeEditItem={activeEditItem}/>
        </div>

    );
}


const AddGroupModal: FC<IAddAnalysisContainerModalProps> = ({active, setActive}) => {


    const {register, setValue, handleSubmit} = useForm()

    const dispatch = useDispatch()
    const onClick = (data: IAnalysisContainerModalProps) => {
        const res = {
            ...data,
            id: new Date().getTime()
        }
        setActive(false)
        setValue("name", "")
        dispatch(analysisGroupActions.onAddAnalysisGroup(res))
    }
    return (
        <Modal
            active={active}
            setActive={setActive}
            title={"Add"}
        >
            <Form extraClass={cls.modal__form}>
                <Input required extraClass={cls.modal__input} name={"name"} placeholder={"Nomi"} register={register}/>
                {/*<Input required extraClass={cls.modal__input} name={"size"} placeholder={"Hajmi"} register={register}/>*/}
                <Button extraClass={cls.modal__button} onClick={handleSubmit(onClick)}>
                    Add
                </Button>
            </Form>
        </Modal>
    )
}

//
//
const EditContainerModal: FC<IEditAnalysisContainerModalProps> = ({active, setActive , activeEditItem}) => {


    const {register, setValue, handleSubmit} = useForm()

    const [activeConfirm , setActiveConfirm] = useState<boolean>(false)

    useEffect(() => {
        setValue("name" , activeEditItem?.name)

    } , [activeEditItem , active])


    const dispatch = useDispatch()

    const onCloseDeleteModal = useCallback(() => {
        setActiveConfirm(false);
    }, []);

    const onEdit = (data: IAnalysisContainerModalProps) => {
        setActive(false)
        dispatch(analysisGroupActions.onEditAnalysisGroup({id: activeEditItem.id , data}))

    }

    const onDelete = () => {
        dispatch(analysisGroupActions.onDeleteAnalysisGroup(activeEditItem.id))
        setActive(false)
        onCloseDeleteModal()

    }
    return (
        <Modal
            active={active}
            setActive={setActive}
            title={"Add"}
        >
            <Form extraClass={cls.modal__form}>
                <Input extraClass={cls.modal__input} name={"name"} placeholder={"Nomi"} register={register}/>
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
