import {createAsyncThunk} from "@reduxjs/toolkit";
import {useHttp} from "shared/api/base";

export const fetchAnalysisList = createAsyncThunk(
    "analysisSlice/fetchAnalysisList",
    () => {
        const {request} = useHttp()
        return request({url: ""})
    }
)