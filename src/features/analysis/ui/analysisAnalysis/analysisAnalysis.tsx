import cls from "./analysisAnalysisModal.module.sass";

import React, {useState} from "react";
import {Modal} from "../../../../shared/ui/modal";
import {Form} from "../../../../shared/ui/form";
import {Input} from "../../../../shared/ui/input";
import {AnalysisList} from "../../../../entities/analysis";

export const AnalysisAnalysis = () => {
    const [active, setActive] = useState<boolean>(false)
    // const []

    return (
        <div className={cls.modal}>
            <div className={cls.modal__wrapper}>
                <div onClick={() => setActive(true)} className={cls.modal__add}>
                    <i className={"fas fa-plus"}/>
                </div>
            </div>
            <AnalysisList/>

            <AnalysisAnalysisAddModal active={active} setActive={setActive}/>
        </div>
    );
};


const AnalysisAnalysisAddModal = ({active, setActive}: { active: boolean, setActive: (arg: boolean) => void }) => {
    return (
        <>

            <Modal title={"Add"} active={active} setActive={setActive}>
                <Form>
                    <Input name={"name"}/>
                </Form>
            </Modal>
        </>
    )
}