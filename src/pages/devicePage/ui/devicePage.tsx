import React, { useState } from 'react';
import { DeviceList } from 'entities/deviceList';
import cls from './devicePage.module.sass';
import { Modal } from 'shared/ui/modal';
import { Form } from 'shared/ui/form';
import { Input } from 'shared/ui/input';
import { Button } from 'shared/ui/button';
import classNames from 'classnames';
import {API_URL} from "../../../shared/api/api";

export const DevicePage = () => {
    const [addItem, setAddItem] = useState<boolean>(false);
    const [name, setName] = useState('');
    const [ipAddress, setIpAddress] = useState('');
    const onPortal = () => {
        setAddItem(!addItem);
    };

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        formData.append('name', name);
        formData.append('ip_address', ipAddress);
        formData.append('img', event.currentTarget.img.files[0]);

        try {
            const response = await fetch(`${API_URL}device/crud/create/`, {
                method: 'POST',
                body: formData,
                headers: {}
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Success:', data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className={cls.deviceBox}>
            <DeviceList />
            <Button extraClass={cls.addItemBtn} onClick={onPortal}>
                <i className={classNames("fas fa-plus")} />
            </Button>
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
