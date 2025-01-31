import React, {useEffect, useState} from 'react';
import classNames from "classnames";

import cls from "./radio.module.sass";
import {Simulate} from "react-dom/test-utils";
import change = Simulate.change;

interface IRadioProps {
    name: string,
    id?: string,
    disabled?: boolean,
    onChange: (arg: any) => void,
    children: string,
    extraClass?: string,
    value: number|string,
    checked: boolean,
    required?: boolean
}

export const Radio: React.FC<IRadioProps> = (props) => {

    const {
        name,
        id,
        disabled,
        onChange,
        extraClass,
        children,
        value,
        checked,
        required
    } = props

    const [active, setActive] = useState<boolean>(false)

    useEffect(() => setActive(checked), [checked])

    return (
        <label htmlFor={id} className={classNames(cls.radioLabel, extraClass)}>
            <input
                required={required}
                disabled={disabled}
                className={cls.radioInput}
                type="radio"
                name={name}
                id={id}
                value={value}
                onChange={(e) => {
                    onChange(value)
                    setActive(e.target.checked)
                }}
                checked={checked}
            />
            <div className={cls.wrapper}>
				<span className={classNames(cls.customRadio, {
                    [cls.active]: active
                })}/>
            </div>
            <span className={cls.text}>
				{children}
			</span>
        </label>
    )
}
