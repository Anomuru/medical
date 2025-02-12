import {createSlice} from "@reduxjs/toolkit";
import {IUserProfileAnalysisSchema} from "../types/profileAnalysisTypes";


const initialState: IUserProfileAnalysisSchema = {
    info: {packet: [], analysis_list: []},
    loading: false,
    error: undefined,
    paymentsData: []
}

const profileSlice = createSlice({
    name: "profileAnalysisSlice",
    initialState,
    reducers: {
        onGetProfileAnalysis: (state, action) => {
            state.info = action.payload.info
        },
        onDeletePacketAnalysis: (state, action) => {
            state.info.packet =
                state.info.packet
                    .map(item => {
                        if (item.packet_id === action.payload.packetId) {
                            return {
                                packet_id: item.packet_id,
                                packet_name: item.packet_name,
                                analysis_list: item.analysis_list
                                    .filter(item =>
                                        item.id !== action.payload.analysisId)
                            }
                        } else return item
                    })
                    // .filter(item => item.analysis_list.length !== 0)
        },
        deletePacket: (state, action) => {
            state.info.packet =
                state.info.packet
                    .filter(item => item.packet_id !== action.payload)
        },
        deleteAnalysis: (state, action) => {
            state.info.analysis_list =
                    state.info.analysis_list
                        .filter(item => item.id !== action.payload)
        },
        deleteAllAnalysis: (state) => {
            state.info.analysis_list = []
        },
        onGetPaymentsData: (state , action) => {
            state.paymentsData = action.payload.results
        },
        onChangePaymentType: (state , action) => {
            console.log(action.payload)
            state.paymentsData = state.paymentsData.map(item => {
                if (item.id === action.payload.id){
                    return action.payload.data
                }
                return item
            })
        },
        onDeletePayments: (state , action) => {
            state.paymentsData = state.paymentsData.filter(item => item.id !== action.payload)
        }
    },
})

export const {reducer: profileAnalysisReducer} = profileSlice
export const {actions: profileAnalysisActions} = profileSlice