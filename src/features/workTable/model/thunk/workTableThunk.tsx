import {createAsyncThunk} from "@reduxjs/toolkit";
import {headers, useHttp} from "shared/api/base";
import {IWorkTable} from "../types/workTableSchema";
import {ThunkConfig} from "app/providers/storeProvider";
import {jobsListActions} from "entities/jobList";

export const workTableThunk = createAsyncThunk(
    "workTableSlice/workTableThunk",
    async (data) => {
        const {request} = useHttp()
        return await request({url: "user_request/crud/create/", method: "POST", body: JSON.stringify(data), headers: headers()})
    }
)


