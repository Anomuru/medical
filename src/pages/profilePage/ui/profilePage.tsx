import React, {ChangeEvent, useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {AnalysisData, PaymentsList, ProfileModal} from "features/profile";
import {
    getStaffId,
    fetchStaffProfileData,
    getStaffProfileData,
    staffProfileReducer,
    staffProfileActions
} from "entities/staff";
import {Box} from "shared/ui/box";
import {Button} from "shared/ui/button";
import {Form} from "shared/ui/form";
import {Input} from "shared/ui/input";

import cls from './profilePage.module.sass'
import profileImg from 'shared/assets/images/profileImage.png'
import {useForm, useWatch} from "react-hook-form";
import {headers, useHttp} from "shared/api/base";
import {changeStaffDetails} from "../../../entities/staff/model/thunk/staffProfileThunk";
import {
    DynamicModuleLoader,
    ReducersList
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {data, Navigate, NavLink, Outlet, Route, Routes, useNavigate, useParams} from "react-router";
import classNames from "classnames";
import {profileAnalysisReducer} from "../../../features/profile/model/slice/profileSlice";
import {packetsReducer} from "../../../entities/pakets";
import {ROLES} from "shared/const/roles";
import {getUserRole} from "entities/user";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {useDropzone} from "react-dropzone";
import {Simulate} from "react-dom/test-utils";
import change = Simulate.change;
import {Modal} from "../../../shared/ui/modal";
import {alertAction} from "../../../features/alert/model/slice/alertSlice";
import {givePaymentReducer} from "../../../features/paymentFeature/model/givePaymentSlice";


const reducers: ReducersList = {
    packetsSlice: packetsReducer,
    staffProfileSlice: staffProfileReducer,
    profileAnalysisSlice: profileAnalysisReducer,
    givePaymentSlice: givePaymentReducer

}

const dataButton = [
    {
        name: "Профиль",
        path: "profile",
        role: [ROLES.patient, ROLES.admin, ROLES.mainAdmin, ROLES.operator, ROLES.reception]
    },
    {
        name: "Расписание",
        path: "timeTable",
        role: [ROLES.admin, ROLES.mainAdmin, ROLES.operator, ROLES.reception]
    },
    // {
    //     name: "Schedule",
    //     path: "schedule",
    //     role: [ROLES.patient]
    // },
    {
        name: "Анализ",
        path: "analysis",
        role: [ROLES.patient]
    },
    {
        name: "Платежи",
        path: "payments",
        role: [ROLES.patient]
    }
]

interface ISubmitProps {
    username: string,
    name: string,
    surname: string,
    email: string,
    phone_number: string,
}

export const ProfilePage = () => {

    const {request} = useHttp()
    const dispatch = useAppDispatch()
    const {
        register,
        handleSubmit,
        setValue
    } = useForm<ISubmitProps>()
    const {id: staffId} = useParams()
    const details = useSelector(getStaffProfileData)

    const meRole = useSelector(getUserRole)

    const staffDetails : {
        name: "username" | "name" | "surname" | "email" | "phone_number",
        placeholder: string,
        title: string
        rules: any,
        type?: string
    }[] = useMemo(() => [
        {
            name: "username",
            placeholder: "Введите имя пользователя",
            title: "Имя пользователя",
            rules: {value: details?.username}
        }, {
            name: "name",
            placeholder: "Введите имя",
            title: "Имя",
            rules: {value: details?.name}
        }, {
            name: "surname",
            placeholder: "Введите фамилию",
            title: "Фамилия",
            rules: {value: details?.surname}
        }, {
            name: "email",
            placeholder: "Введите адрес электронной почты",
            title: "Электронная почта",
            rules: {value: details?.email}
        }, {
            name: "phone_number",
            placeholder: "Введите телефон",
            title: "Телефон",
            type: "number",
            rules: {value: details?.phone_number}
        },
    ], [details])

    useEffect(() => {
        if (staffId) {
            dispatch(fetchStaffProfileData(staffId))
        }
    }, [])

    console.log(details , "det")
    const [isTimeTable, setIsTimeTable] = useState<boolean>(false)
    const [editModal, setEditModal] = useState<boolean>(false)
    const [passwordError, setPasswordError] = useState<string>("")
    const [files, setFiles] = useState<any>(null);
    const formData = new FormData()

    const {getRootProps, getInputProps} = useDropzone({
        accept: {
            'image/*': [],
        },
        onDrop: (acceptedFiles) => {
            setFiles(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                )
            );
        },
    });

    const onSubmit = (data: any) => {
        const { password, confirm_password, ...dataToSubmit } = data;
        if (password && confirm_password) {
            dataToSubmit.password = password;
            dataToSubmit.confirm_password = confirm_password
        }
        // @ts-ignore
        dispatch(changeStaffDetails({staffId, dataToSubmit}))
        dispatch(alertAction.onAddAlertOptions({
            type: "success",
            status: true,
            msg: "Successfully changed"
        }))
    }

    const onImgChange = () => {
        if (files) {
            formData.append("photo", files[0])
        }
        request({
            url: `user/users/crud/update/${staffId}`,
            method: "PATCH",
            body: formData,
            headers: headers()
        }).then(res => {
            dispatch(staffProfileActions.onEditProfile(res))
        })
        dispatch(alertAction.onAddAlertOptions({
            type: "success",
            status: true,
            msg: "Успешно изменено"
        }))
        setEditModal(false)
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
                        {
                            <img onClick={() => setEditModal(!editModal)} className={cls.profileBox__leftSide__profileContainer__img} src={details?.photo ? details.photo : profileImg} alt=""/>

                        }
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
                                <h1 className={cls.profileBox__rigthSide__profileSetBox__heading}>Профиль</h1>
                                {/*<h1 className={cls.profileBox__rigthSide__profileSetBox__heading}>Подробности</h1>*/}
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
                                            children={"Сохранить изменения"}/>
                                </Form>
                                <h1 className={cls.profileBox__rigthSide__profileSetBox__heading}>Details</h1>
                                <Form extraClass={cls.profileBox__rigthSide__profileSetBox__formBox}
                                      onSubmit={handleSubmit(onSubmitPassword)}>
                                    <Input
                                        // extraClass={cls.profileBox__rigthSide__profileSetBox__formBox__input}
                                        title={"Пароль"}
                                        placeholder={"Введите пароль"}
                                        name={"password"}
                                        register={register}
                                        type={"password"}
                                    />
                                    <Input
                                        // extraClass={cls.profileBox__rigthSide__profileSetBox__formBox__input}
                                        title={"Подтвердите пароль"}
                                        placeholder={"Подтвердите пароль"}
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
                                                        passwordError === "identical" ? "Пароли не идентичны" :
                                                            passwordError === "less_than_8" ? "Пароли короче 8 символов" : null
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
                                            children={"Сохранить изменения"}/>
                                </Form>

                            </Box>
                        </div>
                    </>}/>

                    <Route path={"analysis"} element={<AnalysisData/>}/>
                    <Route path={"payments"} element={<PaymentsList/>}/>


                </Routes>

            </div>
            <Modal title={"Редактировать профиль"} active={editModal} setActive={setEditModal}>
                <Form onSubmit={handleSubmit(onImgChange)} extraClass={cls.formEdit}>
                    <div {...getRootProps({className: cls.dropzone})}>
                        <input{...getInputProps()}/>

                        {!files ? <div className={cls.editDrop}>
                            {
                                <img className={cls.profileBox__leftSide__profileContainer__imgs} src={details?.photo ? details?.photo : profileImg} alt=""/>

                            }
                            </div> :
                            <div className={cls.editDrop}>
                                <img  className={cls.profileBox__leftSide__profileContainer__imgs}
                                      src={files?.map((item: { preview: any; }) => item?.preview)}
                                      alt=""/>
                            </div>


                        }
                    </div>
                    <Button children={"Сохранить фото"}/>
                </Form>

            </Modal>
            <ProfileModal active={isTimeTable} setActive={setIsTimeTable}/>
        </DynamicModuleLoader>
    )
        ;
};
