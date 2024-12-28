import {JobSchema} from "shared/types/oftenUsedTypes";


export interface OftenUsedSchemas {
    jobs?: JobSchema[],
    error?: "error"
    loading: boolean,
}
