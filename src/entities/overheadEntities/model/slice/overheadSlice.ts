import {createSlice} from "@reduxjs/toolkit";
import {OverheadInterface} from "entities/overheadEntities/model/types/overheadType";


const initialState: OverheadInterface   ={
    loading: false,
    selectType: [],
    error: false,
    overheadData: []
}

export const overheadSlice = createSlice({
    name: "overheadSlice",
    initialState,
    reducers: {
        onGetOverhead: (state, action) => {
            state.overheadData = action.payload.results
        },
        onGetOverheadType: (state , action) => {
            state.selectType = action.payload.results
        },
        onAddOverhead: (state , action) => {
            state.overheadData = [...state.overheadData , action.payload]
        },
        onDeleteOverhead: (state , action) => {
            console.log(action.payload)
            state.overheadData = state.overheadData.filter(item => item.id !== action.payload)
        },
        onChangeOverhead: (state , action) => {
            console.log(action.payload)
            state.overheadData = state.overheadData.map(item => {
                if (item.id === action.payload.id) {
                    return action.payload.data
                }
                return item
            })
        }

    }
})

export const { actions: overheadAction } = overheadSlice;
export const { reducer: overheadReducer } = overheadSlice;