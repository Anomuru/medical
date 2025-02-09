import React, {ChangeEvent, useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {AnalysisData, ProfileModal} from "features/profile";
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
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {data, Navigate, NavLink, Outlet, Route, Routes, useNavigate, useParams} from "react-router";
import classNames from "classnames";
import {profileAnalysisReducer} from "../../../features/profile/model/slice/profileAnalysisSlice";
import {packetsReducer} from "../../../entities/pakets";
import {ROLES} from "shared/const/roles";
import {getUserRole} from "entities/user";


const reducers: ReducersList = {
    packetsSlice: packetsReducer,
    staffProfileSlice: staffProfileReducer,
    profileAnalysisSlice: profileAnalysisReducer,

}

const dataButton = [
    {
        name: "Profile",
        path: "profile",
        role: [ROLES.patient,ROLES.admin,ROLES.mainAdmin,ROLES.operator,ROLES.reception]
    },
    {
        name: "TimeTable",
        path: "timeTable",
        role: [ROLES.admin,ROLES.mainAdmin,ROLES.operator,ROLES.reception]
    },
    // {
    //     name: "Schedule",
    //     path: "schedule",
    //     role: [ROLES.patient]
    // },
    {
        name: "Analysis",
        path: "analysis",
        role: [ROLES.patient]
    }
]

export const ProfilePage = () => {

    const {request} = useHttp()
    const dispatch = useDispatch()
    const {register, handleSubmit, setValue} = useForm()
    const {id: staffId} = useParams()
    const details = useSelector(getStaffProfileData)

    const meRole  = useSelector(getUserRole)

    const staffDetails = useMemo(() => [
        {
            name: "username",
            placeholder: "Enter username",
            title: "Username",
            rules: {value: details?.username}
        }, {
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

        // @ts-ignore
        dispatch(changeStaffDetails({staffId, data}))
    }

    const onSubmitPassword = (data: any) => {
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

        request({
            url: `user/username-check-authorized/`,
            method: "POST",
            body: JSON.stringify({username: data, pk: details?.id})
        })
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    // const onSubmitPassword = useDebounce(async (data: any) => {
    //     await console.log(data, "data")
    // }, 500)

    const renderChangeParams = useCallback(() => {

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

    const [active, setActive] = useState<string>(dataButton[0].name)

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
                        {/*<Button onClick={() => navigate(`profile`)}*/}
                        {/*        extraClass={cls.profileBox__leftSide__menuBox__editBtn} children={"Edit profile"}/>*/}
                        {/*<Button onClick={() => setIsTimeTable(true)}*/}
                        {/*        extraClass={cls.profileBox__leftSide__menuBox__editBtn} children={"Time table"}/>*/}
                        {/*<Button onClick={() => navigate(`profile2`)}*/}
                        {/*        extraClass={cls.profileBox__leftSide__menuBox__editBtn} children={"Choose plan"}/>*/}
                        {/*<Button extraClass={cls.profileBox__leftSide__menuBox__editBtn} children={"Analyses"}/>*/}

                        {
                            dataButton.map(item => {
                                console.log(item.role, details?.job)
                                if (item.role && details?.job && item.role.includes(details?.job)) {
                                    return (
                                        <NavLink
                                            to={`./../${item.path}`}
                                            onClick={() => {
                                                setActive(item.name)
                                                // localStorage.setItem("route", item.path)
                                            }}
                                        >
                                            <Button extraClass={classNames(cls.profileBox__leftSide__menuBox__editBtn , {
                                                [cls.active] : item.name === active
                                            })} children={`${item.name}`}/>
                                        </NavLink>
                                    )
                                }
                            })
                        }
                    </div>



                </div>
                <Outlet/>

                <Routes>

                    <Route index element={<Navigate to={`profile`}/>}/>

                    <Route path={"profile"} element={<>
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
                                    {/*       placeholder={"userPhone"} name={"phone_number"} types={'number'}*/}
                                    {/*       rules={{value: details?.phone_number}} register={register}/>*/}
                                    <>
                                        {render}
                                    </>
                                    <Button extraClass={cls.profileBox__rigthSide__profileSetBox__formBox__btn}
                                            children={"Save changes"}/>
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
                                    {/*    types={'number'}*/}
                                    {/*/>*/}
                                    <Button extraClass={cls.profileBox__rigthSide__profileSetBox__formBox__btn}
                                            children={"Save changes"}/>
                                </Form>

                            </Box>
                        </div>
                    </>}/>

                    <Route path={"analysis"} element={<AnalysisData/>}/>



                </Routes>

            </div>

            <ProfileModal active={isTimeTable} setActive={setIsTimeTable}/>
        </DynamicModuleLoader>
    )
        ;
};
