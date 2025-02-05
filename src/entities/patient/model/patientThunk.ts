import {createAsyncThunk} from "@reduxjs/toolkit";
import {headers, useHttp} from "shared/api/base";
import {ThunkConfig} from "../../../app/providers/storeProvider";
import {analysisContainerActions} from "../../analysis/model/slice/analysisContainerSlice";
import {patientActions} from "./patientSlice";

export const fetchPatientList = createAsyncThunk<
    void,
    { branchId: number; filter: string },
    ThunkConfig<string>
>('patientSlice/fetchPatientList', async ({ branchId, filter }, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;
    try {
        const response = await extra.api({
            url: `user/patient/list/?branch=${branchId}${filter ? `&filter_paid=${filter}` : ""}`,
            method: "GET",
            body: null,
            headers: headers()
        });

        if (!response) {
            throw new Error();
        }
        dispatch(patientActions.onGetPatient(response));
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});