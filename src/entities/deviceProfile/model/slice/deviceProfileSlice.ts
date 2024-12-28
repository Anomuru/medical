import {createSlice} from "@reduxjs/toolkit";
import {DeviceProfileSchema} from "../types/deviceProfileSchema";
import {
    deviceAnalisThunk,
    deviceProfileThunk,
    deviceProfileUsersThunk
} from "entities/deviceProfile/model/thunk/deviceProfileThunk";


const initialState: DeviceProfileSchema = {
    loading: false,
    data: undefined,
    users: [],
    analis: [],
    error: undefined
}

const deviceProfileSlice = createSlice({
    name: "deviceProfileSlice",
    initialState,
    reducers: {

        onEditName: (state , action) => {
            console.log(action.payload)
            state.data = action.payload
        }

    },
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

// export const {onEditName} = deviceProfileSlice.actions
// export default deviceProfileSlice.reducer

export const {reducer: deviceProfileReducer} = deviceProfileSlice
export const {actions: deviceProfileActions} = deviceProfileSlice