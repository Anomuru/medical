import React, {useCallback, useEffect, useState} from 'react';
import cls from './storage.module.sass';
import { Button } from 'shared/ui/button';
import classNames from 'classnames';
import { Modal } from 'shared/ui/modal';
import { Form } from 'shared/ui/form';
import { Input } from 'shared/ui/input';
import { Table } from 'shared/ui/table';
import { Pagination } from 'features/pagination';
import { Radio } from 'shared/ui/radio';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { createStorageReducer } from 'features/storage/model/storageSlice';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    createStorageThunk,
    deleteStorageThunk,
    getStorageThunk,
    updateStorageThunk
} from 'features/storage/model/storageThunk';
import {ugetStorageReducer} from "features/storage/model/getStorageSlice";
import {useSelector} from "react-redux";
import {getStorageList} from "features/storage/model/storageSelectors";

interface StorageProps {
    name: string;
    code_name: number;
    size: string;
    total_number: number;
}

interface EStorageProps {
    name: string;
    size: string;
    overall_count: number;
    storage: number | undefined
    payment_id: number
    price: number
    date: string

}


const reducers: ReducersList = {
    storageSlice: createStorageReducer,
    getStorageSlice: ugetStorageReducer
};

const radio = [
    { id: 1, name: 'click' },
    { id: 2, name: 'cash' },
];

export const StorageHeader = () => {
    const {
        register: regToCreate,
        handleSubmit: submitToCreate,
        formState: { errors },
    } = useForm<StorageProps>({
        defaultValues: {
            name: '',
            code_name: 0,
            size: '',
            total_number: 0,
        },
    });
    const {
        register: regToUpdate,
        handleSubmit: submitToUpdate,
    } = useForm<EStorageProps>();

    const [active, setActive] = useState<boolean>(false);
    const [portal, setPortal] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [id, setId] = useState<number>()
    const [selectedRadio, setSelectedRadio] = useState<number>();
    const getData = useSelector(getStorageList)
    const branchId = localStorage.getItem("branch")
    const getSelectedRadio = useCallback((data: number) => setSelectedRadio(data), []);
    const dispatch = useAppDispatch();

    const onSubmit: SubmitHandler<StorageProps> = async (data) => {
        const formattedData = {
            ...data,
            code_name: Number(data.code_name),
            total_number: Number(data.total_number),
        };

        try {
            await dispatch(createStorageThunk(formattedData));
            dispatch(getStorageThunk());
            setActive(!active);
        } catch (error) {
            console.error("Xatolik yuz berdi:", error);
        }
    };
    const onEdit: SubmitHandler<EStorageProps> =(data) => {
        const formmattedData = {
            ...data,
            payment_id: Number(selectedRadio),
            overall_count: Number(data.overall_count),
            storage_id: 2,
            branch_id: branchId
        }
        dispatch(updateStorageThunk({data: formmattedData}))

    }

    const onDelete: SubmitHandler<StorageProps> = () => {
        dispatch(deleteStorageThunk(id))
        setPortal(!portal)
    }




    const onAddInnerItem = () => {
        setPortal(!portal);
    };
    const onAddItem = () => {
        setActive(!active);
    };

    useEffect(() => {
        dispatch(getStorageThunk())
    }, [])



    console.log(getData, 'ed')

    const renderTable = useCallback(() => {
        return getData?.map((item, index) => (
            <tr onClick={() =>
            {onAddInnerItem(); setId(item.id)}
            } className={cls.arounder}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.code_name}</td>
                <td>{item.size}</td>
                <td>{item.total_number}</td>
            </tr>
        ));
    }, [getData]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <div className={cls.container}>
                <Button
                    extraClass={cls.container__btn}
                    onClick={onAddItem}
                    children={<i className={classNames('fa-solid fa-plus')} />}
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
                        <tbody>{renderTable()}</tbody>
                    </Table>
                </div>

                <Pagination
                    totalCount={6}
                    onPageChange={setCurrentPage}
                    currentPage={currentPage}
                    pageSize={10}
                />
                <Modal extraClass={cls.iteModal} title={'Добавлять'} active={active} setActive={setActive}>
                    <Form onSubmit={submitToCreate(onSubmit)} extraClass={cls.iteModal__form}>
                        <Input register={regToCreate} name={'name'} placeholder={'Имя'} />
                        <Input
                            register={regToCreate}
                            name={'code_name'}
                            placeholder={'Кодовое имя'}
                            type={'number'}
                        />
                        <Input register={regToCreate} name={'size'} placeholder={'Размер'} />
                        <Input
                            register={regToCreate}
                            name={'total_number'}
                            placeholder={'Общее количество'}
                            type={'number'}
                        />
                        <Button extraClass={cls.iteModal__form__btn} children={'Добавлять'} />
                    </Form>
                </Modal>
                <Modal extraClass={cls.iteModal} title={'Добавлять'} active={portal} setActive={setPortal}>
                        <Form onSubmit={submitToUpdate(onEdit)}  extraClass={cls.iteModal__form}>
                            <Input register={regToUpdate} name={'name'} placeholder={'Имя'} />
                            <Input register={regToUpdate} name={'size'} placeholder={'Размер'} />
                            <Input register={regToUpdate} name={'overall_count'} placeholder={'Общее количество'} />
                            <div className={cls.iteModal__form__radios}>
                                {radio.map((item) => (
                                    <Radio
                                        name={'type'}
                                        value={item.id}
                                        onChange={getSelectedRadio}
                                        checked={item.id === selectedRadio}
                                    >
                                        {item.name}
                                    </Radio>
                                ))}
                            </div>
                            <Input register={regToUpdate} name={'price'} placeholder={'цена'} />
                            <Input register={regToUpdate} name={'date'} placeholder={'дата'} type={'date'} />
                            <div style={{display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center"}}>
                                <Button onClick={onDelete} extraClass={cls.iteModal__form__delBtn} children={'Удалить'} />
                                <Button extraClass={cls.iteModal__form__btn} children={'Добавлять'} />
                            </div>

                        </Form>
                </Modal>
            </div>
        </DynamicModuleLoader>
    );
};