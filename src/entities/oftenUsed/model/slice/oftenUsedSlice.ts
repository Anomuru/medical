import {createSlice} from "@reduxjs/toolkit";
import {OftenUsedSchemas} from "../types/oftenUsedSchemas";
import {fetchJobsData, getDoctorsThunk} from "../thunk/oftenUsedThunk";

const initialState: OftenUsedSchemas = {
    jobs: [],
    doctors: [],
    loading: false,
    error: undefined
}

const oftenUsedSlice = createSlice({
    name: "oftenUsedSlice",
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(fetchJobsData.pending, (state) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(fetchJobsData.fulfilled, (state, action) => {
                state.jobs = action.payload.results
                state.loading = false
                state.error = undefined
            })
            .addCase(fetchJobsData.rejected, (state) => {
                state.loading = false
                state.error = "error"
            })


            .addCase(getDoctorsThunk.pending, (state) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(getDoctorsThunk.fulfilled, (state, action) => {
                state.doctors = action.payload
                state.loading = false
                state.error = undefined
            })
            .addCase(getDoctorsThunk.rejected, (state) => {
                state.loading = false
                state.error = "error"
            })
})

export const {reducer: oftenUsedReducer} = oftenUsedSlice
export const {actions: oftenUsedActions} = oftenUsedSlice


