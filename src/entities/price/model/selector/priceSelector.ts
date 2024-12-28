import {StateSchema} from "app/providers/storeProvider";

export const getPriceType = (state: StateSchema) => state.priceSlice?.data
export const getPriceTypes = (state: StateSchema) => state.priceSlice?.types
export const getPriceDevice = (state: StateSchema) => state.priceSlice?.device



