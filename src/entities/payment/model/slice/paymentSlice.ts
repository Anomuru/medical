import {createSlice} from "@reduxjs/toolkit";
import {IPaymentSchema} from "../schema/paymentTypes";
import {fetchUserPaymentList} from "../thunk/paymentThunk";

const initialState : IPaymentSchema = {
    loading: false,
    data: [
        {id: 1 , name: "fdsf" , phone_number:"fdsf" , surname:"fds", user_id: 1}
    ],

    error: undefined
}

const paymentSlice = createSlice({
    name: "paymentSlice",
    initialState,
    reducers: {
        onGetPaymentData : (state, action) => {

            state.data = action.payload.results
        },
    },
    // extraReducers: builder => {
    //     builder
    //         .addCase(fetchUserPaymentList.pending, (state) => {
    //             state.loading = true
    //             state.error = undefined
    //         })
    //         .addCase(fetchUserPaymentList.fulfilled, (state) => {
    //             state.loading = false
    //             state.error = "error"
    //         })
    //         .addCase(fetchUserPaymentList.rejected, (state) => {
    //             state.loading = false
    //             state.error = "error"
    //         })
    //
    //         .addCase(fetchUserAnalys.pending, (state) => {
    //             state.loading = true
    //             state.error = undefined
    //         })
    //         .addCase(fetchUserAnalys.pending, (state) => {
    //             state.loading = false
    //             state.error = "error"
    //         })
    //         .addCase(fetchUserAnalys.rejected, (state) => {
    //             state.loading = false
    //             state.error = "error"
    //         })
    // }
})
export const {reducer: paymentReducer} = paymentSlice
export const {actions: paymentActions} = paymentSlice
