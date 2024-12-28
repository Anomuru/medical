import {JobSchema} from "shared/types/oftenUsedTypes";


export interface JobListSchema {
    jobs: JobSchema[],
    isLoading: boolean,
    error?: string
}


