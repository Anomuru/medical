import React, {FC, useCallback, useEffect, useState} from 'react';

import {AnalysisContainer, AnalysisPackage} from "entities/analysis";
import {Modal} from "shared/ui/modal";
import {Form} from "shared/ui/form";
import {Input} from "shared/ui/input";

import cls from "./analysisContainerModal.module.sass";
import {HexColorPicker} from "react-colorful";
import {Button} from "../../../../shared/ui/button";
import {useForm} from "react-hook-form";
import {
    DynamicModuleLoader,
    ReducersList
} from "../../../../shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";

import {analysisContainerActions, analysisContainerReducer} from "entities/analysis/model/slice/analysisContainerSlice";
import {useDispatch, useSelector} from "react-redux";
import {getAnalysisContainer} from "../../../../entities/analysis/model/selector/analysisContainerSelector";

import {DeleteModal} from "../../../deleteModal/ui/DeleteModal";


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
    const onClick = (data: IAnalysisContainerModalProps) => {
        const res = {
            ...data,
            color: color,
            id: new Date().getTime()
        }
        setActive(false)
        setValue("name" , "")
        setValue("size" , "")
        setColor("#fff")
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
                <div className={cls.modal__colorChange}>


                    <HexColorPicker color={color} onChange={setColor}/>
                    <div className={cls.modal__colorChange_mainBox}>
                        <h2>Color :</h2>
                        <div className={cls.modal__colorChange_box}
                             style={{background: color}}>

                        </div>
                    </div>
                </div>
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

    useEffect(() => {
        setValue("name" , activeEditItem?.name)
        setValue("size" , activeEditItem?.size)
        setColor(activeEditItem?.color)

    } , [activeEditItem , active])


    const dispatch = useDispatch()

    const onCloseDeleteModal = useCallback(() => {
        setActiveConfirm(false);
    }, []);

    const onEdit = (data: IAnalysisContainerModalProps) => {
        const res = {
            ...data,
            color: color,

        }
        setActive(false)
        dispatch(analysisContainerActions.onEditAnalysis({id: activeEditItem.id , data: res}))

    }

    const onDelete = () => {
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
                <div className={cls.modal__colorChange}>


                    <HexColorPicker color={color} onChange={setColor}/>
                    <div className={cls.modal__colorChange_mainBox}>
                        <h2>Color :</h2>
                        <div className={cls.modal__colorChange_box}
                             style={{background: color}}>

                        </div>
                    </div>
                </div>
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
