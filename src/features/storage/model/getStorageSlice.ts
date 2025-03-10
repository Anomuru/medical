import {createSlice} from "@reduxjs/toolkit";
import {IAllStorageSchema} from "features/storage/model/storageTypes";
import {getStorageThunk} from "features/storage/model/storageThunk";



const initialState: IAllStorageSchema = {
    loading: false,
    data: [],
    error: undefined
}

const getStorageSlice = createSlice({
    name: "getStorageSlice",
    initialState,
    reducers: {
        onGetStorageData: (state, action) => {
            state.data = action.payload.results
            console.log(action.payload.results, 'wssdsdsd')
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getStorageThunk.pending, (state) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(getStorageThunk.fulfilled, (state) => {
                state.loading = false
                state.error = "error"
            })
            .addCase(getStorageThunk.rejected, (state) => {
                state.loading = false
                state.error = "error"
            })
    }

})

export const {reducer: ugetStorageReducer} = getStorageSlice
export const {actions: getStorageActions} = getStorageSlice