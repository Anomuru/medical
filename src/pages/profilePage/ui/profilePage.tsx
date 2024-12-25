import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {ProfileModal} from "features/profile";
import {getStaffId, fetchStaffProfileData, getStaffProfileData} from "entities/staff";
import {Box} from "shared/ui/box";
import {Button} from "shared/ui/button";
import {Form} from "shared/ui/form";
import {Input} from "shared/ui/input";

import cls from './profilePage.module.sass'
import profileImg from 'shared/assets/images/profileImage.png'
import {useForm} from "react-hook-form";
import {changeStaffDetails} from "../../../entities/staff/model/thunk/staffProfileThunk";

export const ProfilePage = () => {

    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const staffId = useSelector(getStaffId)
    const details = useSelector(getStaffProfileData)

    const staffDetails = useMemo(() => [
        {
            name: "name",
            placeholder: "Enter name",
            title: "Name",
            rules: {value: details?.name}
        }, {
            name: "surname",
            placeholder: "Enter surname",
            title: "Surname",
            rules: {value: details?.surname}
        }, {
            name: "email",
            placeholder: "Enter email",
            title: "Email",
            rules: {value: details?.email}
        }, {
            name: "phone_number",
            placeholder: "Enter phone",
            title: "Phone",
            type: "number",
            rules: {value: details?.phone_number}
        },
    ], [details])

    useEffect(() => {
        if (staffId) {
            console.log(staffId, "id 2")
            // @ts-ignore
            dispatch(fetchStaffProfileData({staffId}))
        }
    }, [dispatch, staffId])

    const [isTimeTable, setIsTimeTable] = useState<boolean>(false)

    const onSubmit = (data: any) => {
        console.log(data, "data")
        // @ts-ignore
        dispatch(changeStaffDetails({staffId}))
    }

    const renderChangeParams = useCallback(() => {
        console.log(staffDetails, "staffDetails")
        return staffDetails.map(item => {
            return (
                <Input
                    extraClass={cls.profileBox__rigthSide__profileSetBox__formBox__input}
                    title={item.title}
                    placeholder={item.placeholder}
                    name={item.name}
                    rules={item.rules}
                    register={register}
                    type={item.type}
                />
            )
        })
    }, [register, staffDetails])

    const render = renderChangeParams()

    return (
        <>
            <div className={cls.profileBox}>
                <div className={cls.profileBox__leftSide}>
                    <Box extraClass={cls.profileBox__leftSide__profileContainer}>
                        <img className={cls.profileBox__leftSide__profileContainer__img} src={profileImg} alt=""/>
                        <h1 className={cls.profileBox__leftSide__profileContainer__name}>{details?.name} {details?.surname}</h1>
                        <h2 className={cls.profileBox__leftSide__profileContainer__mail}>{details?.email}</h2>
                    </Box>
                    <div className={cls.profileBox__leftSide__menuBox}>
                        <Button extraClass={cls.profileBox__leftSide__menuBox__editBtn} children={"Edit profile"}/>
                        <Button onClick={() => setIsTimeTable(true)}
                                extraClass={cls.profileBox__leftSide__menuBox__editBtn} children={"Time table"}/>
                        <Button extraClass={cls.profileBox__leftSide__menuBox__editBtn} children={"Choose plan"}/>
                    </div>
                </div>
                <div className={cls.profileBox__rigthSide}>
                    <Box extraClass={cls.profileBox__rigthSide__profileSetBox}>
                        <h1 className={cls.profileBox__rigthSide__profileSetBox__heading}>Profile</h1>
                        <h1 className={cls.profileBox__rigthSide__profileSetBox__heading}>Details</h1>
                        <Form extraClass={cls.profileBox__rigthSide__profileSetBox__formBox}
                              onSubmit={handleSubmit(onSubmit)}>
                            {/*<Input extraClass={cls.profileBox__rigthSide__profileSetBox__formBox__input} title={"Name"}*/}
                            {/*       placeholder={"userName"} name={"name"} rules={{value: details?.name}}*/}
                            {/*       register={register}/>*/}
                            {/*<Input extraClass={cls.profileBox__rigthSide__profileSetBox__formBox__input}*/}
                            {/*       title={"Suraname"} placeholder={"userSurname"} name={"surname"}*/}
                            {/*       rules={{value: details?.surname}} register={register}/>*/}
                            {/*<Input extraClass={cls.profileBox__rigthSide__profileSetBox__formBox__input} title={"Email"}*/}
                            {/*       placeholder={"userMail"} name={"email"} rules={{value: details?.email}}*/}
                            {/*       register={register}/>*/}
                            {/*<Input extraClass={cls.profileBox__rigthSide__profileSetBox__formBox__input} title={"Phone"}*/}
                            {/*       placeholder={"userPhone"} name={"phone_number"} type={'number'}*/}
                            {/*       rules={{value: details?.phone_number}} register={register}/>*/}
                            <>
                                {render}
                            </>
                            <Button children={"Save changes"}/>
                        </Form>
                        <h1 className={cls.profileBox__rigthSide__profileSetBox__heading}>Details</h1>
                        <Form extraClass={cls.profileBox__rigthSide__profileSetBox__formBox}>
                            <Input extraClass={cls.profileBox__rigthSide__profileSetBox__formBox__input} title={"Name"}
                                   placeholder={"userName"} name={"name"}/>
                            <Input extraClass={cls.profileBox__rigthSide__profileSetBox__formBox__input}
                                   title={"Suraname"} placeholder={"userSurname"} name={"surname"}/>
                            <Input extraClass={cls.profileBox__rigthSide__profileSetBox__formBox__input} title={"Email"}
                                   placeholder={"userMail"} name={"email"}/>
                            <Input extraClass={cls.profileBox__rigthSide__profileSetBox__formBox__input} title={"Phone"}
                                   placeholder={"userPhone"} name={"phone"} type={'number'}/>
                            <Button children={"Save changes"}/>
                        </Form>

                    </Box>
                </div>
            </div>

            <ProfileModal active={isTimeTable} setActive={setIsTimeTable}/>

        </>
    );
};
