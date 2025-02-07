import {useEffect, useState} from 'react';

import {Pagination} from "features/pagination";
// import {
//     fetchPatientList,
//     getPatientData, IPatient,
//     patientActions,
//     PatientHeader,
//     PatientList,
//     patientReducer
// } from "entities/patient";



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
import {DeleteModal} from "../../../features/deleteModal/ui/DeleteModal";
import {headers, useHttp} from "../../../shared/api/base";
import {alertAction} from "../../../features/alert/model/slice/alertSlice";
import {paymentListActions, paymentListReducer} from "../../../entities/allPayment/model/slice/allPaymentSlice";
import {getAllPaymentList} from "../../../entities/allPayment/model/selectors/allPaymentSelector";
import {fetchAllPaymentThunk} from "../../../entities/allPayment/model/thunk/allPaymentThunk";
import {IPatient, patientActions} from "../../../entities/patient";
import {fetchBranchData, getSelectedBranchData, getSelectedLocationData} from "../../../entities/oftenUsed";
import {IAllPayment} from "../../../entities/allPayment/model/types/allPaymentSchema";



const reducers: ReducersList = {
    allPaymentSlice: paymentListReducer
};

const filter = [
    {name: "Paid" , status: "true"},
    {name: "Unpaid" , status: "false"}
]

export const AllPaymentPage = () => {

    const dispatch = useAppDispatch()

    const selectedLocation = useSelector(getSelectedLocationData)
    const selectedBranch = useSelector(getSelectedBranchData)

    const patientData = useSelector(getAllPaymentList)
    const [activeType, setActiveType] = useState("")

    useEffect(() => {
        if (selectedLocation)
            dispatch(fetchBranchData({id: selectedLocation}))
    }, [selectedLocation])


    useEffect(() => {
        if (selectedBranch)
        dispatch(fetchAllPaymentThunk(selectedBranch))
    }, [selectedBranch])

    const {request} = useHttp()

    const [currentPage, setCurrentPage] = useState<number>(1);


    const [activeDelete, setActiveDelete] = useState<boolean>(false)

    const [activeDeleteItem, setActiveDeleteItem] = useState<IAllPayment>({} as IAllPayment)



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
                <AllPaymentHeader filter={filter} setActiveType={setActiveType} activeType={activeType}/>
                <div className={cls.patient__container}>
                    {
                        //@ts-ignore
                        <AllPaymentList data={patientData} setActiveDeleteItem={setActiveDeleteItem}
                                        setActiveDelete={setActiveDelete}/>
                    }

                </div>
                <Pagination
                    totalCount={6}
                    onPageChange={setCurrentPage}
                    currentPage={currentPage}
                    pageSize={10}
                />


                <DeleteModal active={activeDelete} setActive={() => setActiveDelete(false)} onConfirm={onDelete}/>

            </div>
        </DynamicModuleLoader>
    );
}
