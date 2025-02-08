import {StateSchema} from "../../../../app/providers/storeProvider";


export const getAllPaymentList = (state: StateSchema) => state.allPaymentSlice?.data
