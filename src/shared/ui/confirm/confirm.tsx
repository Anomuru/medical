

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
    type?: string
}
export const ConfirmModal : FC<IConfirmModal> = (
    {
        setActive,
        active,
        onClick,
        title= "Rostanham o'chirmoqchimisiz",
        text,
        type
    }) => {


    return (
        <Modal active={active} setActive={setActive}>
            <div className={cls.filter}>
                <div className={cls.deleteHead}>
                    <h2>{title}</h2>
                </div>
                {text ?
                    <div className={cls.deleteText}>
                        <span>{text}</span>
                    </div> : null
                }
                <div className={cls.deleteButtons}>
                    <Button extraClass={cls.deleteButton} type={type} children={"Xa"} onClick={onClick}/>
                    <Button extraClass={cls.cancelButton} type={type} children={"Yo'q"} onClick={() => setActive(!active)}/>
                </div>
            </div>
        </Modal>
    );
};

