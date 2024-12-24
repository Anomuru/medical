import {configureStore} from "@reduxjs/toolkit";

import {workTableSlice} from "entities/workTable";
import {staffSlice} from "entities/staff";
import {oftenUsedSlice} from "entities/oftenUsed";
import {deviceListSlice} from "../entities/deviceList";
import {deviceSlice} from "entities/device";

export const store = configureStore({
    reducer: {
        workTableSlice,
        staffSlice,
        oftenUsedSlice,
        deviceListSlice,
        deviceSlice
    },
    devTools: process.env.NODE_ENV !== "production",
})