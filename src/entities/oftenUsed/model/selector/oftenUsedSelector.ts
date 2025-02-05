import {StateSchema} from "app/providers/storeProvider";

export const getJobsData = (state: StateSchema) =>
    state.oftenUsedSlice?.jobs

export const getDoctorsData = (state: StateSchema) =>
    state.oftenUsedSlice.doctors

export const getLocationsData = (state: StateSchema) =>
    state.oftenUsedSlice?.locations
export const getLoading = (state: StateSchema) =>
    state.oftenUsedSlice?.loading
export const getError = (state: StateSchema) =>
    state.oftenUsedSlice?.error
