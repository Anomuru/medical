import React, {useCallback, useState} from 'react';
import {DeviceList, deviceListActions, deviceListReducer, deviceListThunk} from 'entities/deviceList';
import cls from './devicePage.module.sass';
import {Modal} from 'shared/ui/modal';
import {Form} from 'shared/ui/form';
import {Input} from 'shared/ui/input';
import {Button} from 'shared/ui/button';
import classNames from 'classnames';

import {useDispatch} from "react-redux";
import {deviceThunk} from "entities/device";
import {
    DynamicModuleLoader,
    ReducersList
} from "../../../shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {headerImg, useHttp} from "../../../shared/api/base";

const reducers: ReducersList = {
    deviceListSlice: deviceListReducer
}

export const DevicePage = () => {
    const [addItem, setAddItem] = useState<boolean>(false);
    const [name, setName] = useState<string>();
    const [ipAddress, setIpAddress] = useState<string>();
    const {request} = useHttp()
    const dispatch: any = useDispatch()
    const onPortal = () => {
        setAddItem(!addItem);
    };


    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!(name && ipAddress)) return

        const formData = new FormData(event.currentTarget);
        formData.append('name', name);
        formData.append('ip_address', ipAddress);
        formData.append('img', event.currentTarget.img.files[0]);
        request({
            url: `device/crud/create/`,
            method: "POST",
            body: formData,
            //@ts-ignore
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
                    <i className={classNames("fas fa-plus")}/>
                </Button>
                <DeviceList/>

                <Modal type={"simple"} extraClass={cls.addItemBox} active={addItem} setActive={setAddItem}>
                    <Form onSubmit={handleFormSubmit}>
                        <Input extraClass={cls.addItemBox__input} name="name" placeholder="Name device"
                               onChange={getName}/>
                        <Input extraClass={cls.addItemBox__input} name="ip_address" placeholder="Enter IP Address"
                               onChange={getIpAddress}/>
                        <Input extraClass={cls.addItemBox__input} name="img" type="file"/>
                        <Button>Add Device</Button>
                    </Form>
                </Modal>
            </div>
        </DynamicModuleLoader>
    );
};
