import {createSlice} from "@reduxjs/toolkit";
import {IAllPaymentSchema} from "../types/allPaymentSchema";
import {fetchAllPaymentThunk} from "../thunk/allPaymentThunk";



const initialState: IAllPaymentSchema = {
    data: [],
    loading: false,
    error: undefined
}


const allPaymentSlice = createSlice({
    name: "allPaymentSlice",
    initialState,
    reducers: {
        onGetPayment: (state, action) => {
            state.data = action.payload.results
        },
        onDeletePayment: (state, action) => {
            state.data = state.data?.filter(item => item.id !== action.payload)
        }

    },
    extraReducers: builder => {
        builder
            .addCase(fetchAllPaymentThunk.pending, (state) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(fetchAllPaymentThunk.fulfilled, (state) => {
                state.loading = false
                state.error = "error"
            })
            .addCase(fetchAllPaymentThunk.rejected, (state) => {
                state.loading = false
                state.error = "error"
            })
    }
})

export const {reducer: paymentListReducer} = allPaymentSlice
export const {actions: paymentListActions} = allPaymentSlice