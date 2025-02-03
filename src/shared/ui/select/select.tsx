import React, {useCallback, useEffect, useState} from 'react';
import classNames from "classnames";

import cls from "./select.module.sass";

interface ISelectProps {
    extraClass?: string,
    title?: string,
    required?: boolean,
    selectOption?: string | number,
    setSelectOption: (arg: any) => void,
    optionsData?: any[],
    keyValue?: string,
    status?: string,
}

export const Select: React.FC<ISelectProps> = (props) => {

    const {
        extraClass,
        setSelectOption,
        selectOption,
        required,
        title,
        optionsData,
        keyValue,
        status,
    } = props


    useEffect(() => {
        if (selectOption) {
            setSelectOption(selectOption)
        }
    }, [selectOption, setSelectOption])

    const renderOptionsOfSelect = useCallback(() => {
        return optionsData?.map((item, index) => {
            const value = (keyValue && item[keyValue]) || item.id || item.value || item.name;
            const key = item.name || item.id;
            return (
                <option
                    disabled={item.disabled}
                    key={index}
                    value={value}
                >
                    {key}
                </option>
            )
        });
    }, [optionsData, keyValue]);

    // Agar faqat bitta ma'lumot kelsa, uni avtomatik tanlash
    useEffect(() => {
        if (optionsData?.length === 1) {
            const item = optionsData[0];
            const value = (keyValue && item[keyValue]) || item.id || item.value || item.name;
            setSelectOption(value);
        }
    }, [optionsData, keyValue, setSelectOption]);

    const renderedOptions = renderOptionsOfSelect();

    return (
        <label className={classNames(cls.label, extraClass)}>
            <select
                disabled={status === "disabled"}
                className={classNames(cls.label__inner, extraClass, {
                    [cls.error]: status === "error"
                })}
                required={required}
                value={selectOption}
                onChange={(e) => setSelectOption(e.target.value)}
            >
                {title ? <option selected value={""} disabled>{title}</option> :
                    <option value={""} disabled>Tanlang</option>}
                {renderedOptions}
            </select>
            {status === "error" && <span className={cls.label__error}>Tanlanmagan</span>}
        </label>
    );
}
