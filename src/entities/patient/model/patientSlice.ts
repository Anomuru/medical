import {createSlice} from "@reduxjs/toolkit";
import {IPatientSchema} from "./patientSchema";
import {fetchPatientData} from "./patientThunk";

const initialState: IPatientSchema = {
    data: undefined,
    loading: false,
    error: undefined
}

const patientSlice = createSlice({
    name: "patientSlice",
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(fetchPatientData.pending, state => {
                state.loading = true
                state.error = undefined
            })
            .addCase(fetchPatientData.fulfilled, (state, action) => {
                state.data = action.payload
                state.loading = false
                state.error = undefined
            })
            .addCase(fetchPatientData.rejected, state => {
                state.loading = false
                state.error = "error"
            })
})

export const {reducer: patientReducer} = patientSlice
export const {actions: patientActions} = patientSlice

