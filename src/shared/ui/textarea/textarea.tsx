import React from 'react';
import {
    RegisterOptions,
} from "react-hook-form";

import cls from "./textarea.module.sass";
import classNames from "classnames";



export interface ErrorType {
    message: string,
    status: boolean
}

export interface TextareaProps {
    extraClass?: string,
    extraLabelClass?: string,
    onChange: (value: string) => void,
    rules?: RegisterOptions,
    required: boolean,
    error?: ErrorType,
    placeholder?: string,
    value: string
}

export const Textarea: React.FC<TextareaProps> = (props) => {

    const {
        placeholder,
        extraClass,
        extraLabelClass,

        onChange,
        required,
        value
    } = props



    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(e.target.value)
    }



    return (
        <label className={classNames(cls.label, extraLabelClass)}>
            <textarea
                value={value}
                required={required}
                className={classNames(cls.label__textarea, extraClass)}
                placeholder={placeholder}
                // onChange={(e) => {
                //     onChange && onChange(e.target.value)
                //     textField && textField.onChange(e)
                // }}
                onChange={handleChange}
            />


        </label>
    );
}

