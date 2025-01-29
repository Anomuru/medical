import {createAsyncThunk} from "@reduxjs/toolkit";
import {jobsListActions} from "../slice/jobListSlice";
import {ThunkConfig} from "app/providers/storeProvider";
import {headers} from "shared/api/base";




export const getJobsThunk = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>('job/getJobs', async (authData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;
    try {
        const response = await extra.api({
            url: "job_info/job_get/job_list/", method: "GET", body: null, headers: headers()
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
