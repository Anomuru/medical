import {createSlice} from "@reduxjs/toolkit";
import {IAnalysisPackageSchema} from "../types/analysisPackageScheme";
import {fetchAnalysisPackageList} from "../thunk/analysisPackage";


const initialState : IAnalysisPackageSchema = {
    data: [],
    loading: false,
    error: false
}

const analysisPackageSlice = createSlice({
    name: "analysisPackageSlice",
    initialState,
    reducers: {
        onAddAnalysisPackage: (state, action) => {
            state.data =  [...state.data, action.payload]
        },
        onEditAnalysisPackage: (state, action) => {
            state.data = state?.data?.map(item => {
                if (item.id === action.payload.id) {
                    return action.payload.data
                }
                return item
            })
        },
        onDeleteAnalysisPackage: (state, action) => {
            state.data = state.data.filter(item => item.id !== action.payload)
        },

    },
    extraReducers: builder =>
        builder
            .addCase(fetchAnalysisPackageList.pending , state => {
                state.loading = true
                state.error = false
            })
            .addCase(fetchAnalysisPackageList.fulfilled , (state , action) => {
                state.loading = false
                state.error = false
            })
            .addCase(fetchAnalysisPackageList.rejected , state => {
                state.loading = false
                state.error = true
            })
})

export const {reducer: analysisPackageReducer} = analysisPackageSlice
export const {actions: analysisPackageAction} = analysisPackageSlice
