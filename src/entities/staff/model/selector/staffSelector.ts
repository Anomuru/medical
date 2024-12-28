import {StateSchema} from "app/providers/storeProvider";

export const getStaffListData = (state: StateSchema) =>
    state.staffSlice?.data?.results
export const getStaffLoading = (state: StateSchema) =>
    state.staffSlice?.loading
export const getStaffError = (state: StateSchema) =>
    state.staffSlice?.error
