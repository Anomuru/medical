import {createSlice} from "@reduxjs/toolkit";
import {userPaymentThunk} from "./paymentThunk";
import {IAllPaymentSchema} from "entities/allPayment/model/types/allPaymentSchema";



const initialState: IAllPaymentSchema = {
    loading: false,
    data: [],
    paymentList: undefined,
    error: undefined
}

const userPaymentSlice = createSlice({
    name: "userPaymentSlice",
    initialState,
    reducers: {
        onGetUserPaymentData: (state, action) => {
            state.data = action.payload.results
            console.log(action.payload.results, 'wssdsdsd')
        },
        onGetUserPaymentList: (state, action) => {
            state.paymentList = action.payload.results
            console.log("user data" , action.payload.results)

        },
    },
    extraReducers: builder => {
        builder
            .addCase(userPaymentThunk.pending, (state) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(userPaymentThunk.fulfilled, (state) => {
                state.loading = false
                state.error = "error"
            })
            .addCase(userPaymentThunk.rejected, (state) => {
                state.loading = false
                state.error = "error"
            })
    }

})

export const {reducer: userPaymentReducer} = userPaymentSlice
export const {actions: userPaymentActions} = userPaymentSlice