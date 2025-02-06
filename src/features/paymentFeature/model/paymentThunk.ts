import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "../../../app/providers/storeProvider";
import {headers} from "../../../shared/api/base";
import {analysisContainerActions} from "../../../entities/analysis/model/slice/analysisContainerSlice";
import {paymentActions} from "./paymentSlice";

export const fetchUserPaymentList = createAsyncThunk<
    void,
    { selectedBranch: number, search: string },
    ThunkConfig<string>
>('paymentSlice/fetchUserPaymentList', async ({selectedBranch, search}, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;
    try {
        const response = await extra.api({
            url: `user/patient/?branch=${selectedBranch}&search=${search}`, method: "GET", body: null, headers: headers()
        })
        if (!response) {
            throw new Error();
        }
        dispatch(paymentActions.onGetPaymentData(response));
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});

