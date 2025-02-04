import {createSlice} from "@reduxjs/toolkit";
import {IPatientSchema} from "./patientSchema";
import {fetchPatientList} from "./patientThunk";

const initialState: IPatientSchema = {
    data: [],
    loading: false,
    error: undefined,
    filter: []
}

const patientSlice = createSlice({
    name: "patientSlice",
    initialState,
    reducers: {
        onGetPatientFilter: (state, action) => {
            state.filter = action.payload.results
        },

        onGetPatient: (state, action) => {
            state.data = action.payload.results
        },
        onDeletePatient: (state, action) => {
            state.data = state.data?.filter(item => item.id !== action.payload)
        }

    },
    extraReducers: builder =>
        builder
            .addCase(fetchPatientList.pending, state => {
                state.loading = true
                state.error = undefined
            })
            .addCase(fetchPatientList.fulfilled, (state, action) => {

                state.loading = false
                state.error = undefined
            })
            .addCase(fetchPatientList.rejected, state => {
                state.loading = false
                state.error = "error"
            })
})

export const {reducer: patientReducer} = patientSlice
export const {actions: patientActions} = patientSlice

