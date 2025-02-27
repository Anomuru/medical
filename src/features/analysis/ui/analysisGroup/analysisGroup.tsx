// import React, {FC, useCallback, useEffect, useState} from 'react';
//
//
// import {Modal} from "shared/ui/modal";
// import {Form} from "shared/ui/form";
// import {Input} from "shared/ui/input";
//
// import cls from "./analysisGroupModal.module.sass";
//
// import {Button} from "../../../../shared/ui/button";
// import {useForm} from "react-hook-form";
//
//
// import {useDispatch, useSelector} from "react-redux";
// import {getAnalysisGroup} from "../../../../entities/analysis/model/selector/analysisGroupSelector";
// import {AnalysisGroup} from "../../../../entities/analysis";
// import {analysisGroupActions} from "../../../../entities/analysis";
// import {DeleteModal} from "../../../deleteModal/ui/DeleteModal";
// import {headers, useHttp} from "../../../../shared/api/base";
// import {useAppDispatch} from "../../../../shared/lib/hooks/useAppDispatch/useAppDispatch";
// import {fetchAnalysisGroupList} from "../../../../entities/analysis";
// import {alertAction} from "../../../alert/model/slice/alertSlice";
// import {
//     DynamicModuleLoader,
//     ReducersList
// } from "../../../../shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
// import {branchReducers} from "../../../branch/model/slice/getBranchSlice";
// import {getBranch, getBranchThunk} from "../../../branch";
// import {Select} from "../../../../shared/ui/select";
//
//
// interface IAnalysisContainerModalProps {
//     name?: string,
// }
//
// interface IAddAnalysisContainerModalProps {
//     active: boolean,
//     setActive: (arg: boolean) => void
// }
//
// interface IEditAnalysisContainerModalProps {
//     active: boolean,
//     setActive: (arg: boolean) => void,
//     activeEditItem: any
// }
//
// const reducers: ReducersList = {
//     branchSlice: branchReducers
//
// }
// export const AnalysisGroupModal = () => {
//
//     const [active, setActive] = useState<boolean>(false)
//     const [activeEdit, setActiveEdit] = useState<boolean>(false)
//     const [activeEditItem, setActiveEditItem] = useState(null)
//
//     const groupAnalysisData = useSelector(getAnalysisGroup)
//
//     const dispatch = useAppDispatch()
//
//     useEffect(() => {
//         dispatch(fetchAnalysisGroupList())
//         dispatch(getBranchThunk())
//     }, [])
//
//
//     return (
//         <DynamicModuleLoader reducers={reducers}>
//             <div className={cls.modal}>
//                 <div className={cls.modal__wrapper}>
//                     <div onClick={() => setActive(true)} className={cls.modal__add}>
//                         <i className={"fas fa-plus"}/>
//                     </div>
//
//                 </div>
//
//
//                 <AnalysisGroup
//                     setActiveEdit={setActiveEdit} setActiveEditItem={setActiveEditItem} data={groupAnalysisData}
//                 />
//
//                 <AddGroupModal active={active} setActive={setActive}/>
//                 <EditContainerModal active={activeEdit} setActive={setActiveEdit} activeEditItem={activeEditItem}/>
//             </div>
//         </DynamicModuleLoader>
//
//     );
// }
//
//
// const AddGroupModal: FC<IAddAnalysisContainerModalProps> = ({active, setActive}) => {
//
//
//     const {register, setValue, handleSubmit} = useForm()
//     const branch = useSelector(getBranch)
//     const branchData = branch?.results;
//     const [selectedBranch, setSelectedBranch] = useState<string>()
//     const dispatch = useDispatch()
//
//     const {request} = useHttp()
//
//     const onClick = (data: IAnalysisContainerModalProps) => {
//
//         const completeData = {
//             ...data,
//             branch: selectedBranch
//         }
//         request({
//             url: "analysis/analysis_type/crud/create/",
//             method: "POST",
//             body: JSON.stringify(completeData),
//             headers: headers()
//         }).then(res => {
//             setActive(false)
//             setValue("name", "")
//             dispatch(analysisGroupActions.onAddAnalysisGroup(res))
//             dispatch(alertAction.onAddAlertOptions({
//                 type: "success",
//                 status: true,
//                 msg: "Successfully added"
//             }))
//         })
//
//
//     }
//     return (
//         <Modal
//             active={active}
//             setActive={setActive}
//             title={"Add"}
//         >
//             <Form extraClass={cls.modal__form}>
//                 <Input required extraClass={cls.modal__input} name={"name"} placeholder={"Nomi"} register={register}/>
//                 <Select
//                     setSelectOption={setSelectedBranch}
//                     optionsData={branchData}
//                     selectOption={selectedBranch}
//                 />
//                 {/*<Input required extraClass={cls.modal__input} name={"size"} placeholder={"Hajmi"} register={register}/>*/}
//                 <Button extraClass={cls.modal__button} onClick={handleSubmit(onClick)}>
//                     Add
//                 </Button>
//             </Form>
//         </Modal>
//     )
// }
//
// //
// //
// const EditContainerModal: FC<IEditAnalysisContainerModalProps> = ({active, setActive, activeEditItem}) => {
//
//
//     const {register, setValue, handleSubmit} = useForm()
//
//     const [activeConfirm, setActiveConfirm] = useState<boolean>(false)
//
//     const {request} = useHttp()
//
//     useEffect(() => {
//         setValue("name", activeEditItem?.name)
//
//     }, [activeEditItem, active])
//
//
//     const dispatch = useDispatch()
//
//     const onCloseDeleteModal = useCallback(() => {
//         setActiveConfirm(false);
//     }, []);
//
//     const onEdit = (data: IAnalysisContainerModalProps) => {
//
//
//         request({
//             url: `analysis/analysis_type/crud/update/${activeEditItem.id}/`,
//             method: "PUT",
//             body: JSON.stringify(data),
//             headers: headers()
//         }).then(res => {
//             setActive(false)
//             dispatch(analysisGroupActions.onEditAnalysisGroup({id: activeEditItem.id, data: res}))
//             dispatch(alertAction.onAddAlertOptions({
//                 type: "success",
//                 status: true,
//                 msg: "Successfully Changed"
//             }))
//         })
//         //
//
//
//     }
//
//     const onDelete = () => {
//
//
//         request({
//             url: `analysis/analysis_type/crud/delete/${activeEditItem.id}/`,
//             method: "DELETE",
//
//             headers: headers()
//         }).then(res => {
//             dispatch(analysisGroupActions.onDeleteAnalysisGroup(activeEditItem.id))
//             setActive(false)
//             onCloseDeleteModal()
//             dispatch(alertAction.onAddAlertOptions({
//                 type: "success",
//                 status: true,
//                 msg: res.message
//             }))
//         })
//
//
//     }
//     return (
//         <Modal
//             active={active}
//             setActive={setActive}
//             title={"Add"}
//         >
//             <Form extraClass={cls.modal__form}>
//                 <Input extraClass={cls.modal__input} name={"name"} placeholder={"Nomi"} register={register}/>
//                 <div style={{display: "flex", justifyContent: "space-between"}}>
//                     <Button extraClass={cls.modal__button} onClick={handleSubmit(onEdit)}>
//                         Edit
//                     </Button>
//                     <Button type={"danger"} extraClass={cls.modal__button}
//                             onClick={handleSubmit(() => setActiveConfirm(true))}>
//                         Delete
//                     </Button>
//                 </div>
//             </Form>
//             <DeleteModal active={activeConfirm} setActive={onCloseDeleteModal} onConfirm={onDelete}/>
//         </Modal>
//     )
// }
import React, {FC, useCallback, useEffect, useState} from 'react';


