import {createAsyncThunk} from "@reduxjs/toolkit";
import {jobsListActions} from "../slice/jobListSlice";
import {ThunkConfig} from "app/providers/storeProvider";
import {headers} from "shared/api/base";




export const getJobsThunk = createAsyncThunk<
    void,
    null,
    ThunkConfig<string>
>('job/getJobs', async (authData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;
    try {
        const response = await extra.api({
            url: "token/", method: "GET", body: null, headers: headers()
        })


        if (!response) {
            throw new Error();
        }



        dispatch(jobsListActions.addJobsList(response));
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
