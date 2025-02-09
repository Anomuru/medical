import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "app/providers/storeProvider";
import {headers} from "shared/api/base";
import {jobsListActions} from "entities/jobList";
import {alertAction} from "features/alert/model/slice/alertSlice";

interface addJobProps {
    name: string,
    has_client: boolean
}


export const addJobThunk = createAsyncThunk<
    void,
    addJobProps,
    ThunkConfig<string>
>('job/addJob', async (authData, thunkApi) => {
    const {extra, dispatch, rejectWithValue} = thunkApi;
    try {
        const response = await extra.api({
            url: "job_info/job_crud/create/",
            method: "POST",
            body: JSON.stringify(authData),
            headers: headers()
        })


        if (!response) {
            throw new Error();
        }


        dispatch(jobsListActions.addJob(response));
        dispatch(alertAction.onAddAlertOptions({
            type: "success",
            status: true,
            msg: "Muvaffaqiyatli yaratildi"
        }))
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
