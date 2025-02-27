import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "app/providers/storeProvider";
import {headers} from "shared/api/base";
import {paymentActions} from "../slice/paymentSlice";
import {paymentTypeActions} from "../slice/paymentTypeSlice";
import {givePaymentActions} from "../slice/givePaymentSlice";
import {alertAction} from "entities/alert/model/slice/alertSlice";
import {userPaymentActions} from "../slice/userPaymentSlice";
import {paymentPacketsActions} from "../../../../features/paymentPakets";

interface PaymentProps {
    payment_type: string | undefined,
    user: number | undefined,
    analysis_list: number[]
}

export const fetchUserPaymentList = createAsyncThunk<
    void,
    { selectedBranch: number, search: string },
    ThunkConfig<string>
>('paymentSlice/fetchUserPaymentList', async ({selectedBranch, search}, thunkApi) => {
    const {extra, dispatch, rejectWithValue} = thunkApi;
    try {
        const response = await extra.api({
            url: `user/patient/?branch=${selectedBranch}&search=${search}`,
            method: "GET",
            body: null,
            headers: headers()
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

export const paymentTypeThunk = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>('paymnetTypeSlice/paymentTypeThunk', async (authData, thunkApi) => {
    const {extra, dispatch, rejectWithValue} = thunkApi
    try {
        const response = await extra.api({
            url: `account/payment_types/payment_type/`, method: "GET", body: null, headers: headers()
        })
        if (!response) {
            throw new Error();
        }
        dispatch(paymentTypeActions.onGetPaymentTypeData(response));
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue("error");
    }

})

export const givePaymentThunk = createAsyncThunk<
    void,
    PaymentProps,
    ThunkConfig<string>
>('givePaymentSlice/givePaymentThunk', async (data, thunkApi) => {
    const {extra, dispatch, rejectWithValue} = thunkApi
    try {
        const response = await extra.api({
            url: `account/payment/payment/`, method: "POST", body: JSON.stringify(data), headers: headers()
        })

        dispatch(alertAction.onAddAlertOptions({
            type: "success",
            status: true,
            msg: "Payment done !"
        }))
        dispatch(paymentPacketsActions.deletePaidAnalysis(data?.analysis_list))
        dispatch(givePaymentActions.onAddPayment(response));
        return response.data
    } catch (e) {
        console.log(e)
        return rejectWithValue('error')
    }
})

export const userPaymentThunk = createAsyncThunk<
    void,
    number | undefined,
    ThunkConfig<string>
>('paymnetTypeSlice/userPaymentThunk', async (authData, thunkApi) => {
    const {extra, dispatch, rejectWithValue} = thunkApi
    try {
        const response = await extra.api({
            url: `account/payment/payment_list/${authData}/`, method: "GET", body: null, headers: headers()
        })
        if (!response) {
            throw new Error();
        }
        dispatch(userPaymentActions.onGetUserPaymentData(response));
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue("error");
    }

})

export const userPaymentData = createAsyncThunk<
    void,
    number | undefined,
    ThunkConfig<string>
>('paymnetTypeSlice/userPaymentData', async (authData, thunkApi) => {
    const {extra, dispatch, rejectWithValue} = thunkApi
    try {
        const response = await extra.api({
            url: `account/payment/payment_list/`, method: "GET", body: null, headers: headers()
        })
        if (!response) {
            throw new Error();
        }
        dispatch(userPaymentActions.onGetUserPaymentList(response));
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue("error");
    }

})

