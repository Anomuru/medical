import {DoctorSchema, JobSchema} from "shared/types/oftenUsedTypes";


export interface Device {
    id: number,
    name: string,
    image: string
}







export interface OftenUsedSchemas {
    jobs?: JobSchema[],
    locations?: any,
    branches?: any,
    doctors: DoctorSchema[],
    selectedLocation?: number,
    selectedBranch?: number,
    error?: "error"
    loading: boolean,
    data: []
}
