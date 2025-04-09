import {StateSchema} from "app/providers/storeProvider";

export const getProfileAnalysis = (state: StateSchema) => state.patientPaymentSlice?.info
export const getProfilePaymentsData = (state: StateSchema) => state.patientPaymentSlice?.paymentsData