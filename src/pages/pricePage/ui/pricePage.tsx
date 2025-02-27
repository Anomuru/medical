import React, {useCallback, useEffect, useMemo, useState} from 'react';
import classNames from "classnames";

import {PriceAccordionItem, PriceAccordionList} from "entities/price";
import {Button} from "shared/ui/button";
import {Modal} from "shared/ui/modal";
import {Form} from "shared/ui/form";
import {Input} from "shared/ui/input";

import cls from "./pricePage.module.sass";
import {useForm} from "react-hook-form";

import {headers, useHttp} from "shared/api/base";
import {Select} from "shared/ui/select";
import {useDispatch, useSelector} from "react-redux";
import {
    getPriceCount,
    getPriceDevice,
    getPriceType,
    getPriceTypes
} from "../../../entities/price/model/selector/priceSelector";

import {fetchDeviceList, fetchPriceType, fetchPriceTypes} from "../../../entities/price/model/thunk/priceThunk";

import {
   priceActions, priceReducer
} from "entities/price/model/slice/priceSlice";
import {
    DynamicModuleLoader,
    ReducersList
} from "../../../shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {Pagination} from "../../../features/pagination";
import {useAppDispatch} from "../../../shared/lib/hooks/useAppDispatch/useAppDispatch";



interface ISubmitData {
    name: string,
    price: string | number,
    type: number | string,
    device: string | number
}


const reducers: ReducersList = {
    priceSlice: priceReducer,

    // userSlice:
};

