import {StateSchema} from "app/providers/storeProvider";

export const getOverheadSelectType = (state: StateSchema) => state.overheadSlice?.selectType
export const getOverheadData = (state: StateSchema) => state.overheadSlice?.overheadData