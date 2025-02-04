import {createAsyncThunk} from "@reduxjs/toolkit";
import {header, headers, useHttp} from "shared/api/base";

export const fetchJobsData = createAsyncThunk(
    "oftenUsedSlice/fetchJobsData",
    () => {
        const {request} = useHttp()
        return request({url: "job_info/job_get/job_list/", body: undefined, headers: header()})
    }
)

export const fetchLocationData = createAsyncThunk(
    "oftenUsedSlice/fetchLocationData",
    () => {
        const {request} = useHttp()
        return request({url: "branch_info/location/get/"})
    }
)


