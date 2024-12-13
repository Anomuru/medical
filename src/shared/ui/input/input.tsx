import React from 'react';
import {
    FieldValues,
    UseFormRegister,
    RegisterOptions,
} from "react-hook-form";

import cls from "./input.module.sass";
import classNames from "classnames";

interface InputProps {
    type?: string,
    placeholder?: string,
    extraClass?: string,
    title?: string,
    onChange?: (arg: string) => void,
    name: string,
    register?: UseFormRegister<FieldValues>,
    rules?: RegisterOptions
}

export const Input: React.FC<InputProps> = (props) => {

    const {
        type = "text",
        placeholder,
        extraClass,
        title,
        onChange,
        name,
        register,
        rules
    } = props

    const textField =
        register && register(name, rules)

    return (
        <label className={cls.label}>
            {title && <span className={cls.label__title}>{title}</span>}
            <input
                id={name}
                {...textField}
                className={classNames(cls.label__input, extraClass)}
                type={type}
                placeholder={placeholder}
                onChange={(e) => {
                    onChange && onChange(e.target.value)
                    textField && textField.onChange(e)
                }}
            />
            {type === "password" && <i className={classNames("fas fa-eye-slash", cls.label__icon)}/>}
        </label>
    );
}
