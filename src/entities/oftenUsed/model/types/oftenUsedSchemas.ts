import {DoctorSchema, JobSchema} from "shared/types/oftenUsedTypes";
import {IPaymentType} from "../../../payment/model/schema/paymentTypes";


export interface Device {
    id: number,
    name: string,
    image: string
}



interface IOftenPaymentType {
    id: number,
    payment_type: string
}



export interface OftenUsedSchemas {
    jobs?: JobSchema[],
    locations?: any,
    branches?: any,
    doctors: DoctorSchema[],
    selectedLocation?: number,
    selectedBranch?: number,
    error?: "error"
    loading: boolean,
    data: [],
    paymentTypes: IOftenPaymentType[]
}
