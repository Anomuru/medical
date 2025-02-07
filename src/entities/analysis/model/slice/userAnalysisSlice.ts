import {createSlice} from "@reduxjs/toolkit";
import {IUserAnalysisSchema} from "../types/userAnalysisSchema";
import {fetchUserAnalys} from "../thunk/userAnalysisThunk";

const initialState: IUserAnalysisSchema = {
    loading: false,
    info: {packet: [], analysis_list: []},
    error: undefined
}

const userAnalysisSlice = createSlice({
    name: "userAnalysisSlice",
    initialState,
    reducers: {
        onGetAnalysis: (state, action) => {
            state.info = action.payload.info
        },
        deletePacketAnalysis: (state, action) => {
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
                    .filter(item => item.analysis_list.length !== 0)
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
                    .length <= 0 ? [] :
                    state.info.analysis_list
                        .filter(item => item.id !== action.payload)
        },
        deleteAllAnalysis: (state) => {
            state.info.analysis_list = []
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchUserAnalys.pending, (state) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(fetchUserAnalys.fulfilled, (state, action) => {
                state.loading = false
                state.error = "error"
            })
            .addCase(fetchUserAnalys.rejected, (state) => {
                state.loading = false
                state.error = "error"
            })
    }
})

export const {reducer: userAnalysisReducer} = userAnalysisSlice
export const {actions: userAnalysisActions} = userAnalysisSlice