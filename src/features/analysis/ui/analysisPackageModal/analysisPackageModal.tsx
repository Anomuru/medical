import React, {useState} from 'react';

import {AnalysisPackage} from "entities/analysis";
import {Modal} from "shared/ui/modal";
import {Form} from "shared/ui/form";
import {Input} from "shared/ui/input";

import cls from "./analysisPackageModal.module.sass";

export const AnalysisPackageModal = () => {

    const [active, setActive] = useState(false)

    return (
        <div className={cls.modal}>
            <div className={cls.modal__wrapper}>
                <div className={cls.modal__add}>
                    <i className={"fas fa-plus"}/>
                </div>
                <div className={cls.modal__add}>
                    <i className={"fas fa-edit"}/>
                </div>
            </div>
            <AnalysisPackage/>
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
