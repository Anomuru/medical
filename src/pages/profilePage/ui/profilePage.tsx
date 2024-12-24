import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {ProfileModal} from "features/profile";
import {getStaffId, fetchStaffProfileData} from "entities/staff";
import {Box} from "shared/ui/box";
import {Button} from "shared/ui/button";
import {Form} from "shared/ui/form";
import {Input} from "shared/ui/input";

import cls from './profilePage.module.sass'
import profileImg from 'shared/assets/images/profileImage.png'

export const ProfilePage = () => {

    const dispatch = useDispatch()
    const staffId = useSelector(getStaffId)

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchStaffProfileData(staffId))
    }, [dispatch, staffId])
    
    const [isTimeTable, setIsTimeTable] = useState<boolean>(false)

    return (
        <>
            <div className={cls.profileBox}>
                <div className={cls.profileBox__leftSide}>
                    <Box extraClass={cls.profileBox__leftSide__profileContainer}>
                        <img className={cls.profileBox__leftSide__profileContainer__img} src={profileImg} alt=""/>
                        <h1 className={cls.profileBox__leftSide__profileContainer__name}>Doctor D</h1>
                        <h2 className={cls.profileBox__leftSide__profileContainer__mail}>doctord@dmail.com</h2>
                    </Box>
                    <div className={cls.profileBox__leftSide__menuBox}>
                        <Button extraClass={cls.profileBox__leftSide__menuBox__editBtn} children={"Edit profile"}/>
                        <Button onClick={() => setIsTimeTable(true)} extraClass={cls.profileBox__leftSide__menuBox__editBtn} children={"Time table"}/>
                        <Button extraClass={cls.profileBox__leftSide__menuBox__editBtn} children={"Choose plan"}/>
                    </div>
                </div>
                <div className={cls.profileBox__rigthSide}>
                    <Box extraClass={cls.profileBox__rigthSide__profileSetBox}>
                        <h1 className={cls.profileBox__rigthSide__profileSetBox__heading}>Profile</h1>
                        <h1 className={cls.profileBox__rigthSide__profileSetBox__heading}>Details</h1>
                        <Form extraClass={cls.profileBox__rigthSide__profileSetBox__formBox}>
                            <Input extraClass={cls.profileBox__rigthSide__profileSetBox__formBox__input} title={"Name"} placeholder={"userName"} name={"name"}/>
                            <Input extraClass={cls.profileBox__rigthSide__profileSetBox__formBox__input} title={"Suraname"} placeholder={"userSurname"} name={"surname"}/>
                            <Input extraClass={cls.profileBox__rigthSide__profileSetBox__formBox__input} title={"Email"} placeholder={"userMail"} name={"email"}/>
                            <Input extraClass={cls.profileBox__rigthSide__profileSetBox__formBox__input} title={"Phone"} placeholder={"userPhone"} name={"phone"} type={'number'}/>
                            <Button children={"Save changes"} />
                        </Form>
                        <h1 className={cls.profileBox__rigthSide__profileSetBox__heading}>Details</h1>
                        <Form extraClass={cls.profileBox__rigthSide__profileSetBox__formBox}>
                            <Input extraClass={cls.profileBox__rigthSide__profileSetBox__formBox__input} title={"Name"} placeholder={"userName"} name={"name"}/>
                            <Input extraClass={cls.profileBox__rigthSide__profileSetBox__formBox__input} title={"Suraname"} placeholder={"userSurname"} name={"surname"}/>
                            <Input extraClass={cls.profileBox__rigthSide__profileSetBox__formBox__input} title={"Email"} placeholder={"userMail"} name={"email"}/>
                            <Input extraClass={cls.profileBox__rigthSide__profileSetBox__formBox__input} title={"Phone"} placeholder={"userPhone"} name={"phone"} type={'number'}/>
                            <Button children={"Save changes"} />
                        </Form>

                    </Box>
                </div>
            </div>

            <ProfileModal active={isTimeTable} setActive={setIsTimeTable}/>

        </>
    );
};
