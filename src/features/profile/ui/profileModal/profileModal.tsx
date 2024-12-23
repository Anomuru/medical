import React, {useState} from 'react';

import {Modal} from "shared/ui/modal";
import {Form} from "shared/ui/form";
import {Button} from "shared/ui/button";
import {Input} from "shared/ui/input";

import cls from "./profileModal.module.sass";
import {useForm} from "react-hook-form";
import {Select} from "../../../../shared/ui/select";

interface IProfileModal {
    active: boolean,
    setActive: (arg: boolean) => void
}

interface ITimeTableData {
    doctor: number,
    day: number,
    start_time: string,
    end_time: string
}

export const ProfileModal: React.FC<IProfileModal> = (props) => {

    const {active, setActive} = props

    const {
        register,
        handleSubmit
    } = useForm<ITimeTableData>()

    const [selectedDoctor, setSelectedDoctor] = useState<string>("")
    const [selectedDay, setSelectedDay] = useState<string>("")

    const onSubmit = (data: ITimeTableData) => {
        console.log(data, "data")
    }

    return (
        <Modal extraClass={cls.profileModal} active={active} setActive={setActive}>
            <h1 className={cls.profileModal__title}>Add</h1>
            <Form extraClass={cls.profileModal__container} onSubmit={handleSubmit(onSubmit)}>
                <Select
                    title={"Doctors"}
                    setSelectOption={setSelectedDoctor}
                    optionsData={[]}
                />
                <Select
                    title={"Days"}
                    setSelectOption={setSelectedDay}
                    optionsData={[]}
                />
                <Input type={"time"} title={"Start time"} name={"start"}/>
                <Input type={"time"} title={"End time"} name={"end"}/>
                <Button extraClass={cls.formBtn}>Add</Button>
            </Form>
        </Modal>
    )
}
