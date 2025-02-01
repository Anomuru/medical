export interface IPatient {
    name: string,
    age: number,
    phone: string
}

export interface IPatientSchema {
    data?: IPatient[],
    loading: boolean,
    error?: "error"
}
