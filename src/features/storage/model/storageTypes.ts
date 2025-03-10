import {IAllPayment} from "entities/allPayment/model/types/allPaymentSchema";

interface IStorage {
    id: number,
    name: string,
    code_name: number
    size: string
    total_number: number
}

export interface IStorageSchema {
    data: IStorage[],
    loading: boolean,
    error?: string
}

interface IAllStorage {
    id: number,
    name: string,
    code_name: number
    size: string
    total_number: number
}



export interface IAllStorageSchema {
    data: IAllStorage[],
    error?: string,
    loading: boolean
}