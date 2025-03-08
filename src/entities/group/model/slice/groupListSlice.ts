import {createSlice} from "@reduxjs/toolkit";
import {GroupListType} from "entities/group/model/type/groupListType";

const initialState: GroupListType = {
    groupListData: [],
    loading: false,
    error: false
}

const groupListSlice = createSlice({
    name: "groupListSlice",
    initialState,
    reducers: {
        getGroupList: (state, action) => {
            state.groupListData = action.payload.results
        }
    },
    extraReducers: builder => {}
})

export const {reducer: groupListReducer} = groupListSlice
export const {actions: groupListActions} = groupListSlice