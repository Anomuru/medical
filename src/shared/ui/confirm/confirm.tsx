

import {Button} from "../button";
import React, {FC} from "react";
import {Modal} from "../modal";
import cls from "./confirm.module.sass"



interface IConfirmModal {
    setActive: (arg: boolean) => void
    active: boolean
    onClick?: () => void
    title?: string
    text?: string
}
export const ConfirmModal : FC<IConfirmModal> = (
    {
        setActive,
        active,
        onClick,
        title= "Вы действительно хотите его удалить?",
        text,
    }) => {


    return (
        <Modal title={title} active={active} setActive={setActive}>
            <div className={cls.filter}>
                {text ?
                    <div className={cls.deleteText}>
                        <span>{text}</span>
                    </div> : null
                }
                <div className={cls.deleteButtons}>
                    <Button type={"danger"}  extraClass={cls.deleteButton} children={"Да"} onClick={onClick}/>
                    <Button   children={"Нет"} onClick={() => setActive(!active)}/>
                </div>
            </div>
        </Modal>
    );
};

