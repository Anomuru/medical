import React from 'react';
import {Modal} from "shared/ui/modal";
import {JobCrudForm} from "../jobCrudForm/JobCrudForm";

interface AddJobModalProps {
    className?: string;
    active: boolean;
    setActive: () => void;
}



export const AddJobModal = ({active,setActive} : AddJobModalProps) => {
    return (
        <Modal title={"Add"} active={active} setActive={setActive}>

            <JobCrudForm/>
        </Modal>
    );
};

