import {createAsyncThunk} from "@reduxjs/toolkit";
import {API_URL, headers, useHttp} from "shared/api/api";

export const fetchJobListData = createAsyncThunk(
    "workTableSlice/fetchJobListData",
    () => {
        const {request} = useHttp()
        return request(`${API_URL}`, "GET", undefined, headers())
    }
)
