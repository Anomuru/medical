import {configureStore} from "@reduxjs/toolkit";

import {workTableSlice} from "entities/workTable";
import {staffSlice} from "entities/staff";
import {oftenUsedSlice} from "entities/oftenUsed";
import {priceSlice} from "../entities/price";

export const store = configureStore({
    reducer: {
        workTableSlice,
        staffSlice,
        oftenUsedSlice,
        priceSlice
    },
    devTools: process.env.NODE_ENV !== "production",
})

