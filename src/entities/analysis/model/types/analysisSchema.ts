export interface IAnalysis {
    name: string,
    code_name: string | number,
    group: string,
    package: string,
    device: string,
    container: string
}

export interface IAnalysisSchema {
    data: IAnalysis[],
    loading: boolean,
    error: null | "error"
}

