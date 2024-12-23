import {createAsyncThunk} from "@reduxjs/toolkit";
import {headers, useHttp} from "shared/api/base";

export const fetchStaffListData = createAsyncThunk(
    "staffSlice/fetchStaffListData",
    () => {
        const {request} = useHttp()
        // return request({url: "", headers: headers()})
    }
)

export const deleteStaffData = createAsyncThunk(
    "staffSlice/deleteStaffData",
    // @ts-ignore
    ({id}) => {
        const {request} = useHttp()
        // return request({url: "", method: "DELETE", headers: headers()})
    }
)
