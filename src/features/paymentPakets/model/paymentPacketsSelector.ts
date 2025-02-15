import {StateSchema} from "app/providers/storeProvider";

export const getPaymentPacketsData = (state: StateSchema) =>
    state.paymentPacketsSlice?.data
export const getPaymentPacketsLoading = (state: StateSchema) =>
    state.paymentPacketsSlice?.loading
export const getPaymentPacketsError = (state: StateSchema) =>
    state.paymentPacketsSlice?.error
