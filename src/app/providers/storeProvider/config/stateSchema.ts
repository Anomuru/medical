
import {userReducer, UserSchema} from "entities/user";
import {EnhancedStore, Reducer, ReducersMapObject} from "@reduxjs/toolkit";
import {OftenUsedSchemas} from "entities/oftenUsed";
import {StaffListSchema, StaffProfileSchema} from "entities/staff";
import {DeviceListSchema} from "entities/deviceList";
import {LoginSchema} from "pages/logInPage";
import {JobListSchema} from "entities/jobList/model/types/jobListSchema";
import {DeviceProfileSchema} from "entities/deviceProfile";
import {IPriceSchema} from "entities/price/model/types/priceSchemas";
import {
    IAnalysisSchema,
    IAnalysisContainerSchema,
    IAnalysisGroupSchema
} from "entities/analysis";
import {IAnalysisPackageSchema} from "entities/analysis/model/types/analysisPackageScheme";
import {IAlertState} from "features/alert/model/slice/alertSlice";
import {IPatientSchema} from "entities/patient";

import {IPacketsSchema} from "entities/pakets";
import {IGivePaymentSchema, IPaymentSchema, IPaymentTypeSchema} from "features/paymentFeature/model/paymentTypes";
import {WorkTableSchema} from "features/workTable";
import {IUserAnalysisSchema} from "entities/analysis/model/types/userAnalysisSchema";
import {IUserProfileAnalysisSchema} from "features/profile/model/types/profileAnalysisTypes";
import {IAllPaymentSchema} from "entities/allPayment/model/types/allPaymentSchema";
import {IPaymentPacketSchema} from "entities/payment";


export interface StateSchema {

    user: UserSchema;
    oftenUsedSlice: OftenUsedSchemas;
    // branchSlice?: BranchSchema;
    workTableSlice?: WorkTableSchema;
    staffSlice?: StaffListSchema;
    staffProfileSlice?: StaffProfileSchema;
    deviceListSlice?: DeviceListSchema;
    loginForm?: LoginSchema;
    jobList?: JobListSchema;
    paymentTypeSlice?: IPaymentTypeSchema
    givePaymentSlice?: IGivePaymentSchema;
    paymentSlice?: IPaymentSchema,


    deviceProfileSlice?: DeviceProfileSchema;
    priceSlice?: IPriceSchema;

    analysisContainerSlice?: IAnalysisContainerSchema,
    analysisGroupSlice?: IAnalysisGroupSchema,
    analysisPackageSlice?: IAnalysisPackageSchema
    analysisSlice?: IAnalysisSchema,
    AlertSlice?: IAlertState
    patientSlice?: IPatientSchema,
    packetsSlice?: IPacketsSchema,
    userAnalysisSlice?: IUserAnalysisSchema,
    profileAnalysisSlice?: IUserProfileAnalysisSchema
    allPaymentSlice?: IAllPaymentSchema,
    paymentPacketSlice?: IPaymentPacketSchema,
    userPaymentSlice?: IAllPaymentSchema

}

// export interface ReducerManager {
//     getReducerMap: () => ReducersMapObject<StateSchema>;
//     reduce: (
//         state: StateSchema,
//         action: AnyAction,
//     ) => CombinedState<StateSchema>;
//     add: (key: StateSchemaKey, reducer: Reducer) => void;
//     remove: (key: StateSchemaKey) => void;
//     // true - вмонтирован, false - демонтирован
//     getMountedReducers: () => MountedReducers;
// }


export type StateSchemaKey = keyof StateSchema;

type CustomCombinedState<T> = {
    [K in keyof T]: Exclude<T[K], undefined>;  // Remove `undefined` from each slice's types
};

export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;  // Retrieves the map of reducers
    reduce: (state: StateSchema, action: any) => CustomCombinedState<StateSchema>;  // Reducer function
    add: (key: StateSchemaKey, reducer: Reducer) => void;  // Adds a reducer
    remove: (key: StateSchemaKey) => void;  // Removes a reducer
    getMountedReducers: () => MountedReducers;  // Gets the mounted reducers
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: any;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: any;
    state: StateSchema;
}
