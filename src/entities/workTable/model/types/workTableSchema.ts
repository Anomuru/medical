
export interface IWorkTable {
    doctor: number,
    date: string,
    from_date: string,
    to_date: string
}

export interface WorkTableSchema {
    data: IWorkTable[],
    loading: true | false,
    error: undefined | "error"
}
