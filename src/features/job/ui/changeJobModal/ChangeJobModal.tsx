import {Modal} from "shared/ui/modal";
import {JobCrudForm} from "features/job/ui/jobCrudForm/JobCrudForm";
import React from "react";

interface ChangeJobModalProps {
    className?: string;
    active: boolean;
    setActive: () => void;
}



export const ChangeJobModal = ({active,setActive} : ChangeJobModalProps) => {
    return (
        <Modal title={"Change"} active={active} setActive={setActive}>
            <JobCrudForm/>
        </Modal>
    );
};

