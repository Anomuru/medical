import {StateSchema} from "app/providers/storeProvider";

export const getPaymentData = (state: StateSchema) => state.paymentSlice?.data

export const getPaymentTypeData = (state: StateSchema) => state.paymentTypeSlice?.data
