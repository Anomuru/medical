import {createSlice} from "@reduxjs/toolkit";
import {OftenUsedSchemas} from "../types/oftenUsedSchemas";
import {fetchJobsData , oftenUsedDeviceListThunk} from "../thunk/oftenUsedThunk";


const initialState: OftenUsedSchemas = {
    jobs: undefined,
    loading: false,
    error: undefined,
    data: []
}

const oftenUsedSlice = createSlice({
    name: "oftenUsedSlice",
    initialState,
    reducers: {
        onGetDeviceList: (state, action) => {
            state.data = action.payload.results
        },

    },
    extraReducers: builder =>
        builder
            .addCase(fetchJobsData.pending, (state) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(fetchJobsData.fulfilled, (state, action) => {
                console.log("ready")
                state.jobs = action.payload.results
                state.loading = false
                state.error = undefined
            })
            .addCase(fetchJobsData.rejected, (state) => {
                state.loading = false
                state.error = "error"
            })


            .addCase(oftenUsedDeviceListThunk.pending, (state) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(oftenUsedDeviceListThunk.fulfilled, (state, action) => {
                state.loading = false

                state.error = "error"
            })
            .addCase(oftenUsedDeviceListThunk.rejected, (state) => {
                state.loading = false
                state.error = "error"
            })
})

export const {reducer: oftenUsedReducer} = oftenUsedSlice
export const {actions: oftenUsedActions} = oftenUsedSlice


