import {createSlice} from "@reduxjs/toolkit";
import {IPaymentPacketSchema} from "../schema/paymentPacketSchema";

const initialState: IPaymentPacketSchema = {
    selectedAnalysis: [],
    loading: false,
    error: undefined
}

const paymentPacketSlice = createSlice({
    name: "paymentPacketSlice",
    initialState,
    reducers: {
        getSelectedAnalysis: (state, action: { payload: { packetId: number, analysisIdes: number[] } }) => {
            console.log(action.payload, "selected slice change")
            state.selectedAnalysis =
                state.selectedAnalysis?.map(item => {
                    if (item.packetId === action.payload.packetId) {
                        return action.payload
                    }
                    return item
                })
        },
        addSelectedAnalysis: (state, action) => {
            console.log(action.payload, "selected slice add")
            state.selectedAnalysis =
                [action.payload, ...state.selectedAnalysis]
        },
        deleteSelectedAnalysis: (state, action) => {
            state.selectedAnalysis =
                state.selectedAnalysis?.map(item => {
                    if (item.packetId === action.payload.packetId) {
                        return action.payload
                    }
                    return item
                })
        }
    }
})

export const {reducer: paymentPacketReducer} = paymentPacketSlice
export const {actions: paymentPacketActions} = paymentPacketSlice