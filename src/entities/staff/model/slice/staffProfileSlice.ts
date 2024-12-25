import {createSlice} from "@reduxjs/toolkit";
import {StaffProfileSchema} from "../types/staffSchema";
import {changeStaffDetails, fetchStaffProfileData} from "../thunk/staffProfileThunk";

const initialState: StaffProfileSchema = {
    id: NaN,
    details: undefined,
    error: undefined,
    loading: false
}

const staffProfileSlice = createSlice({
    name: "staffProfileSlice",
    initialState,
    reducers: {
        getStaffProfileId: (state, action) => {
            console.log(action.payload, "id")
            state.loading = true
            state.id = action.payload
        }
    },
    extraReducers: builder =>
        builder
            .addCase(fetchStaffProfileData.pending, (state) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(fetchStaffProfileData.fulfilled, (state, action) => {
                state.details = action.payload
                state.loading = false
                state.error = undefined
            })
            .addCase(fetchStaffProfileData.rejected, (state) => {
                state.loading = false
                state.error = "error"
            })
            .addCase(changeStaffDetails.pending, (state) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(changeStaffDetails.fulfilled, (state, action) => {
                state.details = action.payload
                state.loading = false
                state.error = undefined
            })
            .addCase(changeStaffDetails.rejected, (state) => {
                state.loading = false
                state.error = "error"
            })
})

export default staffProfileSlice.reducer
export const {
    getStaffProfileId
} = staffProfileSlice.actions

