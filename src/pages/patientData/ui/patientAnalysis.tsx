import {AnalysisData} from "entities/patientData";
import {DynamicModuleLoader} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {profileAnalysisReducer} from "entities/patientData/model/slice/profileSlice";

const reducers = {
    patientPaymentSlice: profileAnalysisReducer
}

export const PatientAnalysis = () => {
    return (
       <DynamicModuleLoader reducers={reducers}>
           <div>
               <AnalysisData/>

           </div>
       </DynamicModuleLoader>
    );
};

