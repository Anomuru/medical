import {createAsyncThunk} from "@reduxjs/toolkit";
import {useHttp} from "shared/api/base";

export const fetchStaffProfileData = createAsyncThunk(
    "staffProfileSlice/fetchStaffProfileData",
    // @ts-ignore
    ({id}) => {
        const {request} = useHttp()
        return request({url: `user/staff/crud/get_detail/${id}`})
    }
)
