import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "../../../../app/providers/storeProvider";
import {headers} from "../../../../shared/api/base";
import {paymentListActions} from "../slice/allPaymentSlice";



export const fetchAllPaymentThunk  = createAsyncThunk<
    void,
    number,
    ThunkConfig<string>
>("allPaymentSlice/fetchAllPaymentThunk", async (selectedBranch, thunkApi) => {
    const {extra, dispatch, rejectWithValue} = thunkApi;
    try {
        const response = await  extra.api({
            url: `account/payment/payment_list/?branch=${selectedBranch}`,
            method: "GET",
            body: null,
            headers: headers()
        });

        if (!response) {
            throw new Error();
        }
        dispatch(paymentListActions.onGetPayment(response));
        return response.data
    }catch (e) {
        console.log(e)
        return rejectWithValue('error');

    }
})