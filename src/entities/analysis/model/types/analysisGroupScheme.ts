
export interface IAnalysisGroup {
    id: number
    name: string
}

export interface IAnalysisGroupSchema {
    data: IAnalysisGroup[],
    loading: boolean,
    error: boolean
}
