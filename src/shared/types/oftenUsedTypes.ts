import {IAnalysis} from "entities/analysis";

export interface JobSchema {
    img: string,
    id: number,
    name: string
}

export interface IPackagesWithAnalysis {
    id: number,
    name: string,
    totalPrice: number,
    analysis: IAnalysis[]
}
