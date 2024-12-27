import {createSlice} from "@reduxjs/toolkit";
import {DeviceProfileSchema} from "../types/deviceProfileSchema";
import {
    deviceAnalisThunk,
    deviceProfileThunk,
    deviceProfileUsersThunk
} from "entities/deviceProfile/model/thunk/deviceProfileThunk";


const initialState: DeviceProfileSchema = {
    loading: false,
    data: [],
    users: [],
    analis: [],
    error: undefined
}

const deviceProfileSlice = createSlice({
    name: "deviceProfileSlice",
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(deviceProfileThunk.pending, (state) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(deviceProfileThunk.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
                state.error = "error"
            })
            .addCase(deviceProfileThunk.rejected, (state) => {
                state.loading = false
                state.error = "error"
            })
            .addCase(deviceProfileUsersThunk.pending, (state) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(deviceProfileUsersThunk.fulfilled, (state, action) => {
                state.loading = false
                state.users = action.payload
                state.error = "error"
            })
            .addCase(deviceProfileUsersThunk.rejected, (state) => {
                state.loading = false
                state.error = "error"
            })
            .addCase(deviceAnalisThunk.pending, (state) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(deviceAnalisThunk.fulfilled, (state, action) => {
                state.loading = false
                state.analis = action.payload
                state.error = "error"
            })
            .addCase(deviceAnalisThunk.rejected, (state) => {
                state.loading = false
                state.error = "error"
            })

})

export default deviceProfileSlice.reducer