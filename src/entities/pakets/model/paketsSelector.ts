import {StateSchema} from "app/providers/storeProvider";

export const getPacketsData = (state:StateSchema) =>
    state.packetsSlice?.data
export const getPacketsLoading = (state:StateSchema) =>
    state.packetsSlice?.loading
export const getPacketsError = (state:StateSchema) =>
    state.packetsSlice?.error