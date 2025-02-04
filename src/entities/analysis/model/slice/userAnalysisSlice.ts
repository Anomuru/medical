import {createSlice} from "@reduxjs/toolkit";
import {IUserAnalysisSchema} from "../types/userAnalysisSchema";
import {fetchUserAnalys} from "../thunk/userAnalysisThunk";

const initialState: IUserAnalysisSchema  = {
    loading: false,
    //@ts-ignore
    info: { packet: [], analysis_list: [] },
    error: undefined
}

const userAnalysisSlice = createSlice({
    name: "userAnalysisSlice",
    initialState,
    reducers: {
        onGetAnalysis : (state, action) => {
            console.log(action.payload, "daa")
            state.info = action.payload

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