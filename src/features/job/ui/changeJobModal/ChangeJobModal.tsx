import {Modal} from "shared/ui/modal";
import {JobCrudForm} from "features/job/ui/jobCrudForm/JobCrudForm";
import React from "react";
import {JobSchema} from "shared/types/oftenUsedTypes";

interface ChangeJobModalProps {
    className?: string;
    active: boolean;
    setActive: () => void;
    changedData: JobSchema;
}



export const ChangeJobModal = ({active,setActive,changedData} : ChangeJobModalProps) => {
    return (
        <Modal title={"Изменять"} active={active} setActive={setActive}>
            <JobCrudForm onSuccess={setActive} changedData={changedData}/>
        </Modal>
    );
};

