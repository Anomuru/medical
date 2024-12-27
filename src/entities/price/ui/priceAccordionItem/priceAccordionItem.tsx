import React, {useCallback} from 'react';

import {Table} from "shared/ui/table";

import cls from "./priceAccordionItem.module.sass";
import {a} from "@fullcalendar/core/internal-common";

interface IItem {
    name: string,
    price: string,
    device: string,
    type: number,
    id: number
}

interface IPriceAccordionItemProps {
    list?: IItem[],
    setIsEditItem: (arg: boolean) => void,
    setActiveAnalysis: (arg: number) => void,
    setValue?: any
}

export const PriceAccordionItem: React.FC<IPriceAccordionItemProps> = (props) => {

    const {list , setIsEditItem , setActiveAnalysis , setValue} = props



    const renderItems = useCallback(() => {
        return list?.map(item => {

            return (
                <tr>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>

                        <i onClick={() => {

                            setIsEditItem(true)

                            setValue("name" , item.name)

                            setValue("price" , item.price)

                            setActiveAnalysis(item.id)
                        }} className="fas fa-pen"/>
                    </td>
                </tr>
            )
        })
    }, [list])

    return (
        <Table extraClass={cls.item}>
            <tbody>
            {renderItems()}
            </tbody>
        </Table>
    );
}
