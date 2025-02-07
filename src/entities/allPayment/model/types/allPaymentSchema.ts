
export interface IAllPayment {
    id: number,
    amount: number,
    user: string,
    date: string
    payment_type: number,
}


export interface IAllPaymentProps {
    results: IAllPayment[]
    count: number
    next: string
    previous?: string
}

export interface IAllPaymentSchema {
    data: IAllPayment[],
    error?: string,
    loading: boolean
}