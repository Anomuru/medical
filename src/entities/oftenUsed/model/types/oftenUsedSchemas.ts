import {DoctorSchema, JobSchema} from "shared/types/oftenUsedTypes";


export interface OftenUsedSchemas {
    jobs: JobSchema[],
    doctors: DoctorSchema[],
    error?: "error"
    loading: boolean,
}
