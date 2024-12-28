import React, {SetStateAction, useCallback} from 'react';
import classNames from "classnames";

import cls from "./select.module.sass";

interface ISelectProps {
    extraClass?: string,
    title?: string,
    required?: boolean,
    selectOption?: string,
    setSelectOption: (arg: string) => void,
    optionsData?: any[],
    keyValue?: string,
    status?: string
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
        status
    } = props

    const renderOptionsOfSelect = useCallback(() => {
        return optionsData?.map((item, index) => {
            const value = item.id || item.value || item.name;
            // const key = item?.name || item?.number || item.old_id || item?.days || item.num || item?.user && `${item.user?.name} ${item.user?.surname}` || item.branch || item;
            const key = item.name

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
    }, [optionsData]);


    const renderedOptions = renderOptionsOfSelect();

    return (
        <label className={classNames(cls.label, extraClass)}>
            {/*{*/}
            {/*    title ?*/}
            {/*        <div className={cls.info}>*/}
            {/*            <span className={cls.info__inner}>*/}
            {/*                {title}*/}
            {/*            </span>*/}
            {/*        </div>*/}
            {/*        : null*/}
            {/*}*/}
            <select
                disabled={status === "disabled"}
                className={classNames(cls.label__inner, extraClass, {
                    [cls.error]: status === "error"
                })}
                required={required}
                value={selectOption}
                onChange={(e) => {
                    // @ts-ignore
                    setSelectOption(e.target.value);
                    // setIsChanged(true);
                }}
            >
                {/*<option value={""} disabled>Tanlang</option>*/}

                {title ? <option selected value={""} disabled>{title}</option> : <option value={""} disabled>Tanlang</option>}
                {renderedOptions}
            </select>
            {status === "error" ? <span className={cls.label__error}>Tanlanmagan</span> : null}
        </label>
    );
}
