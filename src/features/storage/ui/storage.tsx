import React, {useCallback, useState} from 'react';
import cls from './storage.module.sass'
import {Button} from "shared/ui/button";
import classNames from "classnames";
import {Modal} from "shared/ui/modal";
import {Form} from "shared/ui/form";
import {Input} from "shared/ui/input";
import {Table} from "shared/ui/table";
import {Pagination} from "features/pagination";
import {Radio} from "shared/ui/radio";

const data = [
    {
        id: 1,
        name: "dede",
        code_name: "weef",
        size: "23",
        total: "223"
    },{
        id: 2,
        name: "dede",
        code_name: "weef",
        size: "23",
        total: "223"
    }
]

const radio = [
    {
        id: 1,
        name: "click"
    },
    {
        id: 2,
        name: "cash"
    },
]
export const StorageHeader = () => {

    const [active, setActive] = useState<boolean>(false)
    const [portal, setPortal] = useState<boolean>(false)
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectedRadio, setSelectedRadio] = useState<number>()

    const getSelectedRadio = useCallback((data: number) => setSelectedRadio(data), [])

    const onAddInnerItem = () => {
        setPortal(!portal)
    }
    const onAddItem = () => {
        setActive(!active)
    }

    const renderTable = useCallback(() => {
        return data.map((item, index) => {
            return(
                <tr onClick={onAddInnerItem} className={cls.arounder}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.code_name}</td>
                    <td>{item.size}</td>
                    <td>{item.total}</td>
                </tr>
            )
        })
    }, [data])



    return (
        <div className={cls.container}>
            <Button
                extraClass={cls.container__btn}
                onClick={onAddItem}
                children={<i className={classNames("fa-solid fa-plus")}/>}
            />
            <div className={cls.container__arounder}>
                <Table>
                    <thead>
                    <tr>
                        <th>Number</th>
                        <th>Name</th>
                        <th>Code name</th>
                        <th>Size</th>
                        <th>Total number</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        renderTable()
                    }
                    </tbody>
                </Table>
            </div>

            <Pagination
                totalCount={6}
                onPageChange={setCurrentPage}
                currentPage={currentPage}
                pageSize={10}
            />
            <Modal extraClass={cls.iteModal} title={"Добавлять"} active={active} setActive={setActive}>
                <Form extraClass={cls.iteModal__form}>
                    <Input name={"name"} placeholder={"Имя"}/>
                    <Input name={"name"} placeholder={"Kодовое имя"}/>
                    <Input name={"name"} placeholder={"Размер"}/>
                    <Input name={"name"} placeholder={"Oбщее количество"}/>
                    <Button extraClass={cls.iteModal__form__btn} children={"Добавлять"}/>
                </Form>
            </Modal>
            <Modal extraClass={cls.iteModal} title={"Добавлять"} active={portal} setActive={setPortal}>
                <Form extraClass={cls.iteModal__form}>
                    <Input name={"name"} placeholder={"Имя"}/>
                    <Input name={"name"} placeholder={"Размер"}/>
                    <Input name={"name"} placeholder={"Oбщее количество"}/>
                    <div className={cls.iteModal__form__radios}>
                        {
                            radio.map(item => {
                                return(
                                    <Radio
                                        name={"1_1"}
                                        value={item.id}
                                        onChange={getSelectedRadio}
                                        checked={item.id === selectedRadio}
                                    >
                                        {item.name}
                                    </Radio>
                                )
                            })
                        }
                    </div>
                    <Input name={"name"} placeholder={"цена"}/>
                    <Input name={"name"} placeholder={"дата"} type={"date"}/>
                    <Button extraClass={cls.iteModal__form__btn} children={"Добавлять"}/>
                </Form>
            </Modal>
        </div>
    );
};

