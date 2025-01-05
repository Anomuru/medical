import React from 'react';
import {Modal} from "shared/ui/modal";
import cls from "./deleteModal.module.sass"
import {Form} from "shared/ui/form";









interface DeleteModalProps {
    className?: string;
    active: boolean;
    setActive: () => void;
    onConfirm: () => void;
}





export const DeleteModal = ({active,setActive,onConfirm}: DeleteModalProps) => {








    return (
        <Modal active={active} setActive={setActive} title={"Delete"}>
            <div className={cls.deleteModal}>

                <Form  >


                </Form>

            </div>
        </Modal>
    );
};

