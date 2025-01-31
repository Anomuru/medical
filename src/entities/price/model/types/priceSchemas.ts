interface AnalysisSchemas {
    device: string;
    id: number;
    name: string;
    price: string;
    type: number;
}

export interface PriceSchemas{
    id: number
    name: string
    analyses: AnalysisSchemas[]


}

export interface IPriceSchema {
    loading: boolean,
    error: string | null,
    data: PriceSchemas[],
    types: string[],
    device: string[],
    count: number
}

