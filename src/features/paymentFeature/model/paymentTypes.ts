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
    error: boolean
}