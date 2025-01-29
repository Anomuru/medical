import React from 'react';
import {Modal} from "shared/ui/modal";
import {JobCrudForm} from "../jobCrudForm/JobCrudForm";
import {JobSchema} from "shared/types/oftenUsedTypes";

interface AddJobModalProps {
    className?: string;
    active: boolean;
    setActive: () => void;

}



export const AddJobModal = ({active,setActive} : AddJobModalProps) => {
    return (
        <Modal title={"Add"} active={active} setActive={setActive}>

            <JobCrudForm onSuccess={setActive}/>
        </Modal>
    );
};

