import {createSlice} from "@reduxjs/toolkit";
import {OftenUsedSchemas} from "../types/oftenUsedSchemas";
import {fetchJobsData} from "../thunk/oftenUsedThunk";

const initialState: OftenUsedSchemas = {
    jobs: undefined,
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
                console.log("ready")
                state.jobs = action.payload
                state.loading = false
                state.error = undefined
            })
            .addCase(fetchJobsData.rejected, (state) => {
                state.loading = false
                state.error = "error"
            })
})

export default oftenUsedSlice.reducer


