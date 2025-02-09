import {createAsyncThunk} from "@reduxjs/toolkit";
import {headerImg, headers, useHttp} from "shared/api/base";
import {ThunkConfig} from "../../../../app/providers/storeProvider";
import {analysisPackageAction} from "../../../analysis";
import {deviceListActions} from "../slice/deviceListSlice";


export const deviceThunk = createAsyncThunk(
    'deviceSlice/deviceThunk',
    async (data: FormData, { rejectWithValue }) => {
        const { request } = useHttp();
        try {
            const response = await request({
                url: `device/crud/create/`,
                method: "POST",
                body: data,

                headers: headerImg()
            });
            return response;
        } catch (error) {
            return rejectWithValue("Serverga so'rov yuborishda xato ro'y berdi");
        }
    }
);

export const deviceListThunk = createAsyncThunk<
    void,
    number ,
    ThunkConfig<string>
>('analysisPackageSlice/fetchAnalysisPackageList', async (page, thunkApi) => {
    const { extra, dispatch, rejectWithValue  } = thunkApi;
    try {
        const response = await extra.api({
            url: `device/get/list/?offset=${(page-1)*50} `, method: "GET", body: null, headers: headers()
        })


        if (!response) {
            throw new Error();
        }


        dispatch(deviceListActions.onGetDeviceList(response));
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});




// export const deviceListThunk = createAsyncThunk(
//     "deviceListSlice/deviceListThunk",
//     (page: number) => {
//         const {request} = useHttp()
//         return request({url: `device/get/list/?offset=${(page-1)*50}`, method: "GET", headers: headers()})
//     }
// )