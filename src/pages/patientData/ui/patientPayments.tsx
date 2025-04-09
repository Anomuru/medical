import {PatientPayments} from "entities/patientData";
import {DynamicModuleLoader} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {profileAnalysisReducer} from "entities/patientData/model/slice/profileSlice";

const reducers = {
    patientPaymentSlice: profileAnalysisReducer
}

export const PatientPaymentsPage = () => {
    return (
        <DynamicModuleLoader reducers={reducers}>
            <div style={{overflow: "auto"}}>
                <PatientPayments/>
            </div>

        </DynamicModuleLoader>
    );
};

