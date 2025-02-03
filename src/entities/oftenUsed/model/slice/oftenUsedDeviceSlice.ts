import {createSlice} from "@reduxjs/toolkit";
import { oftenUsedDeviceListThunk} from "../thunk/ofternUsedDeviceList";
import {IOftenUsedDeviceListSchema} from "../types/oftenUsedDeviceScheme";





const initialState: IOftenUsedDeviceListSchema = {
    loading: false,
    data: {},
    error: undefined
}

const oftenUsedDeviceSlice = createSlice({
    name: "oftenUsedDeviceSlice",
    initialState,
    reducers: {
        onGetDeviceList: (state, action) => {
           state.data = action.payload
            console.log("ishladi")
        },

        addDevice: (state, action) => {
            console.log(action.payload)


            state.data = {
                // @ts-ignore
                results: [...state.data.results, action.payload],
                next: state.data?.next,
                previous: state.data?.previous,
                count: state.data?.count
            }
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
            .addCase(oftenUsedDeviceListThunk.pending, (state) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(oftenUsedDeviceListThunk.fulfilled, (state, action) => {
                state.loading = false

                state.error = "error"
            })
            .addCase(oftenUsedDeviceListThunk.rejected, (state) => {
                state.loading = false
                state.error = "error"
            })
    }
})

// export const {onDeleteDevice , onEditDevice} = deviceListSlice.actions
//
// export default deviceListSlice.reducer

export const {reducer: oftenUsedDeviceReducer} = oftenUsedDeviceSlice
export const {actions: oftenUsedDeviceAction} = oftenUsedDeviceSlice