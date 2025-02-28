import cls from "./overhead.module.sass"
import {Button} from "shared/ui/button";
import classNames from "classnames";
import {useEffect, useState} from "react";
import {Modal} from "shared/ui/modal";
import {Form} from "shared/ui/form";
import {Input} from "shared/ui/input";
import {oftenPaymentTypes} from "entities/oftenUsed/model/thunk/oftenUsedThunk";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {useSelector} from "react-redux";

import {Select} from "shared/ui/select";
import {getOftenPaymentTypes} from "entities/oftenUsed/model/selector/oftenUsedSelector";
import {useForm} from "react-hook-form";

import {headers, useHttp} from "shared/api/base";
import {fetchOverheadData, fetchOverheadSelectType} from "entities/overheadEntities/model/thunk/overheadThunk";
import {getOverheadData, getOverheadSelectType} from "entities/overheadEntities/model/selector/overheadSelector";
import {getUserBranch} from "entities/user";
import {Table} from "shared/ui/table";
import {overheadAction} from "entities/overheadEntities";
import {ConfirmModal} from "shared/ui/confirm";
import {alertAction} from "features/alert/model/slice/alertSlice";


const btnItem = [
    {name: "O'chirilganlar", status: "deleted"},
    {name: "Arxiv", status: "archive"},
]


export const OverheadFeature = () => {

    const [activeBtn, setActiveBtn] = useState("")

    const [activeModal, setActiveModal] = useState(false)
    const userBranch = useSelector(getUserBranch)

    const {request} = useHttp()
    const [activeDel, setActiveDel] = useState(false)
    const [activeDelItem, setActiveDelItem] = useState<any>()
    const [activeChangeModal, setActiveChangeModal] = useState(false)

    const dispatch = useAppDispatch()

    const data = useSelector(getOverheadData)
    useEffect(() => {
        dispatch(fetchOverheadSelectType())
    }, [])
    useEffect(() => {
        if (userBranch) {
            dispatch(fetchOverheadData({branchId: userBranch, type: activeBtn}))
        }
    }, [activeBtn])
    const onDelete = () => {
        dispatch(overheadAction.onDeleteOverhead(activeDelItem.id))
        setActiveDel(false)

        request({
            url: `overheads/${activeDelItem.id}/`,
            method: "DELETE",
            headers: headers()
        })
            .then(res => {
                dispatch(alertAction.onAddAlertOptions({
                    status: true,
                    type: "success",
                    msg: "Успешно удалено"
                }))
                setActiveDel(false)
            })
            .catch(err => console.log(err))


    }


    const renderData = () => {
        return data?.map((item, i) => (
            <tr>
                <td>{i + 1}</td>
                <td>{item.name}</td>
                <td>{item.type}</td>
                <td>{item.price}</td>
                <td>{item.created}</td>
                <td>
                    <div onClick={() => {
                        setActiveChangeModal(true)
                        setActiveDelItem(item)
                    }} className={cls.overhead__payment}>
                        {item.payment}
                    </div>
                </td>
                <td>{!item.deleted ? <i onClick={() => {
                    setActiveDel(true)
                    setActiveDelItem(item)
                }}
                                        className={`fa fa-times ${cls.overhead__delete}`}/> : null}</td>
            </tr>
        ))
    }
    return (
        <div className={cls.overhead}>

            <div className={cls.overhead__header}>
                <div className={cls.overhead__header_btn}>
                    {btnItem.map(item => (
                        <Button onClick={() => {
                            setActiveBtn(prev => prev === item.status ? "" : item.status)
                        }} extraClass={classNames(cls.overhead__header_btn_btn, {
                            [cls.active]: activeBtn === item.status
                        })}>{item.name}</Button>
                    ))}
                </div>
                <div onClick={() => setActiveModal(true)} className={cls.overhead__header_add}>
                    <i className={"fa fa-plus"}/>
                </div>
            </div>

            <Table>
                <thead>
                <tr>
                    <th>Number</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Price</th>
                    <th>Data</th>
                    <th>Payment Type</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>

                {renderData()}

                </tbody>

            </Table>

            <AddOverhead active={activeModal} setActive={setActiveModal}/>

            <ChangePaymentType setActive={setActiveChangeModal} active={activeChangeModal} activeItem={activeDelItem}/>

            <ConfirmModal setActive={setActiveDel} active={activeDel} onClick={onDelete}/>
        </div>
    );
};

