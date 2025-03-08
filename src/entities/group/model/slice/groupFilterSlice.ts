import {createSlice} from "@reduxjs/toolkit";
import {GroupFilterTypes} from "entities/group/model/type/groupFilterTypes";

const initialState : GroupFilterTypes = {
    filterSelectResearch: [],
    filterSelectWorkplace: [],
    filterRadioItem :[
        {id: 1 , name: "Tasdiqlangan"},
        {id: 2 , name: "Tasdiqlanmagan"},
        {id: 3 , name: "Tayyormas"},
        {id: 4 , name: "Hammasi"},
    ],
    loading: false,
    error: undefined
}


const groupFilterSlice = createSlice({
    name: "groupFilterSlice",
    initialState,
    reducers: {
        getFilterSelectResearch: (state , action) => {
            state.filterSelectResearch = action.payload
        },
        getFilterSelectWorkplace: (state , action) => {
            state.filterSelectWorkplace = action.payload
        },
        getFilterRadioItem: (state , action) => {
            state.filterRadioItem = action.payload
        },

    },
    extraReducers: builder => {}
})

export const {reducer: groupFilterReducer} = groupFilterSlice
export const {actions: groupFilterActions} = groupFilterSlice