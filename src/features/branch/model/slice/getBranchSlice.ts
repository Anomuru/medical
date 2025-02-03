import {createSlice} from "@reduxjs/toolkit";
import {BranchSchema} from "../../types/branchSchema";
import {getBranchThunk} from "../thunk/getBranchThunk";

const initialState: BranchSchema = {
    loading: false,
    data: {},
    error: undefined
}

const branchSlice = createSlice({
    name: "branchSlice",
    initialState,
    reducers: {
        onGetBranch: (state, action) => {
            state.data = action.payload
            console.log("ishladi")
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getBranchThunk.pending, (state) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(getBranchThunk.fulfilled, (state, action) => {
                state.loading = false
                state.error = "error"
            })
            .addCase(getBranchThunk.rejected, (state) => {
                state.loading = false
                state.error = "error"
            })
    }
})

export const {reducer: branchReducers} = branchSlice
export const {actions: branchAction} = branchSlice