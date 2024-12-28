import {createSlice} from "@reduxjs/toolkit";
import {DeviceListSchema} from "../types/deviceListSchema";
import {deviceListThunk} from "../thunk/deviceListThunk";
import {deviceThunk} from "../thunk/deviceListThunk";


const initialState: DeviceListSchema = {
    loading: false,
    data: undefined,
    list: [],
    error: undefined
}

const deviceListSlice = createSlice({
    name: "deviceListSlice",
    initialState,
    reducers: {
        addDevice: (state, action) => {
            // state.data = state.data && [action.payload, ...state.data]
        },
        onDeleteDevice: (state, action) => {
            console.log(action.payload)
            state.data = {
                results: state.data?.results?.filter(item => item.id !== action.payload),
                next: state.data?.next,
                previous: state.data?.previous,
                count: state.data?.count
            }
        },
        onEditDevice: (state, action) => {
            console.log(action.payload)
            state.data = {
                results: state.data?.results?.map(item => item.id === action.payload.id ? action.payload : item),
                next: state.data?.next,
                previous: state.data?.previous,
                count: state.data?.count
            }
        },
    },
    extraReducers: builder => {
        builder
            .addCase(deviceListThunk.pending, (state) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(deviceListThunk.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
                console.log(action.payload)
                state.error = "error"
            })
            .addCase(deviceListThunk.rejected, (state) => {
                state.loading = false
                state.error = "error"
            })
            .addCase(deviceThunk.pending, (state) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(deviceThunk.fulfilled, (state,action) => {
                state.loading = false
                state.list = action.payload
                state.error = "error"
            })
            .addCase(deviceThunk.rejected, (state) => {
                state.loading = false
                state.error = "error"
            })
    }
})

export const {onDeleteDevice , onEditDevice} = deviceListSlice.actions

export default deviceListSlice.reducer