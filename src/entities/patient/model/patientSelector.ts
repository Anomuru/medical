import {StateSchema} from "app/providers/storeProvider";

export const getPatientData = (state: StateSchema) =>
    state.patientSlice?.data
export const getPatientLoading = (state: StateSchema) =>
    state.patientSlice?.loading
export const getPatientError = (state: StateSchema) =>
    state.patientSlice?.error