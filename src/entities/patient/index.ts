export {PatientList} from "./ui/patientList/patientList";
export {PatientHeader} from "./ui/patientHeader/patientHeader";

export {patientReducer, patientActions} from "./model/patientSlice";
export type {IPatient, IPatientSchema} from "./model/patientSchema";
export {getPatientData, getPatientLoading, getPatientError} from "./model/patientSelector";
export {fetchPatientList} from "./model/patientThunk";