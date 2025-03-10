import {createSlice} from "@reduxjs/toolkit";
import {IStorageSchema} from "features/storage/model/storageTypes";
import {createStorageThunk, deleteStorageThunk, updateStorageThunk} from "features/storage/model/storageThunk";



const initialState: IStorageSchema = {
    loading: false,
    data: [],
    error: undefined
}

const storageSlice = createSlice({
    name: "storageSlice",
    initialState,
    reducers: {
        onAddPayment: (state, action) => {
            state.data = action.payload
        },
        onEditStorage: (state, action) => {
            state.data = {...state.data, ...action.payload}
        },
        onDeleteStorage: (state, action) => {
            state.data = state.data.filter(item => item.id !== action.payload)
        },
    },
    extraReducers: builder => {
        builder
            .addCase(createStorageThunk.pending, (state) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(createStorageThunk.fulfilled, (state) => {
                state.loading = false
                state.error = "error"
            })
            .addCase(createStorageThunk.rejected, (state) => {
                state.loading = false
                state.error = "error"
            })
            .addCase(updateStorageThunk.pending, (state) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(updateStorageThunk.fulfilled, (state) => {
                state.loading = false
                state.error = "error"
            })
            .addCase(updateStorageThunk.rejected, (state) => {
                state.loading = false
                state.error = "error"
            })
            .addCase(deleteStorageThunk.pending, (state) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(deleteStorageThunk.fulfilled, (state) => {
                state.loading = false
                state.error = "error"
            })
            .addCase(deleteStorageThunk.rejected, (state) => {
                state.loading = false
                state.error = "error"
            })
    }

})

export const {reducer: createStorageReducer} = storageSlice
export const {actions: createStorageActions} = storageSlice