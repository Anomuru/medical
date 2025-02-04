import {createSlice} from "@reduxjs/toolkit";
import {IAnalysisSchema} from "../types/analysisSchema";

const initialState: IAnalysisSchema = {
    data: [],
    loading: false,
    error: undefined,
    count: 0
}

const analysisSlice = createSlice({
    name: "analysisSlice",
    initialState,
    reducers: {
        onGetAnalysis: (state, action) => {
            state.data = action.payload.results
            state.count = action.payload.count
        },

        createAnalysis: (state, action) => {
            state.data = [...state.data, action.payload]
        },
          editAnalysis: (state, action) => {
            state.data =  state.data.map(item => {
                if (item.id === action.payload.id) {
                    return action.payload.data
                }
                return item
            })
            console.log(action.payload)
        },
        deleteAnalysis: (state, action) => {
            state.data = state.data.filter(item => item.id !== action.payload)
        },
    }
})

export const {reducer: analysisReducer} = analysisSlice
export const {actions: analysisActions} = analysisSlice
