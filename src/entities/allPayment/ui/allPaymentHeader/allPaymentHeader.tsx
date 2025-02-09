import React, {FC, memo, useEffect, useState} from 'react';



import cls from "./allPaymentHeader.module.sass";
import {Radio} from "shared/ui/radio";
import {IPaymentType} from "features/paymentFeature/model/paymentTypes";
import {useSelector} from "react-redux";
import {fetchBranchData, getSelectedBranchData, getSelectedLocationData} from "entities/oftenUsed";
import {fetchAllPaymentThunk} from "entities/allPayment/model/thunk/allPaymentThunk";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";

interface IPatientFilter {
    filter?: {name: string , status: string}[],
    setActiveType: (arg: string) => void,
    activeType: string
    paymentType?: IPaymentType[]
}


export const AllPaymentHeader: FC<IPatientFilter> = memo(({filter , setActiveType , activeType, paymentType}) => {


    const selectedLocation = useSelector(getSelectedLocationData)
    const selectedBranch = useSelector(getSelectedBranchData)
    const dispatch = useAppDispatch()
    const [selectedRadio, setSelectedRadio] = useState<number>()
    useEffect(() => {
        if (selectedLocation)
            dispatch(fetchBranchData({id: selectedLocation}))
    }, [selectedLocation])
    useEffect(() => {
        if (selectedBranch && selectedRadio)
            dispatch(fetchAllPaymentThunk({branch: selectedBranch, payType: selectedRadio}))
    }, [selectedBranch, selectedRadio])


    return (
        <div className={cls.header}>
            <h1>Payment list</h1>
            <div className={cls.header__filter}>
                {
                    paymentType?.map(item => {
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
            </div>
        </div>
    );
})
