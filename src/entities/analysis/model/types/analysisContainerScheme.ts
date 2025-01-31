
export interface IAnalysisContainer {
    id: number
    name: string
    color: string
    size: string
}

export interface IAnalysisContainerSchema {
    data: IAnalysisContainer[],
    loading: boolean,
    error: boolean
}