export const PricePage = () => {

    const [isEditItem, setIsEditItem] = useState<boolean>(false)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [isAddItem, setIsAddItem] = useState<boolean>(false)
    const [isAdd, setIsAdd] = useState<boolean>(false)
    const priceData = useSelector(getPriceType)
    const count = useSelector(getPriceCount)
    const [activeType, setActiveType] = useState<number>()

    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageSize = useMemo(() => 50, []);
    const dispatch = useAppDispatch()


    const type = useSelector(getPriceTypes)
    const deviceSelect = useSelector(getPriceDevice)


    useEffect(() => {

        dispatch(fetchPriceType())

        dispatch(fetchPriceTypes())

        dispatch(fetchDeviceList())

    }, [])


    const [selectOption, setSelectedOption] = useState<number | string>()


    const [deviceType, setDeviceType] = useState<number | string>()

    const [selectType, setSelectType] = useState<number | string>()


    const [activeAnalysis, setActiveAnalysis] = useState<number | string>()


    const {request} = useHttp()




    const {handleSubmit, register, setValue} = useForm<ISubmitData>()

    const renderList = useCallback(() => {
        return priceData?.map((item, index) => {
            return (
                <PriceAccordionList
                    key={item?.id}
                    title={item?.name}
                    subtitle={<i onClick={() => {
                        setIsEdit(true)
                        setActiveType(item?.id)
                        setValue("name", item?.name)
                    }}
                                 className={classNames("fas-solid fa-pen", cls.pricePage__icon)}/>}

                    // number={index + 1}
                >
                    <div className={cls.pricePage__item}>
                        <div className={cls.pricePage__item_accordion}>

                            <PriceAccordionItem setValue={setValue} setActiveAnalysis={setActiveAnalysis} setIsEditItem={setIsEditItem}
                                                list={item?.analyses}/>
                        </div>

                        <Button onClick={() => {
                            setIsAddItem(true)
                            setActiveType(item?.id)
                        }}>
                            <i className={classNames("fa-solid fa-plus")}/>
                        </Button>
                    </div>
                </PriceAccordionList>
            )
        })
    }, [priceData])


    const onPost = (data: ISubmitData) => {


        request({
            url: "analysis/analysis_type/crud/create/",
            method: "POST",
            body: JSON.stringify(data),
            headers: headers()
        })
            .then(res => {
                dispatch(priceActions.onAddPriceType(res))
                setIsAdd(false)
                setValue("name", "")
            })
            .catch(err => {
                console.log(err)
            })
    }

    const onEditAnalysisName = (data: ISubmitData) => {


        setIsEdit(false)
        setValue("name", "")

        // dispatch(editAnalysisName({id: activeType, data: data}))

        request({
            url: `analysis/analysis_type/crud/update/${activeType}/`,
            method: "PUT",
            body: JSON.stringify(data),
            headers: headers()
        })
            .then(res => {
                dispatch(priceActions.editAnalysisName({id: activeType, data: res}))
            })
            .catch(err => {
                console.log(err)
            })
    }


    const onDeleteType = () => {

        setIsEdit(false)
        dispatch(priceActions.onDeleteAnalysisType(activeType))
        request({
            url: `analysis/analysis_type/crud/delete/${activeType}/`,
            method: "DELETE",
            headers: headers()
        })
            .catch(err => {
                console.log(err)
            })
    }


    // analysisGroup item

    const onPostData = (data: ISubmitData) => {

        const res = {
            ...data,
            device: selectOption,
            type: activeType,
        }

        setIsAddItem(false)
        // dispatch(onAddAnalysis({id: activeType, analyses: res}))
        // dispatch(onAddAnalysis({id: activeType, analyses: res}))

        request({
            url: "analysis/analysis/crud/create/",
            method: "POST",
            body: JSON.stringify(res),
            headers: headers()
        })
            .then(res => {
                dispatch(priceActions.onAddAnalysis({id: activeType, analyses: res}))

                setValue("name" , "")
                setValue("price" , "")

            })
            .catch(err => {
                console.log(err)
            })
    }





    const onEditAnalysisItem = (data: ISubmitData) => {

        const res = {
            ...data,
            type: Number(selectType),
            device: deviceType
        }


        // dispatch(onEditAnalysesName({id: Number(selectType) , analyses: {id: activeAnalysis, ...res}}))

        request({
            url: `analysis/analysis/crud/update/${activeAnalysis}/`,
            method: "PUT",
            body: JSON.stringify(res),
            headers: headers()
        })
            .then(res => {
                dispatch(priceActions.onEditAnalysesName({id: Number(selectType) , analyses: {id: activeAnalysis, ...res}}))
                setValue("name" , "")
                setValue("price" , "")
                setIsEditItem(false)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const onDeleteAnalysisItem = () => {

        // dispatch(onRemoveAnalysis({id: activeType , analyses: activeAnalysis}))
        dispatch(priceActions.onRemoveAnalysis({id: activeType , analyses: activeAnalysis}))
        setIsEditItem(false)
        request({
            url: `analysis/analysis/crud/delete/${activeAnalysis}/`,
            method: "DELETE",
            headers: headers()
        })

            .catch(err => {
                console.log(err)
            })
    }

    return (
        <DynamicModuleLoader reducers={reducers}>
            <div className={cls.pricePage}>
                <h1 className={cls.pricePage__title}>Цена анализов</h1>
                <Button onClick={() => setIsAdd(true)} extraClass={cls.pricePage__btn}>
                    <i className={classNames("fa-solid fa-plus")}/>
                </Button>
                <div className={cls.pricePage__container}>
                    {renderList()}
                </div>
            </div>




            {/*<Pagination*/}
            {/*    // totalCount={count}*/}
            {/*    onPageChange={setCurrentPage}*/}
            {/*    currentPage={currentPage}*/}
            {/*    pageSize={pageSize}*/}
            {/*/>*/}

            <Modal extraClass={cls.itemEdit} active={isAddItem} setActive={setIsAddItem} title={"Добавлять"}>

                <Form extraClass={cls.itemEdit__container}>
                    <Input register={register} name={"name"} placeholder={"Имя"}/>
                    <Input name={"price"} register={register} placeholder={"Цена"}/>
                    <Select setSelectOption={setSelectedOption} optionsData={deviceSelect}/>
                    <Button onClick={handleSubmit(onPostData)} extraClass={cls.itemEdit__btn}>
                        Добавлять
                    </Button>
                </Form>
            </Modal>


            <Modal extraClass={cls.itemEdit} active={isEditItem} setActive={setIsEditItem} title={"Редактировать"}>

                <Form extraClass={cls.itemEdit__container}>

                    <Input name={"name"} register={register} placeholder={"Имя"}/>

                    <Input name={"price"} placeholder={"Цена"} register={register}/>

                    <Select setSelectOption={setDeviceType} optionsData={deviceSelect}/>

                    <Select setSelectOption={setSelectType} selectOption={selectType}  optionsData={type}/>
                    <div className={cls.btns}>
                        <Button type={"danger"} onClick={handleSubmit(onDeleteAnalysisItem)}
                                extraClass={cls.itemEdit__btn}>
                            Удалить
                        </Button>
                        <Button onClick={handleSubmit(onEditAnalysisItem)} extraClass={cls.itemEdit__btn}>
                            Редактировать
                        </Button>
                    </div>
                </Form>
            </Modal>


            <Modal extraClass={cls.itemEdit} active={isAdd} setActive={setIsAdd} title={"Добавлять"}>
                <Form extraClass={cls.itemEdit__container}>

                    <Input name={"name"} register={register} placeholder={"Имя"}/>
                    {/*<Input name={"price"} placeholder={"Price"}/>*/}
                    <Button onClick={handleSubmit(onPost)} extraClass={cls.itemEdit__btn}>
                        Добавлять
                    </Button>
                </Form>
            </Modal>


            <Modal extraClass={cls.itemEdit} active={isEdit} setActive={setIsEdit} title={"Редактировать"}>

                <Form extraClass={cls.itemEdit__container}>
                    <Input register={register} name={"name"} placeholder={"Имя"}/>
                    {/*<Input name={"price"} placeholder={"Price"}/>*/}
                    <div className={cls.btns}>
                        <Button onClick={handleSubmit(onDeleteType)} type={"danger"}>
                            Удалить
                        </Button>
                        <Button onClick={handleSubmit(onEditAnalysisName)}>
                            Редактировать
                        </Button>

                    </div>

                </Form>
            </Modal>


        </DynamicModuleLoader>
    );
}
