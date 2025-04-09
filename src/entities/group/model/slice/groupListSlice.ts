import {createSlice} from "@reduxjs/toolkit";
import {GroupListType} from "entities/group/model/type/groupListType";

const initialState: GroupListType = {
    groupListData: [],
    loading: false,
    error: false,
    groupListItemData: [
        {
            name: "dasd",

        }
    ]
}

const groupListSlice = createSlice({
    name: "groupListSlice",
    initialState,
    reducers: {
        getGroupList: (state, action) => {
            state.groupListData = action.payload.results
        },
        onUpdateList : (state , action) => {


            console.log(action.payload)
            // @ts-ignore
            state.groupListData = state.groupListData.map(item => {
                if (item.id === action.payload.id) {
                    return {
                        ...item,
                        status: action.payload.status
                    }

                }
                return item
            })

        }
    },
    extraReducers: builder => {
    }
})

export const {reducer: groupListReducer} = groupListSlice
export const {actions: groupListActions} = groupListSlice