import {StateSchema} from "app/providers/storeProvider";

export const getUserPaymentData = (state: StateSchema) => state.userPaymentSlice?.data
export const getUserPaymentList = (state: StateSchema) => state.userPaymentSlice?.paymentList
