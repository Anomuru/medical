import {DoctorSchema, JobSchema} from "shared/types/oftenUsedTypes";


export interface Device {
    id: number,
    name: string,
    image: string
}







export interface OftenUsedSchemas {
    jobs?: JobSchema[],
    locations?: any,
    doctors: DoctorSchema[],
    error?: "error"
    loading: boolean,
    data: []
}
