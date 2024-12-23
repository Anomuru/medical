
export interface JobSchema {
    id: number,
    name: string
}

export interface OftenUsedSchemas {
    jobs?: JobSchema[],
    error?: "error"
    loading: boolean,
}
