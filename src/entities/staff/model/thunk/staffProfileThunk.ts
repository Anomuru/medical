import {createAsyncThunk} from "@reduxjs/toolkit";
import {useHttp} from "shared/api/base";

export const fetchStaffProfileData = createAsyncThunk(
    "staffProfileSlice/fetchStaffProfileData",
    ({staffId}: { staffId:number }) => {
        const {request} = useHttp()
        return request({url: `user/staff/crud/get_detail/${staffId}`})
    }
)

export const changeStaffDetails = createAsyncThunk(
    "staffProfileSlice/changeStaffDetails",
    // @ts-ignore
    ({staffId, data}) => {
        const {request} = useHttp()
        return request({url: `user/staff/crud/update_password/${staffId}`, method: "PATCH", body: JSON.stringify(data)})
    }
)
