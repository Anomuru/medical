import {createSlice} from "@reduxjs/toolkit";
import {IPaymentSchema} from "./paymentTypes";

const initialState : IPaymentSchema = {
    loading: false,
    data: [
        {id: 1 , name: "fdsf" , phone_number:"fdsf" , surname:"fds", user_id: 1}
    ],
    error: false
}

const paymentSlice = createSlice({
    name: "paymentSlice",
    initialState,
    reducers: {
        onGetPaymentData : (state, action) => {
            state.data = action.payload.results
        }
    }
})
export const {reducer: paymentReducer} = paymentSlice
export const {actions: paymentActions} = paymentSlice
