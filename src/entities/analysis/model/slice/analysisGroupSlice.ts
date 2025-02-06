import {createSlice} from "@reduxjs/toolkit";
import {IAnalysisGroupSchema} from "../types/analysisGroupScheme";
import {fetchAnalysisGroupList} from "../thunk/analysisPackageGroupThunk";



const initialState  : IAnalysisGroupSchema = {
    loading: false,
    data: [],
    error: false
}


const analysisGroupSlice = createSlice({
    name: "analysisGroupSlice",
    initialState,
    reducers: {
        onAnalysisGroup: (state, action) => {
            state.data =  action.payload.results
        },
        onAddAnalysisGroup: (state , action) => {
            state.data = [...state.data, action.payload]
        },
        onEditAnalysisGroup: (state , action) => {
            state.data =  state.data.map(item => {
                if (item.id === action.payload.id) {
                    return action.payload.data
                }
                return item
            })

        },
        onDeleteAnalysisGroup: (state , action) => {
            state.data = state.data.filter(item => item.id !== action.payload)
        },
    },
    extraReducers: builder => builder
        .addCase(fetchAnalysisGroupList.pending , state => {
            state.loading = true
            state.error = false
        })
        .addCase(fetchAnalysisGroupList.fulfilled , state => {
            state.loading = false
            state.error = false

        })
        .addCase(fetchAnalysisGroupList.rejected , state => {
            state.loading = false
            state.error = true
        })
})

export const {reducer: analysisGroupReducer} = analysisGroupSlice
export const {actions: analysisGroupActions} = analysisGroupSlice