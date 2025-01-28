import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

interface MultiSelect {
    options: any[],
    onChange: (rag: any) => void,
    value?: any,
    extraClass?: string,
    fontSize?: number | string,
    placeholder?: string
}

export const MultiSelect: React.FC<MultiSelect> = React.memo((props) => {

    const {
        options,
        onChange,
        value,
        extraClass,
        fontSize,
        placeholder
    } = props

    const handleChange = (selectedOptions: any) => {
        if (onChange) {
            onChange(selectedOptions);
        }
    };

    return (
        <Select
            className={extraClass}
            styles={{
                control: (baseStyles) => ({
                    ...baseStyles,
                    fontSize: fontSize ? `${fontSize}px` : '16px',
                }),
                option: (provided) => ({
                    ...provided,
                    fontSize: fontSize ? `${fontSize}px` : '16px',
                    display: 'block',
                    whiteSpace: 'normal',
                }),
                singleValue: (provided) => ({
                    ...provided,
                    fontSize: fontSize ? `${fontSize}px` : '16px',
                }),
            }}
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={options}
            onChange={handleChange}
            placeholder={placeholder}
            value={value}
        />
    );
});
