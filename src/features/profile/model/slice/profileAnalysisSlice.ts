import {createSlice} from "@reduxjs/toolkit";
import {IUserProfileAnalysisSchema} from "../types/profileAnalysisTypes";


const initialState: IUserProfileAnalysisSchema = {
    info: {packet: [], analysis_list: []},
    loading: false,
    error: undefined
}

const profileAnalysisSlice = createSlice({
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
                                total: item.total,
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
        }
    },
})

export const {reducer: profileAnalysisReducer} = profileAnalysisSlice
export const {actions: profileAnalysisActions} = profileAnalysisSlice