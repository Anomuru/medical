import React, {useCallback} from 'react';
import {useSelector} from "react-redux";

import {PacketsUserList} from "entities/pakets";
import {getPaymentPacketsData} from "../model/paymentPacketsSelector";

export const PaymentPackets = () => {

    const data = useSelector(getPaymentPacketsData)

    const onDeletePacket = (id?: number) => {

    }
    
    const onClickPacket = () => {
      
    }

    const onDeleteAnalysis = (id: number) => {
        
    }

    const renderPackets = useCallback(() => {
        return data?.packet.map(item => {
            return (
                <PacketsUserList
                    onDeletePacket={onDeletePacket}
                    onDeleteAnalysis={onDeleteAnalysis}
                    list={item.analysis_list}
                />
            )
        })
    }, [data?.packet])

    return (
        <>
            {renderPackets()}
        </>
    );
}
