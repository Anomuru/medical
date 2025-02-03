export interface IAnalysis {
    name: string,
    code_name: string | number,
    type: string,
    packet: string,
    device: string,
    container: string,
    id: number
}

export interface IAnalysisSchema {
    data: [] | IAnalysis[],
    loading: boolean,
    error?: "error",
    count?: number
}

