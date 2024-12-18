import React, {useCallback, useState} from 'react';

import cls from "./pricePage.module.sass";
import {Accordion} from "../../../shared/ui/accardion";
import {PriceAccordionItem, PriceAccordionList} from "entities/price";
import classNames from "classnames";
import {Button} from "../../../shared/ui/button";

const list = [
    {
        name: "Биохимия базовая: 11 параметр 01-050",
        items: [
            {
                name: "Биохимия базовая: 11 параметр 01-050",
                price: "354 000"
            }, {
                name: "Биохимия базовая: 11 параметр 01-050",
                price: "354 000"
            }, {
                name: "Биохимия базовая: 11 параметр 01-050",
                price: "354 000"
            },
        ]
    }, {
        name: "Биохимия базовая: 11 параметр 01-050",
        items: [
            {
                name: "Биохимия базовая: 11 параметр 01-050",
                price: "354 000"
            }, {
                name: "Биохимия базовая: 11 параметр 01-050",
                price: "354 000"
            }, {
                name: "Биохимия базовая: 11 параметр 01-050",
                price: "354 000"
            },
        ]
    }, {
        name: "Биохимия базовая: 11 параметр 01-050",
        items: [
            {
                name: "Биохимия базовая: 11 параметр 01-050",
                price: "354 000"
            }, {
                name: "Биохимия базовая: 11 параметр 01-050",
                price: "354 000"
            }, {
                name: "Биохимия базовая: 11 параметр 01-050",
                price: "354 000"
            },
        ]
    },
]

export const PricePage = () => {

    // const [] = useState()

    const renderList = useCallback(() => {
        return list.map((item, index) => {
            return (
                <PriceAccordionList
                    title={item.name}
                    subtitle={<i className="fas fa-pen"/>}
                    number={index + 1}
                >
                    <PriceAccordionItem list={item.items}/>
                    <Button>
                        <i className={classNames("fas fa-plus")}/>
                    </Button>
                </PriceAccordionList>
            )
        })
    }, [])

    return (
        <div className={cls.pricePage}>
            <h1 className={cls.pricePage__title}>Analysis price list</h1>
            <Button>
                <i className={classNames("fas fa-plus")}/>
            </Button>
            {renderList()}
        </div>
    );
}
