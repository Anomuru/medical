import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {useAppDispatch} from "../../../../shared/lib/hooks/useAppDispatch/useAppDispatch";

import {useSelector} from "react-redux"

import {fetchProfilePaymentsData} from "../../model/thunk/profileThunk";
import {getProfilePaymentsData} from "../../model/selector/profileSelector";
import {Table} from "../../../../shared/ui/table";
import cls from "./profilePayments.module.sass"
import {Modal} from "../../../../shared/ui/modal";
import {Form} from "../../../../shared/ui/form";
import {Input} from "../../../../shared/ui/input";
import {set, useForm} from "react-hook-form";
import {paymentTypeThunk} from "../../../paymentFeature/model/paymentThunk";
import {Radio} from "../../../../shared/ui/radio";
import {getPaymentTypeData} from "../../../paymentFeature/model/paymentSelector";
import {Button} from "../../../../shared/ui/button";
import {headers, useHttp} from "../../../../shared/api/base";
import {getOftenPaymentTypes} from "../../../../entities/oftenUsed/model/selector/oftenUsedSelector";
import {oftenPaymentTypes} from "../../../../entities/oftenUsed/model/thunk/oftenUsedThunk";
import {IUserPaymentsData} from "../../model/types/profileAnalysisTypes";
import {profileAnalysisActions} from "../../model/slice/profileSlice";
import {alertAction} from "../../../alert/model/slice/alertSlice";


export const PaymentsList = () => {
    const {id} = useParams()
    const dispatch = useAppDispatch()
    const [active, setActive] = useState<boolean>(false)
    const [activeItem, setActiveItem] = useState<IUserPaymentsData>()

    useEffect(() => {
        if (id) {
            dispatch(fetchProfilePaymentsData(id))
        }
    }, [])
    const paymentsData = useSelector(getProfilePaymentsData)
    useEffect(() => {
        dispatch(oftenPaymentTypes())
    }, [])
    const renderPayments = () => {
        return paymentsData?.map((item, i) => {
            return (
                <tr>
                    <td>{i + 1}</td>
                    <td>{item.amount}</td>
                    <td>{item.date}</td>
                    <td>{item.payment_type.payment_type}</td>
                    <td><i onClick={() => {
                        setActive(true)
                        setActiveItem(item)
                    }} className={"fa fa-pen"}/></td>
                </tr>
            )
        })
    }

    const render = renderPayments()

    return (
        <div className={cls.payments}>

            <Table>
                <thead>
                <tr>
                    <th>№</th>
                    <th>Сумма платежа</th>
                    <th>дата</th>
                    <th>Тип платежа</th>
                    <th/>
                </tr>
                </thead>
                <tbody>

                {render}


                </tbody>
            </Table>

            <ChangePaymentModal
                // @ts-ignore

                activeItem={activeItem}
                active={active}
                setActive={setActive}
            />

        </div>
    );
};


const ChangePaymentModal = ({activeItem, active, setActive}: {
    activeItem: IUserPaymentsData,
    active: boolean,
    setActive: (arg: boolean) => void
}) => {
    const payType = useSelector(getOftenPaymentTypes)
    const [selectedRadio, setSelectedRadio] = useState<string>("")


    const {register, handleSubmit, setValue} = useForm()
    const {request} = useHttp()

    const dispatch = useAppDispatch()
    const onChange = () => {
        const res = {
            payment_type: selectedRadio
        }

        request({
            url: `account/payment/payment/${activeItem.id}/`,
            method: "PUT",
            body: JSON.stringify(res),
            headers: headers()
        }).then(res => {
            setActive(false)
            dispatch(alertAction.onAddAlertOptions({
                status: true,
                type: "success",
                msg: res.message
            }))
            dispatch(profileAnalysisActions.onChangePaymentType({id: activeItem.id, data: res.payment}))
        })
            .catch(err => {
                console.log(err)
            })
    }
    const onDelete = () => {
        request({
            url: `account/payment/payment/${activeItem.id}/`,
            method: "DELETE",
            headers: headers()
        })
            .then(res => {
                setActive(false)
                dispatch(alertAction.onAddAlertOptions({
                    status: true,
                    type: "success",
                    msg: res.message
                }))
                dispatch(profileAnalysisActions.onDeletePayments(activeItem.id))
            })
            .catch(err => console.log(err))
    }

    console.log(payType, "fds")
    return (
        <Modal title={"Change"} active={active} setActive={setActive}>
            <Form extraClass={cls.form}>
                {/*<Input name={"payment_type"} />*/}
                <div className={cls.form__radios}>
                    {
                        payType?.map(item => {
                            return (
                                <Radio
                                    name={"payment_type"}
                                    value={item.id}
                                    onChange={setSelectedRadio}


                                    checked={item.id === Number(selectedRadio)}
                                >
                                    {item.payment_type}
                                </Radio>
                            )
                        })
                    }
                </div>
                <div className={cls.form__buttons}>
                    <Button onClick={handleSubmit(onChange)}>Change</Button>
                    <Button onClick={handleSubmit(onDelete)} type={"danger"}>Delete</Button>
                </div>
            </Form>

        </Modal>
    )
}