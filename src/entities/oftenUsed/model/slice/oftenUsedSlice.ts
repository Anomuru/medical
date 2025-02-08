import {createSlice} from "@reduxjs/toolkit";
import {OftenUsedSchemas} from "../types/oftenUsedSchemas";
import {
    fetchJobsData,
    getDoctorsThunk,
    fetchLocationData,
    fetchBranchData,
    oftenUsedDeviceListThunk
} from "../thunk/oftenUsedThunk";

const initialState: OftenUsedSchemas = {
    jobs: [],
    doctors: [],
    locations: [],
    branches: [],
    selectedLocation: undefined,
    selectedBranch: undefined,
    loading: false,
    error: undefined,
    data: []
}

const oftenUsedSlice = createSlice({
    name: "oftenUsedSlice",
    initialState,
    reducers: {
        fetchSelectedLocation: (state, action) => {
            state.selectedLocation = action.payload
        },
        onBranch: (state, action) => {
            state.selectedBranch = action.payload
            console.log(action.payload, 'bracccccc')
        },

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
            .addCase(fetchLocationData.pending, (state) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(fetchLocationData.fulfilled, (state, action) => {
                state.locations = action.payload.results
                state.loading = false
                state.error = undefined
            })
            .addCase(fetchLocationData.rejected, (state) => {
                state.loading = false
                state.error = "error"
            })
            .addCase(fetchBranchData.pending, (state) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(fetchBranchData.fulfilled, (state, action) => {
                state.branches = action.payload
                state.loading = false
                state.error = undefined
            })
            .addCase(fetchBranchData.rejected, (state) => {
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


