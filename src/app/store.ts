import {configureStore} from "@reduxjs/toolkit";

import {workTableSlice} from "entities/workTable"

export const store = configureStore({
    reducer: {
        workTableSlice
    },
    devTools: process.env.NODE_ENV !== "production",
})