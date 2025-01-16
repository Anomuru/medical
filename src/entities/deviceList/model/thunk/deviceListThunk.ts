import {createAsyncThunk} from "@reduxjs/toolkit";
import { headers, useHttp} from "shared/api/base";


export const deviceListThunk = createAsyncThunk(
    "deviceListSlice/deviceListThunk",
    (page: number) => {
        const {request} = useHttp()
        return request({url: `device/get/list/?offset=${(page-1)*50}`, method: "GET", headers: headers()})
    }
)