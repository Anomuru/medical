import {DoctorSchema, JobSchema} from "shared/types/oftenUsedTypes";


export interface OftenUsedSchemas {
    jobs?: JobSchema[],
    locations?: any,
    branches?: any,
    doctors: DoctorSchema[],
    selectedLocation?: number,
    selectedBranch?: number,
    error?: "error"
    loading: boolean,
}
