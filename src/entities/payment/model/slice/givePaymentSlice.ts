import {createSlice} from "@reduxjs/toolkit";
import {paymentTypeThunk} from "../thunk/paymentThunk";
import {IGivePaymentSchema} from "../schema/paymentTypes";


const initialState: IGivePaymentSchema = {
    loading: false,
    data: [],
    error: undefined
}

const givePaymentSlice = createSlice({
    name: "givePaymentSlice",
    initialState,
    reducers: {
        onAddPayment: (state, action) => {
            state.data = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(paymentTypeThunk.pending, (state) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(paymentTypeThunk.fulfilled, (state) => {
                state.loading = false
                state.error = "error"
            })
            .addCase(paymentTypeThunk.rejected, (state) => {
                state.loading = false
                state.error = "error"
            })
    }

})

export const {reducer: givePaymentReducer} = givePaymentSlice
export const {actions: givePaymentActions} = givePaymentSlice