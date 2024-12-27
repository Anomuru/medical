import React, {ChangeEvent, useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {ProfileModal} from "features/profile";
import {getStaffId, fetchStaffProfileData, getStaffProfileData, staffProfileReducer} from "entities/staff";
import {Box} from "shared/ui/box";
import {Button} from "shared/ui/button";
import {Form} from "shared/ui/form";
import {Input} from "shared/ui/input";

import cls from './profilePage.module.sass'
import profileImg from 'shared/assets/images/profileImage.png'
import {useForm, useWatch} from "react-hook-form";
import {useHttp} from "shared/api/base";
import {changeStaffDetails} from "../../../entities/staff/model/thunk/staffProfileThunk";
import {
    DynamicModuleLoader,
    ReducersList
} from "../../../shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {useParams} from "react-router";
import {useDebounce} from "../../../shared/lib/hooks/useDebounce";

const reducers: ReducersList = {
    staffProfileSlice: staffProfileReducer
}

export const ProfilePage = () => {

    const {request} = useHttp()
    const dispatch = useDispatch()
    const {register, handleSubmit, setValue} = useForm()
    const {id: staffId} = useParams()
    const details = useSelector(getStaffProfileData)

    const staffDetails = useMemo(() => [
        {
            name: "username",
            placeholder: "Enter username",
            title: "Username",
            rules: {value: details?.username}
        },{
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
    const [passwordError, setPasswordError] = useState<string>("")

    const onSubmit = (data: any) => {
        console.log(data, "data")
        // @ts-ignore
        dispatch(changeStaffDetails({staffId, data}))
    }

    const onSubmitPassword = (data: any) => {
        console.log(data.password.length, "length")
        console.log(data.password.length < 8)
        if (data.password.length < 8 || data.confirm_password.length < 8) setPasswordError("less_than_8")
        else {
            if (data.password === data.confirm_password) {
                // @ts-ignore
                dispatch(changeStaffDetails({staffId, data}))
                setPasswordError("")
            } else setPasswordError("identical")
        }
    }

    const onCheckUsername = (data: string) => {
        console.log(data, "data")
        request({
            url: `user/username-check/${details?.id}/`,
            method: "POST",
            body: JSON.stringify({username: data})
        })
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    // const onSubmitPassword = useDebounce(async (data: any) => {
    //     await console.log(data, "data")
    // }, 500)

    const renderChangeParams = useCallback(() => {
        console.log(staffDetails, "staffDetails")
        return staffDetails.map(item => {
            setValue(item.name, item.rules.value)
            return (
                <Input
                    extraClass={cls.profileBox__rigthSide__profileSetBox__formBox__input}
                    title={item.title}
                    placeholder={item.placeholder}
                    name={item.name}
                    // rules={item.rules}
                    register={register}
                    type={item.type}
                    onChange={item.name === "username" ? onCheckUsername : undefined}
                />
            )
        })
    }, [register, setValue, staffDetails])

    const render = renderChangeParams()

    return (
        <DynamicModuleLoader reducers={reducers}>
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
                        <Button extraClass={cls.profileBox__leftSide__menuBox__editBtn} children={"Analyses"}/>
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
                            <Button extraClass={cls.profileBox__rigthSide__profileSetBox__formBox__btn} children={"Save changes"}/>
                        </Form>
                        <h1 className={cls.profileBox__rigthSide__profileSetBox__heading}>Details</h1>
                        <Form extraClass={cls.profileBox__rigthSide__profileSetBox__formBox}
                              onSubmit={handleSubmit(onSubmitPassword)}>
                            <Input
                                // extraClass={cls.profileBox__rigthSide__profileSetBox__formBox__input}
                                title={"Password"}
                                placeholder={"Enter Password"}
                                name={"password"}
                                register={register}
                                type={"password"}
                            />
                            <Input
                                // extraClass={cls.profileBox__rigthSide__profileSetBox__formBox__input}
                                title={"Confirm Password"}
                                placeholder={"Confirm Password"}
                                name={"confirm_password"}
                                register={register}
                                type={"password"}
                                // onChange={onSubmitPassword}
                            />
                            <>
                                {
                                    passwordError ?
                                        <p className={cls.profileBox__rigthSide__profileSetBox__formBox__error}>
                                            {
                                                passwordError === "identical" ? "The passwords are not identical" :
                                                    passwordError === "less_than_8" ? "The passwords are less than 8 symbols" : null
                                            }
                                        </p>
                                        : null
                                }
                            </>

                            {/*<Input*/}
                            {/*    extraClass={cls.profileBox__rigthSide__profileSetBox__formBox__input} title={"Email"}*/}
                            {/*    placeholder={"userMail"}*/}
                            {/*    name={"email"}*/}
                            {/*/>*/}
                            {/*<Input*/}
                            {/*    extraClass={cls.profileBox__rigthSide__profileSetBox__formBox__input}*/}
                            {/*    title={"Phone"}*/}
                            {/*    placeholder={"userPhone"}*/}
                            {/*    name={"phone"}*/}
                            {/*    type={'number'}*/}
                            {/*/>*/}
                            <Button extraClass={cls.profileBox__rigthSide__profileSetBox__formBox__btn} children={"Save changes"}/>
                        </Form>

                    </Box>
                </div>
            </div>

            <ProfileModal active={isTimeTable} setActive={setIsTimeTable}/>
        </DynamicModuleLoader>
    );
};
