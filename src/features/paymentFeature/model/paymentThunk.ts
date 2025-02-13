import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "../../../app/providers/storeProvider";
import {headers, ParamUrl} from "../../../shared/api/base";
import {analysisContainerActions} from "../../../entities/analysis/model/slice/analysisContainerSlice";
import {paymentActions} from "./paymentSlice";
import {paymentTypeActions} from "./paymentTypeSlice";
import {givePaymentActions} from "./givePaymentSlice";
import {alertAction} from "features/alert/model/slice/alertSlice";
import {userPaymentActions} from "features/paymentFeature/model/userPaymentSlice";

interface PaymentProps {
    payment_type: string | undefined,
    user: number | undefined
}

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

export const paymentTypeThunk = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>('paymnetTypeSlice/paymentTypeThunk', async (authData, thunkApi) => {
    const {extra, dispatch, rejectWithValue} = thunkApi
    try{
        const response = await extra.api({
            url: `account/payment_types/payment_type/`, method: "GET", body: null, headers: headers()
        })
        if (!response) {
            throw new Error();
        }
        dispatch(paymentTypeActions.onGetPaymentTypeData(response));
        return response.data;
    }catch (e) {
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
    try{
        const response = await extra.api({
            url: `account/payment/payment/`, method: "POST", body: JSON.stringify(data), headers: headers()
        })

                dispatch(alertAction.onAddAlertOptions({
                    type: "success",
                    status: true,
                    msg: "Payment done !"
                }))
        dispatch(givePaymentActions.onAddPayment(response));
        return response.data
    }catch (e){
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
    try{
        const response = await extra.api({
            url: `account/payment/payment_list/${authData}/`, method: "GET", body: null, headers: headers()
        })
        if (!response) {
            throw new Error();
        }
        dispatch(userPaymentActions.onGetUserPaymentData(response));
        return response.data;
    }catch (e) {
        console.log(e);
        return rejectWithValue("error");
    }

})