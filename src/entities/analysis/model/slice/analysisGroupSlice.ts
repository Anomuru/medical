import {createSlice} from "@reduxjs/toolkit";
import {IAnalysisGroupSchema} from "../types/analysisGroupScheme";



const initialState  : IAnalysisGroupSchema = {
    loading: false,
    data: [
        {
            id: 1,
            name: "test",
        }
    ],
    error: false
}


const analysisGroupSlice = createSlice({
    name: "analysisGroupSlice",
    initialState,
    reducers: {
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
            console.log(action.payload)
        },
        onDeleteAnalysisGroup: (state , action) => {
            state.data = state.data.filter(item => item.id !== action.payload)
        },
    },
    extraReducers: builder => {}
})

export const {reducer: analysisGroupReducer} = analysisGroupSlice
export const {actions: analysisGroupActions} = analysisGroupSlice