import {JobSchema} from "shared/types/oftenUsedTypes";


export interface OftenUsedSchemas {
    jobs?: JobSchema[],
    locations?: any,
    error?: "error"
    loading: boolean,
}
