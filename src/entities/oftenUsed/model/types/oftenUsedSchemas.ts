import {DoctorSchema, JobSchema} from "shared/types/oftenUsedTypes";


export interface OftenUsedSchemas {
    jobs?: JobSchema[],
    locations?: any,
    doctors: DoctorSchema[],
    error?: "error"
    loading: boolean,
}
