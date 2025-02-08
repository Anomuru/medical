
export interface JobSchema {
    id: number,
    name: string,
    has_client: boolean
}





export interface DoctorSchema {
    img: string,
    id: number,
    name: string,
    jobs: JobSchema[]
}
