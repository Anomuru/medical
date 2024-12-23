
export interface IWorkTable {
    name: string,
    surname: string,
    job: string,
    phone: string,
    age: number
}

export interface WorkTableSchema {
    data: IWorkTable[],
    loading: true | false,
    error: null | "error"
}
