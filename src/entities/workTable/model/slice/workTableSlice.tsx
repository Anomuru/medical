import {createSlice} from "@reduxjs/toolkit";
import {WorkTableSchema} from "../types/workTableSchema";
import {workTableThunk} from "../thunk/workTableThunk";

const initialState: WorkTableSchema = {
    data: [],
    loading: false,
    error: undefined
}

const workTableSlice = createSlice({
    name: "workTableSlice",
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(workTableThunk.pending, (state) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(workTableThunk.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
                state.error = "error"
            })
            .addCase(workTableThunk.rejected, (state) => {
                state.loading = false
                state.error = "error"
            })
})

export const { actions: workTableActions } = workTableSlice;
export const { reducer: workTableReducer } = workTableSlice;
