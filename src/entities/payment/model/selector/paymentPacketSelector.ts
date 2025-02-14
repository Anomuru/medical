import {StateSchema} from "app/providers/storeProvider";

export const getPaymentPacketSelected = (state: StateSchema) =>
    state.paymentPacketSlice?.selectedAnalysis
export const getPaymentPacketLoading = (state: StateSchema) =>
    state.paymentPacketSlice?.loading
export const getPaymentPacketError = (state: StateSchema) =>
    state.paymentPacketSlice?.error
