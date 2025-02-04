import {createAsyncThunk} from "@reduxjs/toolkit";
import {headers, useHttp} from "shared/api/base";
import {ThunkConfig} from "../../../app/providers/storeProvider";
import {analysisContainerActions} from "../../analysis/model/slice/analysisContainerSlice";
import {patientActions} from "./patientSlice";

export const fetchPatientList = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>('patientSlice/fetchPatientList', async (authData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;
    try {
        const response = await extra.api({
            url: "user/patient/list/", method: "GET", body: null, headers: headers()
        })
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



export const fetchPatientFilter = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>('patientSlice/fetchPatientFilter', async (authData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;
    try {
        const response = await extra.api({
            url: "user/patient/list/", method: "GET", body: null, headers: headers()
        })
        if (!response) {
            throw new Error();
        }
        dispatch(patientActions.onGetPatientFilter(response));
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});

