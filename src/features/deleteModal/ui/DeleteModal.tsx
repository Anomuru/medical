import React from 'react';
import {Modal} from "shared/ui/modal";
import cls from "./deleteModal.module.sass"
import {Form} from "shared/ui/form";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {Textarea} from "shared/ui/textarea";
import {Button} from "shared/ui/button";





export interface DeleteModalReturnData {
    reason: string
}



interface DeleteModalProps {
    className?: string;
    active: boolean;
    setActive: () => void;
    onConfirm: (data: DeleteModalReturnData) => void;
}







export const DeleteModal = ({active,setActive,onConfirm}: DeleteModalProps) => {

    const { handleSubmit, control} = useForm<DeleteModalReturnData>();





    const onClickCancel = () => {
        setActive()
    }

    const onClickDelete: SubmitHandler<DeleteModalReturnData> = (data) => {
        onConfirm(data)
    }

    return (
        <Modal active={active} setActive={setActive} title={"Delete"}>
            <div className={cls.deleteModal}>

                <Form
                    id={"submit"}
                    onSubmit={handleSubmit(onClickDelete)}
                >


                    <Controller
                        control={control}
                        render={({ field }) => (
                            <Textarea
                                value={field.value}
                                onChange={field.onChange}
                                placeholder="Reason"
                                required
                            />
                        )}
                        name={"reason"}
                    />


                    <div className={cls.btns}>
                        <Button id={"submit"}  type={"danger"} >
                            Delete
                        </Button>
                        <Button id={"cancel"} type={"success"} onClick={onClickCancel}>
                            Cancel
                        </Button>
                    </div>

                </Form>

            </div>
        </Modal>
    );
};

