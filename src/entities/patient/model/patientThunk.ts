import {createAsyncThunk} from "@reduxjs/toolkit";
import {useHttp} from "shared/api/base";

export const fetchPatientData = createAsyncThunk(
    "patientSlice/fetchPatientData",
    () => {
        const {request} = useHttp()
        return request({url: ""})
    }
)