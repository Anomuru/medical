import {WorkTableSchema} from "entities/workTable";
import {StaffListSchema, StaffProfileSchema} from "entities/staff";
import {OftenUsedSchemas} from "entities/oftenUsed";

export interface StateSchema {
    workTableSlice: WorkTableSchema,
    staffSlice: StaffListSchema,
    staffProfileSlice: StaffProfileSchema,
    oftenUsedSlice: OftenUsedSchemas
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

