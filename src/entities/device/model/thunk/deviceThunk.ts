import { createAsyncThunk } from "@reduxjs/toolkit";
import {headerImg, headers, useHttp} from "shared/api/base";

export const deviceThunk = createAsyncThunk(
    'deviceSlice/deviceThunk',
    async (data: FormData, { rejectWithValue }) => {
        const { request } = useHttp();
        try {
            const response = await request({
                url: `device/crud/create/`,
                method: "POST",
                body: data,
                //@ts-ignore
                headers: headerImg()
            });
            return response;
        } catch (error) {
        return rejectWithValue("Serverga so'rov yuborishda xato ro'y berdi");
        }
    }
);
