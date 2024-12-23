import React, {useCallback, useState} from 'react';
import classNames from "classnames";

import {PriceAccordionItem, PriceAccordionList} from "entities/price";
import {Button} from "shared/ui/button";
import {Modal} from "shared/ui/modal";
import {Form} from "shared/ui/form";
import {Input} from "shared/ui/input";

import cls from "./pricePage.module.sass";
import {useForm} from "react-hook-form";
import {API_URL, useHttp} from "shared/api/api";
import {headers} from "shared/api/base";
import {Select} from "shared/ui/select";


interface ISubmitData {
    name: string,
    price: string | number,
    type: number | string,
    device: string | number
}


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
    const [isAdd, setIsAdd] = useState<boolean>(false)


    const [selectOption, setSelectedOption] = useState<number | string>()

    const {request} = useHttp()


    const {handleSubmit, register} = useForm<ISubmitData>()

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
                        <Button onClick={() => setIsAddItem(true)}>
                            <i className={classNames("fas fa-plus")}/>
                        </Button>
                    </div>
                </PriceAccordionList>
            )
        })
    }, [])


    const onPost = (data: ISubmitData) => {
        console.log(data)


        request(`${API_URL}analysis/analysis_type/crud/create/`, "POST", JSON.stringify(data), headers())
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }


    const onPostData = (data: ISubmitData) => {

        console.log(data)

        const res = {
            ...data,
            device: 1,
            type: 1
        }
        request(`${API_URL}analysis/analysis/crud/create/`, "POST", JSON.stringify(res), headers())
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }


    return (
        <>
            <div className={cls.pricePage}>
                <h1 className={cls.pricePage__title}>Analysis price list</h1>
                <Button onClick={() => setIsAdd(true)} extraClass={cls.pricePage__btn}>
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
                    {/*// @ts-ignore*/}
                    <Input register={register} name={"name"} placeholder={"Name"}/>
                    {/*// @ts-ignore*/}
                    <Input name={"price"} register={register} placeholder={"Price"}/>

                    <Select setSelectOption={setSelectedOption} optionsData={[]}/>
                    <Button onClick={handleSubmit(onPostData)} extraClass={cls.itemEdit__btn}>
                        Edit
                    </Button>
                </Form>
            </Modal>


            <Modal extraClass={cls.itemEdit} active={isAdd} setActive={setIsAdd}>
                <h1 className={cls.itemEdit__title}>Add</h1>
                <Form extraClass={cls.itemEdit__container}>

                    {/*// @ts-ignore*/}
                    <Input name={"name"} register={register} placeholder={"Name"}/>
                    {/*<Input name={"price"} placeholder={"Price"}/>*/}
                    <Button onClick={handleSubmit(onPost)} extraClass={cls.itemEdit__btn}>
                        Edit
                    </Button>
                </Form>
            </Modal>
        </>
    );
}
