import {JobSchema} from "shared/types/oftenUsedTypes";


export interface Device {
    id: number,
    name: string,
    image: string
}







export interface OftenUsedSchemas {
    jobs?: JobSchema[],
    error?: "error"
    loading: boolean,
    data: []
}
