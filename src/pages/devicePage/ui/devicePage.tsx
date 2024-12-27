import React, { useState } from 'react';
import {DeviceList, deviceListThunk} from 'entities/deviceList';
import cls from './devicePage.module.sass';
import { Modal } from 'shared/ui/modal';
import { Form } from 'shared/ui/form';
import { Input } from 'shared/ui/input';
import { Button } from 'shared/ui/button';
import classNames from 'classnames';

import {useDispatch} from "react-redux";
import {deviceThunk} from "entities/device";

export const DevicePage = () => {
    const [addItem, setAddItem] = useState<boolean>(false);
    const [name, setName] = useState('');
    const [ipAddress, setIpAddress] = useState('');
    const dispatch: any = useDispatch()
    const onPortal = () => {
        setAddItem(!addItem);
    };


    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        formData.append('name', name);
        formData.append('ip_address', ipAddress);
        formData.append('img', event.currentTarget.img.files[0]);

        dispatch(deviceThunk(formData))


    };

    return (
        <div className={cls.deviceBox}>
            <Button extraClass={cls.addItemBtn} onClick={onPortal}>
                <i className={classNames("fas fa-plus")} />
            </Button>
            <DeviceList />

            <Modal extraClass={cls.addItemBox} active={addItem} setActive={setAddItem}>
                <Form onSubmit={handleFormSubmit}>
                    <Input extraClass={cls.addItemBox__input} name="name" placeholder="Name device" onChange={setName} />
                    <Input extraClass={cls.addItemBox__input} name="ip_address" placeholder="Enter IP Address" onChange={setIpAddress} />
                    <Input extraClass={cls.addItemBox__input} name="img" type="file" />
                    <Button>Add Device</Button>
                </Form>
            </Modal>
        </div>
    );
};
