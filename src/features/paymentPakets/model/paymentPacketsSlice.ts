import {createSlice} from "@reduxjs/toolkit";
import {IPacketsAnalysisSchema} from "./paymentPacketsSchema";
import {fetchPacketsAnalysis} from "./paymentPacketsThunk";
import {stat} from "fs";

const initialState: IPacketsAnalysisSchema = {
    data: {packet: [], analysis_list: []},
    loading: false,
    error: undefined
}

const paymentPacketsSlice = createSlice({
    name: "paymentPacketsSlice",
    initialState,
    reducers: {
        deletePacket: (state, action) => {
            state.data.packet = state.data.packet
                .filter(item => item.packet_id !== action.payload)
        },
        deletePacketAnalysis: (state, action) => {
            state.data.packet =
                state.data.packet
                    .map(item => {
                        if (item.packet_id === action.payload.packetId) {
                            return {
                                packet_id: item.packet_id,
                                packet_name: item.packet_name,
                                total: item.total,
                                // isChecked: item.isChecked,
                                analysis_list: item.analysis_list
                                    .filter(item =>
                                        item.id !== action.payload.analysisId)
                            }
                        } else return item
                    })
                    .filter(item => item.analysis_list.length !== 0)
        },
        deleteAnalysis: (state, action) => {
            state.data.analysis_list =
                state.data.analysis_list
                    .filter(item => item.id !== action.payload)
                    .length <= 0 ? [] :
                    state.data.analysis_list
                        .filter(item => item.id !== action.payload)
        },
        deleteAllAnalysis: (state) => {
            state.data.analysis_list = []
        },
        onChangePacket: (state, action) => {
            state.data.packet =
                state.data.packet
                    .map(item => {
                        if (item.packet_id === action.payload.id) {
                            return {
                                ...item,
                                analysis_list: item.analysis_list.map(item => ({
                                    ...item,
                                    isChecked: action.payload.status
                                }))
                            }
                        } else return item
                    })
        },
        onChangeAllAnalysis: (state, action) => {
            state.data.analysis_list =
                state.data.analysis_list.map(item => ({...item, isChecked: action.payload}))
        },
        onChangePacketAnalysis: (state, action) => {
            state.data.packet =
                state.data.packet
                    .map(item => {
                        if (item.packet_id === action.payload.packetId) {
                            return {
                                ...item, analysis_list: item.analysis_list.map(item => {
                                    if (item.id === action.payload.id) {
                                        return {...item, isChecked: action.payload.status}
                                    } else return item
                                })
                            }
                        } else return item
                    })
        },
        onChangeAnalysis: (state, action) => {
            state.data.analysis_list =
                state.data.analysis_list.map(item => {
                    if (item.id === action.payload.id) {
                        return {...item, isChecked: action.payload.status}
                    } else return item
                })
        },
        deletePaidAnalysis: (state, action) => {
            state.data.packet =
                state.data.packet
                    .map(item => {
                        return {
                            ...item,
                            analysis_list: item.analysis_list
                                .filter(item => !action.payload.includes(item.id))
                        }
                    })
                    .filter(item => item.analysis_list.length !== 0)
            state.data.analysis_list =
                state.data.analysis_list
                    .filter(item => !action.payload.includes(item.id))
                    .length <= 0 ? [] :
                    state.data.analysis_list
                        .filter(item => !action.payload.includes(item.id))
        }
    },
    extraReducers: builder =>
        builder
            .addCase(fetchPacketsAnalysis.pending, (state) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(fetchPacketsAnalysis.fulfilled, (state, action) => {
                state.data = action.payload
                state.loading = false
                state.error = undefined
            })
            .addCase(fetchPacketsAnalysis.rejected, (state) => {
                state.loading = false
                state.error = "error"
            })
})

export const {reducer: paymentPacketsReducer} = paymentPacketsSlice
export const {actions: paymentPacketsActions} = paymentPacketsSlice


