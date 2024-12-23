import {createSlice} from "@reduxjs/toolkit";

import {StaffSchema} from "../types/staffSchema";
import {fetchStaffListData} from "../thunk/staffThunk";

const initialState: StaffSchema = {
    loading: false,
    data: [],
    error: undefined
}

const staffSlice = createSlice({
    name: "staffSlice",
    initialState,
    reducers: {
        addStaff: (state, action) => {
            state.data = state.data && [action.payload, ...state.data]
        }
    },
    extraReducers: builder =>
        builder
            .addCase(fetchStaffListData.pending, (state) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(fetchStaffListData.fulfilled, (state, action) => {
                // state.data = action.payload
                state.loading = false
                state.error = undefined
            })
            .addCase(fetchStaffListData.rejected, (state) => {
                state.loading = false
                state.error = "error"
            })
})

export default staffSlice.reducer
