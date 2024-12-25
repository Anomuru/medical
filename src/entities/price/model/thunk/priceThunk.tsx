import {createAsyncThunk} from "@reduxjs/toolkit";
import {headers, useHttp} from "shared/api/base";


export const fetchPriceType = createAsyncThunk(
    "priceSlice/fetchPriceType",
    async () => {
        const {request} = useHttp()

        return await request({
            url: "api/analysis/analysis_type/get/list/",
            method: "GET",
            body: undefined,
            headers: headers()
        })
    }
)




export const fetchPriceTypes = createAsyncThunk(
    "priceSlice/fetchPriceTypes",
    async () => {
        const {request} = useHttp()

        return await request({
            url: "api/analysis/analysis_type/get/list/?type=analyses",
            method: "GET",
            body: undefined,
            headers: headers()
        })
    }
)



export const fetchDeviceList = createAsyncThunk(
    "priceSlice/fetchDeviceList",
    async () => {
        const {request} = useHttp()

        return await request({
            url: "api/device/get/list/",
            method: "GET",
            body: undefined,
            headers: headers()
        })
    }
)
