import {createSlice} from "@reduxjs/toolkit";
import {paymentTypeThunk} from "../thunk/paymentThunk";
import {IPaymentTypeSchema} from "../schema/paymentTypes";


const initialState: IPaymentTypeSchema = {
    loading: false,
    data: [],
    error: undefined
}

const paymentTypeSlice = createSlice({
    name: "paymentTypeSlice",
    initialState,
    reducers: {
        onGetPaymentTypeData: (state, action) => {
            state.data = action.payload.results
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

export const {reducer: paymentTypeReducer} = paymentTypeSlice
export const {actions: paymentTypeActions} = paymentTypeSlice