import {Modal} from "shared/ui/modal";
import {Form} from "shared/ui/form";
import {Input} from "shared/ui/input";

import cls from "./analysisGroupModal.module.sass";

import {Button} from "../../../../shared/ui/button";
import {useForm} from "react-hook-form";


import {useDispatch, useSelector} from "react-redux";
import {getAnalysisGroup} from "../../../../entities/analysis/model/selector/analysisGroupSelector";
import {AnalysisGroup} from "../../../../entities/analysis";
import {analysisGroupActions} from "../../../../entities/analysis";
import {DeleteModal} from "../../../deleteModal/ui/DeleteModal";
import {headers, useHttp} from "../../../../shared/api/base";
import {useAppDispatch} from "../../../../shared/lib/hooks/useAppDispatch/useAppDispatch";
import {fetchAnalysisGroupList} from "../../../../entities/analysis";
import {alertAction} from "../../../../entities/alert/model/slice/alertSlice";
import {getUserBranch} from "entities/user";


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

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchAnalysisGroupList())
    }, [])


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
    const {request} = useHttp()
    const userBranch = useSelector(getUserBranch)



    const onClick = (data: IAnalysisContainerModalProps) => {


        request({
            url: "analysis/analysis_type/crud/create/",
            method: "POST",
            body: JSON.stringify({...data, branch: userBranch}),
            headers: headers()
        }).then(res => {
            setActive(false)
            setValue("name", "")
            dispatch(analysisGroupActions.onAddAnalysisGroup(res))
            dispatch(alertAction.onAddAlertOptions({
                type: "success",
                status: true,
                msg: "Успешно добавлено"
            }))
        })


    }
    return (
        <Modal
            active={active}
            setActive={setActive}
            title={"Добавлять"}
        >
            <Form extraClass={cls.modal__form}>
                <Input required extraClass={cls.modal__input} name={"name"} placeholder={"Имя"} register={register}/>
                {/*<Input required extraClass={cls.modal__input} name={"size"} placeholder={"Hajmi"} register={register}/>*/}
                <Button extraClass={cls.modal__button} onClick={handleSubmit(onClick)}>
                    Добавлять
                </Button>
            </Form>
        </Modal>
    )
}

