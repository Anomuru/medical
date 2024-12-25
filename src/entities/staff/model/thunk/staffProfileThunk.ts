import {createAsyncThunk} from "@reduxjs/toolkit";
import {useHttp} from "shared/api/base";

export const fetchStaffProfileData = createAsyncThunk(
    "staffProfileSlice/fetchStaffProfileData",
    // @ts-ignore
    ({staffId}) => {
        const {request} = useHttp()
        return request({url: `user/staff/crud/get_detail/${staffId}`})
    }
)

export const changeStaffDetails = createAsyncThunk(
    "staffProfileSlice/changeStaffDetails",
    // @ts-ignore
    ({staffId}) => {
        const {request} = useHttp()
        return request({url: `user/staff/crud/update/${staffId}`, method: "PATCH"})
    }
)
