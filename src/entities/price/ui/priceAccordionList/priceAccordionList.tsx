import React, {JSX, useState} from 'react';

import {Accordion} from "shared/ui/accardion";

import cls from "./priceAccordionList.module.sass";

interface IPriceAccordionListProps {
    title: string,
    subtitle: string | JSX.Element,
    clazz?: string,
    btns?: [],
    number?: number | string,
    children: JSX.Element | JSX.Element[]
}

export const PriceAccordionList: React.FC<IPriceAccordionListProps> = (props) => {

    const {
        title,
        subtitle,
        clazz,
        btns,
        number,
        children
    } = props

    const [backOpen, setBackOpen] = useState<boolean>(false)

    return (
        <Accordion
            title={title}
            subtitle={subtitle}
            setBackOpen={setBackOpen}
            backOpen={backOpen}
            clazz={clazz}
            btns={btns}
            number={number}
        >
            {children}
        </Accordion>
    );
}
