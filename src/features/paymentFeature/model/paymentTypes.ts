interface IPaymentItem {
    id: number,

    name: string,
    surname: string,
    user_id: number,

    phone_number: string
}

export interface IPaymentSchema {
    data: IPaymentItem[],
    loading: boolean,
    error?: "error"
}

export interface IPaymentType {
    id: number,
    payment_type: string
}
export interface IPaymentTypeSchema {
    data: IPaymentType[],
    loading: boolean,
    error?: string
}

export interface IPayment {
    date: string,
    payment_type: string,
    user: number,

}
export interface IGivePaymentSchema {
    data: IPayment[],
    loading: boolean,
    error?: string
}