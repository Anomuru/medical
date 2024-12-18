import React, {useCallback} from 'react';

import {Table} from "shared/ui/table";

import cls from "./priceAccordionItem.module.sass";

interface IItem {
    name: string,
    price: string
}

interface IPriceAccordionItemProps {
    list: IItem[]
}

export const PriceAccordionItem: React.FC<IPriceAccordionItemProps> = (props) => {

    const {list} = props

    const renderItems = useCallback(() => {
        return list.map(item => {
            return (
                <tr>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>
                        <i className="fas fa-pen"/>
                    </td>
                </tr>
            )
        })
    }, [])

    return (
        <Table>
            <tbody>
            {renderItems()}
            </tbody>
        </Table>
    );
}
