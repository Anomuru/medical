import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "app/providers/storeProvider";
import {alertAction} from "features/alert/model/slice/alertSlice";
import {headers} from "shared/api/base";
import {createStorageActions} from "features/storage/model/storageSlice";
import {getStorageActions} from "features/storage/model/getStorageSlice";

interface StorageProps {
    name: string,
    code_name: number
    size: string
    total_number: number
}

interface EStorageProps {
    name: string;
    size: string;
    overall_count: number;
    storage: number | undefined
    payment_id: number
    price: number
    date: string

}

export const createStorageThunk = createAsyncThunk<
    void,
    StorageProps,
    ThunkConfig<string>
    >("storageSlice/createStorageThunk", async (data, thunkApi) => {
    const {extra, dispatch, rejectWithValue} = thunkApi
    try{
        const response = await extra.api({
            url: `account/storage/storages/`, method: "POST", body: JSON.stringify(data), headers: headers()
        })

        dispatch(alertAction.onAddAlertOptions({
            type: "success",
            status: true,
            msg: "Storage done !"
        }))
        dispatch(createStorageActions.onAddPayment(response));
        return response.data
    }catch (e){
        console.log(e)
        return rejectWithValue('error')
    }
})


export const getStorageThunk = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>('getStorageSlice/getStorageThunk', async (_, thunkApi) => {
    const {extra, dispatch, rejectWithValue} = thunkApi
    try{
        const response = await extra.api({
            url: `account/storage/storages/`, method: "GET", body: null, headers: headers()
        })
        if (!response) {
            throw new Error();
        }
        dispatch(getStorageActions.onGetStorageData(response));
        return response.data;
    }catch (e) {
        console.log(e);
        return rejectWithValue("error");
    }

})

export const updateStorageThunk = createAsyncThunk<
    void,
    { data: EStorageProps},
    ThunkConfig<string>
>("storageSlice/uptadeStorageThunk", async (authData, thunkApi) => {
    const {extra, dispatch, rejectWithValue} = thunkApi
    try{
        const response = await extra.api({
            url: `overheads/?from_storage=True/`, method: "POST", body: JSON.stringify(authData.data), headers: headers()
        })

        dispatch(alertAction.onAddAlertOptions({
            type: "success",
            status: true,
            msg: "Storage edited !"
        }))
        dispatch(createStorageActions.onEditStorage(response));
        return response.data
    }catch (e){
        console.log(e)
        return rejectWithValue('error')
    }
})

export const deleteStorageThunk = createAsyncThunk<
    void,
    number | undefined,
    ThunkConfig<string>
>("storageSlice/deleteStorageThunk", async (authData, thunkApi) => {
    const {extra, dispatch, rejectWithValue} = thunkApi
    try{
        const response = await extra.api({
            url: `account/storage/storages/${authData}/`, method: "DELETE", body: null, headers: headers()
        })

        dispatch(alertAction.onAddAlertOptions({
            type: "success",
            status: true,
            msg: "Storage edited !"
        }))
        dispatch(createStorageActions.onDeleteStorage(response));
        return response.data
    }catch (e){
        console.log(e)
        return rejectWithValue('error')
    }
})