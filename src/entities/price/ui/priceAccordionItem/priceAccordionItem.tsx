import React, {useCallback} from 'react';

import {Table} from "shared/ui/table";

import cls from "./priceAccordionItem.module.sass";

interface IItem {
    name: string,
    price: string,
    device: string,
    type: number,
    id: number
}

interface IPriceAccordionItemProps {
    list?: IItem[],
    setIsEditItem: boolean,
    setActiveAnalysis: string
}

export const PriceAccordionItem: React.FC<IPriceAccordionItemProps> = (props) => {

    const {list , setIsEditItem , setActiveAnalysis} = props



    const renderItems = useCallback(() => {
        return list?.map(item => {

            return (
                <tr>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>

                        <i onClick={() => {
                            {/*// @ts-ignore*/}
                            setIsEditItem(true)
                            {/*// @ts-ignore*/}
                            setActiveAnalysis(item.id)
                        }} className="fas fa-pen"/>
                    </td>
                </tr>
            )
        })
    }, [])

    return (
        <Table extraClass={cls.item}>
            <tbody>
            {renderItems()}
            </tbody>
        </Table>
    );
}