const AddOverhead = ({active, setActive}: { active: boolean, setActive: (active: boolean) => void }) => {
    const dispatch = useAppDispatch()

    const payType = useSelector(getOftenPaymentTypes)
    const type = useSelector(getOverheadSelectType)
    const [selectPayment, setSelectPayment] = useState("")
    const {register, handleSubmit, setValue} = useForm()

    const userBranch = useSelector(getUserBranch)
    const [selectedType, setSelectedType] = useState<number | string>()

    useEffect(() => {
        if (type) {
            setSelectedType(type[0]?.id)
        }
    }, [type])

    useEffect(() => {
        if (type) {
            setSelectedType(type[0]?.id)
        }
    }, [active])

    const {request} = useHttp()
    useEffect(() => {
        dispatch(oftenPaymentTypes())
    }, [])

    const onSubmit = (data: {}) => {

        const res = {
            ...data,
            payment_id: selectPayment,
            type_id: selectedType,
            branch_id: userBranch
        }


        request({
            url: "overheads/",
            method: "POST",
            body: JSON.stringify(res),
            headers: headers()
        })
            .then(res => {
                dispatch(overheadAction.onAddOverhead(res))
                setActive(false)
                if (type) {
                    setSelectedType(type[0]?.id)
                }
                setValue("price" , "")
                setValue("type_id" , "")
                dispatch(alertAction.onAddAlertOptions({
                    status: true,
                    type: "success",
                    msg: "Успешно добавлено"
                }))


            })

    }


    return (
        <Modal active={active} setActive={setActive} title={"Add"}>
            <Form extraClass={cls.overhead__form} onSubmit={handleSubmit(onSubmit)}>
                {selectedType === "7" ? <Input name={"type_id"} placeholder={"nima uchun"} register={register}/> : <><Select optionsData={type}
                                                                         setSelectOption={setSelectedType}/>
                   </>}

                <Input name={"price"} placeholder={"Price"} register={register}/>
                <Select setSelectOption={setSelectPayment} title={"Payment type"} optionsData={payType}/>
                <Button>Add</Button>


            </Form>

        </Modal>
    )
}


const ChangePaymentType = ({active, setActive, activeItem}: {
    active: boolean,
    setActive: (active: boolean) => void,
    activeItem: any
}) => {
    const payType = useSelector(getOftenPaymentTypes)
    const [selectPayment, setSelectPayment] = useState<string>("")
    const {request} = useHttp()
    const dispatch = useAppDispatch()


    useEffect(() => {
        if (active) {
            payType?.filter(item => {
                if (item.payment_type === activeItem?.payment) {
                    setSelectPayment(`${item.payment_type}`)
                }
            })
        } else {
            setSelectPayment("")
        }
    }, [active])

    const onChange = (e: string) => {
        request({
            url: `overheads/${activeItem.id}/`,
            method: "PATCH",
            body: JSON.stringify({payment_id: e}),
            headers: headers()
        })
            .then(res => {
                setActive(false)
                dispatch(overheadAction.onChangeOverhead({id: activeItem.id, data: res}))
                dispatch(alertAction.onAddAlertOptions({
                    status: true,
                    type: "success",
                    msg: "Успешно изменено"
                }))
            })

    }

    return (
        <Modal active={active} setActive={setActive} title={"Change"}>

            <Select extraClass={cls.overhead__select} setSelectOption={onChange} optionsData={payType}
                    title={selectPayment}/>


        </Modal>
    )
}