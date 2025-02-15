import {createSlice} from "@reduxjs/toolkit";
import {IPacketsAnalysisSchema} from "./paymentPacketsSchema";
import {fetchPacketsAnalysis} from "./paymentPacketsThunk";

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


