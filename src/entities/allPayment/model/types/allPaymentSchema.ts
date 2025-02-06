
export interface IAllPayment {
    id: number,
    name: string,
    surname: string,
    payment_type: number,
}


export interface IAllPaymentProps {
    results: IAllPayment[]
    count: number
    next: string
    previous?: string
}

export interface IAllPaymentSchema {
    data: IAllPaymentProps[],
    error?: string,
    loading: boolean
}