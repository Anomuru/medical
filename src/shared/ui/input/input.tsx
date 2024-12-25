import React, {useState} from 'react';
import {
    UseFormRegister,
    RegisterOptions,
} from "react-hook-form";

import cls from "./input.module.sass";
import classNames from "classnames";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    type?: string,
    placeholder?: string,
    extraClass?: string,
    extraLabelClass?: string,
    title?: string,
    // onChange?: (arg: string) => void,
    name: string,
    register?: UseFormRegister<any>,
    rules?: RegisterOptions,
    required? :boolean,
}

export const Input: React.FC<InputProps> = (props) => {

    const {
        type = "text",
        placeholder,
        extraClass,
        extraLabelClass,
        title,
        onChange,
        name,
        register,
        rules,
        required
    } = props

    const textField = register && register(name, rules)

    const [passwordActive, setPasswordActive] = useState<boolean>(false)

    return (
        <label className={classNames(cls.label, extraLabelClass)}>
            {title && <span className={cls.label__title}>{title}</span>}
            <input
                required={required}
                id={name}
                {...textField}
                className={classNames(cls.label__input, extraClass)}
                type={(type === "password" && passwordActive) ? "text" : type}
                placeholder={placeholder}
                // onChange={(e) => {
                //     onChange && onChange(e.target.value)
                //     textField && textField.onChange(e)
                // }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>  onChange?(e.target.value) : null}
            />
            {
                type === "password" &&
                <i
                    onClick={() => setPasswordActive(!passwordActive)}
                    className={classNames(
                        `fas ${passwordActive ? "fa-eye" : "fa-eye-slash"}`,
                        cls.label__icon
                    )}
                />
            }
        </label>
    );
}
