import {StateSchema} from "app/providers/storeProvider";

export const getJobsData = (state: StateSchema) =>
    state.oftenUsedSlice?.jobs
export const getLoading = (state: StateSchema) =>
    state.oftenUsedSlice?.loading
export const getError = (state: StateSchema) =>
    state.oftenUsedSlice?.error


export const getOftenDevice = (state: StateSchema) => state.oftenUsedSlice?.data