//
//
const EditContainerModal: FC<IEditAnalysisContainerModalProps> = ({active, setActive, activeEditItem}) => {


    const {register, setValue, handleSubmit} = useForm()

    const [activeConfirm, setActiveConfirm] = useState<boolean>(false)

    const {request} = useHttp()

    useEffect(() => {
        setValue("name", activeEditItem?.name)

    }, [activeEditItem, active])


    const dispatch = useDispatch()

    const onCloseDeleteModal = useCallback(() => {
        setActiveConfirm(false);
    }, []);

    const onEdit = (data: IAnalysisContainerModalProps) => {


        request({
            url: `analysis/analysis_type/crud/update/${activeEditItem.id}/`,
            method: "PUT",
            body: JSON.stringify(data),
            headers: headers()
        }).then(res => {
            setActive(false)
            dispatch(analysisGroupActions.onEditAnalysisGroup({id: activeEditItem.id, data: res}))
            dispatch(alertAction.onAddAlertOptions({
                type: "success",
                status: true,
                msg: "Успешно изменено"
            }))
        })
        //


    }

    const onDelete = () => {


        request({
            url: `analysis/analysis_type/crud/delete/${activeEditItem.id}/`,
            method: "DELETE",

            headers: headers()
        }).then(res => {
            dispatch(analysisGroupActions.onDeleteAnalysisGroup(activeEditItem.id))
            setActive(false)
            onCloseDeleteModal()
            dispatch(alertAction.onAddAlertOptions({
                type: "success",
                status: true,
                msg: res.message
            }))
        })


    }
    return (
        <Modal
            active={active}
            setActive={setActive}
            title={"Редактировать"}
        >
            <Form extraClass={cls.modal__form}>
                <Input extraClass={cls.modal__input} name={"name"} placeholder={"Имя"} register={register}/>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <Button extraClass={cls.modal__button} onClick={handleSubmit(onEdit)}>
                        Редактировать
                    </Button>
                    <Button type={"danger"} extraClass={cls.modal__button}
                            onClick={handleSubmit(() => setActiveConfirm(true))}>
                        Удалить
                    </Button>
                </div>
            </Form>
            <DeleteModal active={activeConfirm} setActive={onCloseDeleteModal} onConfirm={onDelete}/>
        </Modal>
    )
}