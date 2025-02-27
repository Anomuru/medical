import {createAsyncThunk} from "@reduxjs/toolkit";
import {headers, useHttp} from "shared/api/base";



export const deviceProfileThunk = createAsyncThunk(
    'deviceProfileSlice/deviceProfileThunk',
    async ({id}:{id: string}) => {
        const {request} = useHttp()
        return await request({url: `device/get/profile/${id}`, method: "GET", headers: headers()})
    }
)

export const deviceProfileUsersThunk = createAsyncThunk(
    'deviceProfileSlice/deviceProfileUsersThunk',
    async ({id}:{id:string}) => {
        const {request} = useHttp()
        return await request({url: `device/get/user-analysis/${id}`, method: "GET", headers: headers()})
    }
)

export const deviceAnalisThunk = createAsyncThunk(
    'deviceProfileSlice/deviceAnalisThunk',
    async ({userId}:{userId:string}) => {
        const {request} = useHttp()
        return await request({url: `device/get/analysis-result/${userId}`, method: "GET", headers: headers()})
    }
)