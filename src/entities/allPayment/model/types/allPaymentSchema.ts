
export interface IAllPayment {
    id: number,
    amount: number,
    user: string,
    date: string,
    deleted: boolean,
    payment_type: {
        id: number,
        payment_type: string
    },
}


export interface IAllPaymentProps {
    results: IAllPayment[]
    count: number
    next: string
    previous?: string
}

export interface IAllPaymentSchema {
    data: IAllPayment[],
    paymentList?: undefined,
    error?: string,
    loading: boolean
}