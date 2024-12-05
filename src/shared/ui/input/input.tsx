import React from 'react';

import cls from "./input.module.sass";

interface InputProps {
    type?: string,
    placeholder?: string,
    title?: string,
    onChange?: (arg: string) => void,
    name?: string,
    register?: any
}

export const Input = (props: InputProps) => {

    const {
        type = "text",
        placeholder,
        title,
        onChange,
        name,
        register
    } = props

    return (
        <label className={cls.label}>
            {title && <span className={cls.label__title}>{title}</span>}
            <input
                id={name}
                name={name}
                className={cls.label__input}
                type={type}
                placeholder={placeholder}
                onChange={(e) => onChange && onChange(e.target.value)}
                {...register(name)}
            />
            <i className="fas fa-eye-slash"/>
        </label>
    );
}
