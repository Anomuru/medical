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
import {useHttp} from "../../../../shared/api/base";


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


export const AnalysisContainerModal = () => {

    const [active, setActive] = useState<boolean>(false)
    const [activeEdit, setActiveEdit] = useState<boolean>(false)
    const [activeEditItem, setActiveEditItem] = useState(null)


    const analysisDate = useSelector(getAnalysisContainer)



    return (

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

    );
}


const AddContainerModal: FC<IAddAnalysisContainerModalProps> = ({active, setActive}) => {
    const [color, setColor] = useState("#fff");

    const {register, setValue, handleSubmit} = useForm()

    const dispatch = useDispatch()


    const {request} = useHttp()

    const onClick = (data: IAnalysisContainerModalProps) => {


        // request({
        //     url: ``,
        //     method: "PATCH",
        //     body: JSON.stringify(),
        //     headers: headers()
        // })
        //

        const res = {
            ...data,
            id: new Date().getTime()
        }

        setActive(false)
        setValue("name" , "")
        setValue("size" , "")
        setValue("color" , "")
        dispatch(analysisContainerActions.onAddAnalysis(res))

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


        // request({
        //     url: ``,
        //     method: "PATCH",
        //     body: JSON.stringify(),
        //     headers: headers()
        // })
        //



        setActive(false)
        dispatch(analysisContainerActions.onEditAnalysis({id: activeEditItem.id , data}))

    }

    const onDelete = () => {


        // request({
        //     url: ``,
        //     method: "PATCH",
        //     body: JSON.stringify(),
        //     headers: headers()
        // })
        //


        dispatch(analysisContainerActions.onDeleteAnalysis(activeEditItem.id))
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
