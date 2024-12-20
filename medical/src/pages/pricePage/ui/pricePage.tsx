import React, {useCallback, useState} from 'react';
import classNames from "classnames";

import {PriceAccordionItem, PriceAccordionList} from "entities/price";
import {Button} from "shared/ui/button";
import {Modal} from "shared/ui/modal";
import {Form} from "shared/ui/form";
import {Input} from "shared/ui/input";

import cls from "./pricePage.module.sass";

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

    const [isEditItem, setIsEditItem] = useState<boolean>(false)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [isAddItem, setIsAddItem] = useState<boolean>(false)
    const [isAdd, setIsAdd] = useState<boolean>(true)

    const renderList = useCallback(() => {
        return list.map((item, index) => {
            return (
                <PriceAccordionList
                    title={item.name}
                    subtitle={<i className={classNames("fas fa-pen", cls.pricePage__icon)}/>}
                    // number={index + 1}
                >
                    <div className={cls.pricePage__item}>
                        <PriceAccordionItem list={item.items}/>
                        <Button>
                            <i className={classNames("fas fa-plus")}/>
                        </Button>
                    </div>
                </PriceAccordionList>
            )
        })
    }, [])

    return (
        <>
            <div className={cls.pricePage}>
                <h1 className={cls.pricePage__title}>Analysis price list</h1>
                <Button extraClass={cls.pricePage__btn}>
                    <i className={classNames("fas fa-plus")}/>
                </Button>
                <div className={cls.pricePage__container}>
                    {renderList()}
                </div>
            </div>
            <Modal extraClass={cls.itemEdit} active={isEditItem} setActive={setIsEditItem}>
                <h1 className={cls.itemEdit__title}>Edit</h1>
                <Form extraClass={cls.itemEdit__container}>
                    <Input name={"name"} placeholder={"Name"}/>
                    <Input name={"price"} placeholder={"Price"}/>
                    <Button extraClass={cls.itemEdit__btn}>
                        Edit
                    </Button>
                </Form>
            </Modal>
            <Modal extraClass={cls.itemEdit} active={isEdit} setActive={setIsEdit}>
                <h1 className={cls.itemEdit__title}>Edit</h1>
                <Form extraClass={cls.itemEdit__container}>
                    <Input name={"name"} placeholder={"Name"}/>
                    {/*<Input name={"price"} placeholder={"Price"}/>*/}
                    <Button extraClass={cls.itemEdit__btn}>
                        Edit
                    </Button>
                </Form>
            </Modal>
            <Modal extraClass={cls.itemEdit} active={isAddItem} setActive={setIsAddItem}>
                <h1 className={cls.itemEdit__title}>Add</h1>
                <Form extraClass={cls.itemEdit__container}>
                    <Input name={"name"} placeholder={"Name"}/>
                    <Input name={"price"} placeholder={"Price"}/>
                    <Button extraClass={cls.itemEdit__btn}>
                        Edit
                    </Button>
                </Form>
            </Modal>
            <Modal extraClass={cls.itemEdit} active={isAdd} setActive={setIsAdd}>
                <h1 className={cls.itemEdit__title}>Add</h1>
                <Form extraClass={cls.itemEdit__container}>
                    <Input name={"name"} placeholder={"Name"}/>
                    {/*<Input name={"price"} placeholder={"Price"}/>*/}
                    <Button extraClass={cls.itemEdit__btn}>
                        Edit
                    </Button>
                </Form>
            </Modal>
        </>
    );
}
