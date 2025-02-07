export interface IPatient {
    deleted: false
    id: number
    name: string
    phone_number: string
    surname: string
    user_id: number | null,
    age: number,
    status: boolean

}

export interface IPatientSchema {
    data?: IPatient[],
    loading: boolean,
    error?: "error",

}
