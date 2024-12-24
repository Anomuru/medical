import {StateSchema} from "app/providers/storeProvider";

export const getStaffProfileData = (state: StateSchema) =>
    state.staffProfileSlice.details
export const getStaffId = (state: StateSchema) =>
    state.staffProfileSlice.id
export const getStaffProfileLoading = (state: StateSchema) =>
    state.staffProfileSlice.loading
export const getStaffProfileError = (state: StateSchema) =>
    state.staffProfileSlice.error
