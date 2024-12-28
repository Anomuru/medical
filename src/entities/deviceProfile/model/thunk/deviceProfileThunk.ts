import {createAsyncThunk} from "@reduxjs/toolkit";
import {headers, useHttp} from "shared/api/base";



export const deviceProfileThunk = createAsyncThunk(
    'deviceProfileSlice/deviceProfileThunk',
    async (id) => {
        const {request} = useHttp()
        return await request({url: `device/get/profile/${id}`, method: "GET", headers: headers()})
    }
)

export const deviceProfileUsersThunk = createAsyncThunk(
    'deviceProfileSlice/deviceProfileUsersThunk',
    async (id) => {
        const {request} = useHttp()
        return await request({url: `device/get/user-analysis/${id}`, method: "GET", headers: headers()})
    }
)

export const deviceAnalisThunk = createAsyncThunk(
    'deviceProfileSlice/deviceAnalisThunk',
    async (useId: number | undefined) => {
        const {request} = useHttp()
        return await request({url: `device/get/analysis-result/4`, method: "GET", headers: headers()})
    }
)