import cls from "./groupHeader.module.sass"
import {Button} from "shared/ui/button";
import {Modal} from "shared/ui/modal";
import React, {FC, useEffect, useState} from "react";
import {Select} from "shared/ui/select";
import {useSelector} from "react-redux";
import {
    getFilterRadioItem,
    getFilterSelectResearch,
    getFilterSelectWorkplace
} from "entities/group/model/selector/groupFilterSelector";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";

import {Radio} from "shared/ui/radio";
import {FilterRadioItem, FilterSelectResearch, FilterSelectWorkplace} from "entities/group/model/type/groupFilterTypes";


interface IGroupHeaderProps {

    setActiveCheck: (id: number) => void
    activeCheck: number | undefined,

}


export const GroupHeader : FC<IGroupHeaderProps> = ({activeCheck , setActiveCheck }) => {
    const [activeModal, setActiveModal] = useState(false)
    const filterSelectResearch = useSelector(getFilterSelectResearch)
    const filterSelectWorkplace = useSelector(getFilterSelectWorkplace)
    const filterRadioItem = useSelector(getFilterRadioItem)
    useEffect(() => {

        if (filterRadioItem) {
            setActiveCheck(filterRadioItem[0]?.id)
        }

    } , [filterRadioItem])
    const dispatch = useAppDispatch()
    // useEffect(() => {
    //
    //     dispatch(fetchFilterSelectResearch())
    //     dispatch(fetchFilterSelectWorkplace())
    //     dispatch(fetchFilterRadioItem())
    // }, [])
    const renderRadio = () => {

        return filterRadioItem?.map(item  => (
            <Radio
                name={item.name}
                value={item.id}
                onChange={setActiveCheck}
                checked={item.id === activeCheck}
            >
                {item.name}
            </Radio>
        ))
    }
    return (
        <>
            <div className={cls.header}>
                <div className={cls.header__title}>
                    Группы
                </div>
                <div className={cls.header__buttons}>
                    <Button onClick={() => setActiveModal(true)} extraClass={cls.header__buttons_btn}>Filter</Button>
                    <Button> <i className={"fa fa-check"}/> Проверено </Button>
                </div>
            </div>

            <Modal title={"Filter"} active={activeModal} setActive={setActiveModal}>
                <>
                    <span className={cls.header__span}>Исследования</span>
                    <Select extraClass={cls.header__select} setSelectOption={() => console.log('das')}/>
                    <span className={cls.header__span}>Pабочая место</span>
                    <Select extraClass={cls.header__select} setSelectOption={() => console.log('das')}/>
                    {renderRadio()}
                </>
            </Modal>
        </>
    );
};

