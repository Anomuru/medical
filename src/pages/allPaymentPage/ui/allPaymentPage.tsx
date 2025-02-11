import React, { useEffect, useState} from 'react';
import {Pagination} from "features/pagination";
import {
    AllPaymentHeader,
    AllPaymentList
} from "entities/allPayment";
import {
    DynamicModuleLoader,
    ReducersList
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";

import cls from "./allPaymentPage.module.sass";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {useSelector} from "react-redux";
import {DeleteModal} from "features/deleteModal/ui/DeleteModal";
import {headers, useHttp} from "shared/api/base";
import {alertAction} from "features/alert/model/slice/alertSlice";
import {paymentListActions, paymentListReducer} from "entities/allPayment/model/slice/allPaymentSlice";
import {getAllPaymentList} from "entities/allPayment/model/selectors/allPaymentSelector";
import {fetchAllPaymentThunk} from "entities/allPayment/model/thunk/allPaymentThunk";
import {fetchBranchData, getSelectedBranchData, getSelectedLocationData} from "entities/oftenUsed";
import {IAllPayment} from "entities/allPayment/model/types/allPaymentSchema";
import {useForm} from "react-hook-form";
import {Modal} from "shared/ui/modal";
import {Form} from "shared/ui/form";
import {Button} from "shared/ui/button";
import {getPaymentTypeData} from "features/paymentFeature/model/paymentSelector";
import {paymentTypeThunk} from "features/paymentFeature/model/paymentThunk";
import {paymentTypeReducer} from "features/paymentFeature/model/paymentTypeSlice";
import {Radio} from "shared/ui/radio";







const reducers: ReducersList = {
    allPaymentSlice: paymentListReducer,
    paymentTypeSlice: paymentTypeReducer
};

const filter = [
    {name: "Paid", status: "true"},
    {name: "Unpaid", status: "false"}
]

export const AllPaymentPage = () => {

    const dispatch = useAppDispatch()
    const [activeEdit, setActiveEdit] = useState<boolean>(false)
    const [activeEditItem, setActiveEditItem] = useState<any>()
    const selectedLocation = useSelector(getSelectedLocationData)
    // const selectedBranch = useSelector(getSelectedBranchData)
    const selectedBranch = localStorage.getItem("branch")
    const patientData = useSelector(getAllPaymentList)
    const [activeType, setActiveType] = useState("")
    const payType = useSelector(getPaymentTypeData)
    const {register, setValue, handleSubmit} = useForm()
    const [selectedRadio, setSelectedRadio] = useState<number>()


    useEffect(() => {
        if (selectedLocation)
            dispatch(fetchBranchData({id: selectedLocation}))
    }, [selectedLocation])

    useEffect(() => {
        dispatch(paymentTypeThunk())
    }, [])


    console.log(selectedBranch, 'wweweweewe')

    useEffect(() => {
        if (selectedBranch)
            dispatch(fetchAllPaymentThunk({branch: selectedBranch, payType: selectedRadio}))
    }, [selectedBranch])

    const {request} = useHttp()

    const [currentPage, setCurrentPage] = useState<number>(1);


    const [activeDelete, setActiveDelete] = useState<boolean>(false)

    const [activeDeleteItem, setActiveDeleteItem] = useState<IAllPayment>({} as IAllPayment)
    useEffect(() => {
        setValue("payment_type", activeEditItem?.payment_type)
    }, [activeEditItem, activeEdit])
    const onEdit = () => {
        const data = {
            payment_type: selectedRadio
        }


        request({
            url: `account/payment/payment/${activeEditItem.id}/`,
            method: "PUT",
            body: JSON.stringify(data),
            headers: headers()
        }).then(res => {
            setActiveEdit(false)
            console.log(res.payment, 'data')
            dispatch(paymentListActions.onEditPayment({id: activeEditItem.id, data: res.payment}))
            dispatch(fetchAllPaymentThunk({branch: selectedBranch}))
            dispatch(alertAction.onAddAlertOptions({
                type: "success",
                status: true,
                msg: "Successfully Changed"
            }))
        })
    }

    const onDelete = () => {
        request({
            url: `account/payment/payment/${activeDeleteItem.id}/`,
            method: "DELETE",
            headers: headers()
        })
            .then(res => {
                dispatch(alertAction.onAddAlertOptions({
                    type: "success",
                    status: true,
                    msg: res.message
                }))
                setActiveDeleteItem({} as IAllPayment)
                setActiveDelete(false)
                dispatch(paymentListActions.onDeletePayment(activeDeleteItem.id))
            })
            .catch(err => {

                setActiveDeleteItem({} as IAllPayment)
                setActiveDelete(false)
                dispatch(alertAction.onAddAlertOptions({
                    type: "error",
                    status: true,
                    msg: "Error"
                }))
            })
    }


    return (
        <DynamicModuleLoader reducers={reducers}>
            <div className={cls.patient}>

                <AllPaymentHeader filter={filter} setActiveType={setActiveType} activeType={activeType}
                                  paymentType={payType}/>
                <div className={cls.patient__container}>
                    <AllPaymentList data={patientData} setActiveDeleteItem={setActiveDeleteItem}
                                    setActiveDelete={setActiveDelete} setActiveEdit={setActiveEdit}
                                    setActiveEditItem={setActiveEditItem}/>

                </div>
                <Pagination
                    totalCount={6}
                    onPageChange={setCurrentPage}
                    currentPage={currentPage}
                    pageSize={10}
                />
                <Modal
                    active={activeEdit}
                    setActive={setActiveEdit}
                    title={"Edit"}
                >

                    <Form extraClass={cls.modal__form} onSubmit={handleSubmit(onEdit)}>
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexDirection: "column",
                            alignItems: 'center',
                            gap: '2rem'
                        }}>
                            {
                                payType?.map(item => {
                                    return (
                                        <Radio
                                            name={item.payment_type}
                                            value={item.id}
                                            onChange={setSelectedRadio}
                                            checked={item.id === selectedRadio}
                                        >
                                            {item.payment_type}
                                        </Radio>
                                    )
                                })
                            }
                            <Button extraClass={cls.modal__button}>
                                Edit
                            </Button>
                        </div>
                    </Form>
                </Modal>
                <DeleteModal active={activeDelete} setActive={() => setActiveDelete(false)} onConfirm={onDelete}/>

            </div>
        </DynamicModuleLoader>
    );
}
