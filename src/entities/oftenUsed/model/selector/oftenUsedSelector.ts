import {StateSchema} from "app/providers/storeProvider";

export const getJobsData = (state: StateSchema) =>
    state.oftenUsedSlice?.jobs

export const getDoctorsData = (state: StateSchema) =>
    state.oftenUsedSlice.doctors

export const getLocationsData = (state: StateSchema) =>
    state.oftenUsedSlice?.locations
export const getBranchesData = (state: StateSchema) =>
    state.oftenUsedSlice?.branches
export const getSelectedLocationData = (state: StateSchema) =>
    state.oftenUsedSlice?.selectedLocation
export const getSelectedBranchData = (state: StateSchema) =>
    state.oftenUsedSlice?.selectedBranch
export const getLoading = (state: StateSchema) =>
    state.oftenUsedSlice?.loading
export const getError = (state: StateSchema) =>
    state.oftenUsedSlice?.error
