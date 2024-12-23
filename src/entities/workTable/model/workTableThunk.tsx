import {createAsyncThunk} from "@reduxjs/toolkit";
import {headers, useHttp} from "shared/api/base";

export const fetchJobListData = createAsyncThunk(
    "workTableSlice/fetchJobListData",
    () => {
        const {request} = useHttp()
        // return request({url: "", method: "GET", body: undefined, headers: headers()})
    }
)
