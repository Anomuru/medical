import React from 'react';
import {Storage} from "entities/storage/ui/storage";
import {StorageHeader} from "features/storage";

export const StoragePage = () => {
    return (
        <div>
            <h1>Storage</h1>
            <StorageHeader/>
            <Storage/>
        </div>
    );
};


