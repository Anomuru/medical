
export interface IAnalysisPackage {
    id: number
    name: string
}

export interface IAnalysisPackageSchema {
    data: IAnalysisPackage[],
    loading: boolean,
    error: boolean
}
