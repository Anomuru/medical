import {StateSchema} from "app/providers/storeProvider";

export const getGroupListData = (state: StateSchema) => state.groupListSlice?.groupListData
export const getGroupListItemData = (state: StateSchema) => state.groupListSlice?.groupListItemData