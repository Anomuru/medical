import {createAsyncThunk} from "@reduxjs/toolkit";
import {headers, useHttp} from "shared/api/base";

export const fetchStaffListData = createAsyncThunk(
    "staffSlice/fetchStaffListData",
    () => {
        const {request} = useHttp()
        return request({url: "user/staff/crud/get_list/", headers: headers()})
    }
)

export const deleteStaffData = createAsyncThunk(
    "staffSlice/deleteStaffData",
    ({id}:{id:string}) => {
        const {request} = useHttp()
        return request({url: `user/staff/crud/delete/${id}`, method: "DELETE", headers: headers()})
    }
)
