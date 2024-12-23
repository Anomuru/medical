import {createAsyncThunk} from "@reduxjs/toolkit";
import {header, headers, useHttp} from "shared/api/base";

export const fetchJobsData = createAsyncThunk(
    "oftenUsedSlice/fetchJobsData",
    () => {
        console.log("thunk")
        const {request} = useHttp()
        console.log(request)
        return request({url: "job_info/job_get/job_list/", body: undefined, headers: header()})
    }
)
