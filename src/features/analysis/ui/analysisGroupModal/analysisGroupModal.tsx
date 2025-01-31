import React, {useState} from 'react';

import {AnalysisGroup} from "entities/analysis";
import {Modal} from "shared/ui/modal";
import {Form} from "shared/ui/form";
import {Input} from "shared/ui/input";

import cls from "./analysisGroupModal.module.sass";

export const AnalysisGroupModal = () => {

    const [active, setActive] = useState(false)

    return (
        <div className={cls.modal}>
            <div className={cls.modal__wrapper}>
                <div className={cls.modal__add}>
                    <i className={"fas fa-plus"}/>
                </div>
                <div className={cls.modal__edit}>
                    <i className={"fas fa-edit"}/>
                </div>
            </div>
            <AnalysisGroup/>
            <Modal
                active={active}
                setActive={setActive}
            >
                <Form>
                    <Input name={"name"}/>
                </Form>
            </Modal>
        </div>
    );
}
