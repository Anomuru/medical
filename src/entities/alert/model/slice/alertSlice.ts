import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IAlertState, AlertType} from "../schema/alertSchema";

const initialState: IAlertState = {
    alert: [],
    loading: false,
    error: null,
};

const AlertSlice = createSlice({
    name: "AlertSlice",
    initialState,
    reducers: {
        onAddAlertOptions: (state, action: PayloadAction<AlertType>) => {
            state.alert = [action.payload];
        },
        onAddMultipleAlertOptions: (state, action: PayloadAction<AlertType[]>) => {
            state.alert = action.payload;
        },
        onDeleteAlert: (state, action: PayloadAction<{ index: number }>) => {
            state.alert = state.alert.map((item, index) => {
                if (index === action.payload.index) {
                    return {...item, status: false};
                }
                return item;
            });
        },
    },

});

export const {reducer: alertReducer} = AlertSlice
export const {actions: alertAction} = AlertSlice
