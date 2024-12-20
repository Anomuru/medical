import React, {useState} from 'react';
import classNames from "classnames";

import cls from "./radio.module.sass";

interface IRadioProps {
    name: string,
    id?: string,
    disabled?: boolean,
    onChange: (arg: number) => void,
    children: string,
    extraClass?: string,
    value: number,
    checked?: boolean
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
        checked
    } = props

    const [active, setActive] = useState<boolean>(false)

    return (
        <label htmlFor={id} className={classNames(cls.radioLabel , extraClass)}>
            <input
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
