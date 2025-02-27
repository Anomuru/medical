import React, {useCallback, useEffect, useState} from 'react';
import {DeviceList, deviceListActions, deviceListReducer, deviceListThunk} from 'entities/deviceList';
import cls from './devicePage.module.sass';
import {Modal} from 'shared/ui/modal';
import {Form} from 'shared/ui/form';
import {Input} from 'shared/ui/input';
import {Button} from 'shared/ui/button';
import classNames from 'classnames';

import {useDispatch, useSelector} from "react-redux";
import {deviceThunk} from "entities/deviceList";
import {
    DynamicModuleLoader,
    ReducersList
} from "../../../shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {headerImg, useHttp} from "../../../shared/api/base";
import {Select} from "../../../shared/ui/select";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {fetchBranchData, getBranchesData} from "entities/oftenUsed";
import {getSelectedLocationData} from "../../../entities/oftenUsed/model/selector/oftenUsedSelector";
import {getUserBranch} from "entities/user";

const reducers: ReducersList = {
    deviceListSlice: deviceListReducer,
}

export const DevicePage = () => {
    const [addItem, setAddItem] = useState<boolean>(false);
    const [name, setName] = useState<string>();
    const [ipAddress, setIpAddress] = useState<string>();
    const [selectedBranch, setSelectedBranch] = useState<number>()
    const {request} = useHttp()
    const dispatch = useAppDispatch()
    const selectedLocationId = useSelector(getSelectedLocationData)
    // const branchData = branch?.results;
    const branchData = useSelector(getBranchesData)

    // useEffect(() => {
    //     // dispatch(getBranchThunk())
    //     if (selectedLocationId)
    //         dispatch(fetchBranchData({id: selectedLocationId}))
    // }, [selectedLocationId])

    const userBranch = useSelector(getUserBranch)

    useEffect(() => {
        if (userBranch) {
            setSelectedBranch(userBranch)
        }
    },[userBranch])

    const onPortal = () => {
        setAddItem(!addItem);
    };



    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!(name && ipAddress && selectedBranch)) return

        const formData = new FormData(event.currentTarget);
        formData.append('name', name);
        formData.append('ip_address', ipAddress);
        formData.append('branch', String(selectedBranch))
        formData.append('img', event.currentTarget.img.files[0]);
        request({
            url: `device/crud/create/`,
            method: "POST",
            body: formData,
            headers: headerImg()
        })
            .then(res => {
                dispatch(deviceListActions.addDevice(res))
                setAddItem(false)
            })
            .catch(err => {
                console.log(err)
            })


    };

    const getName = useCallback((data: string) => setName(data), [])
    const getIpAddress = useCallback((data: string) => setIpAddress(data), [])

    return (
        <DynamicModuleLoader reducers={reducers}>
            <div className={cls.deviceBox}>
                <Button extraClass={cls.addItemBtn} onClick={onPortal}>
                    <i className={classNames("fa-solid fa-plus")}/>
                </Button>
                <DeviceList/>

                <Modal type={"simple"} extraClass={cls.addItemBox} active={addItem} setActive={setAddItem}
                       title={"Добавить устройство"}>
                    <Form onSubmit={handleFormSubmit}>
                        <Input extraClass={cls.addItemBox__input} name="name" placeholder="Имя устройства"
                               onChange={getName}
                               required
                        />
                        <Input extraClass={cls.addItemBox__input} name="ip_address" placeholder="Введите IP-адрес"
                               onChange={getIpAddress} required/>
                        <Input extraClass={cls.addItemBox__input} name="img" type="file"/>
                        {/*<Select*/}
                        {/*    extraClass={cls.addItemBox__select}*/}
                        {/*    setSelectOption={setSelectedBranch}*/}
                        {/*    optionsData={branchData}*/}
                        {/*/>*/}

                        <Button>Добавить устройство</Button>
                    </Form>
                </Modal>
            </div>
        </DynamicModuleLoader>
    );
};
