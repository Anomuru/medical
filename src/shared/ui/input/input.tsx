import React, {Dispatch, InputHTMLAttributes, SetStateAction, useMemo, useState} from 'react';
import {
    UseFormRegister,
    RegisterOptions,
} from "react-hook-form";

import cls from "./input.module.sass";
import classNames from "classnames";

type HTMLInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'readOnly'
>;

export interface ErrorType {
    message: string,
    status: boolean
}

export interface InputProps extends HTMLInputProps {
    type?: string,
    placeholder?: string,
    extraClass?: string,
    extraLabelClass?: string,
    title?: string,
    onChangeState?: Dispatch<SetStateAction<string | undefined>>,
    value?: string | number,
    onChange?: (value: string) => void,
    name: string,
    register?: UseFormRegister<any>,
    rules?: RegisterOptions,
    required?: boolean,
    error?: ErrorType,
    canChange?: boolean
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
        required,
        error,
        onChangeState,
        value,
        canChange= true,
        checked
    } = props

    const textField = register && register(name, rules)



    const [passwordActive, setPasswordActive] = useState<boolean>(false)

    return (
        <label className={classNames(cls.label, extraLabelClass)}>
            {title && <span className={cls.label__title}>{title}</span>}
            <input
                {...textField}
                required={required}
                id={name}
                checked={checked}
                className={classNames(cls.label__input, extraClass)}
                type={(type === "password" && passwordActive) ? "text" : type}
                placeholder={placeholder}
                value={value}
                // onChange={(e) => {
                //     onChange && onChange(e.target.value)
                //     textField && textField.onChange(e)
                // }}
                onChange={(e) => {
                    if (canChange) {
                        if (onChange) {
                            onChange(e.target.value);
                        } else if (onChangeState) {
                            onChangeState(e.target.value);
                        }
                    }
                    textField?.onChange(e); // Ensure react-hook-form receives changes
                }}


            />
            {
                error &&
                <span
                    className={classNames(cls.label__success, {
                        [cls.isError]: error.status
                    })}
                >
                    {error.message}
                </span>
            }
            {
                type === "password" &&
                <i
                    onClick={() => setPasswordActive(!passwordActive)}
                    className={classNames(
                        `fa-solid ${passwordActive ? "fa-eye" : "fa-eye-slash"}`,
                        cls.label__icon,
                        {
                            [cls.title]: title
                        }
                    )}
                />
            }
        </label>
    );
}
