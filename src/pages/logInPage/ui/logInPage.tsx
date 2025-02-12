import React from 'react';
import {useForm, SubmitHandler} from "react-hook-form";

import {Form} from "shared/ui/form";
import {Input} from "shared/ui/input";
import {Button} from "shared/ui/button";

import cls from "./logInPage.module.sass";
import image from "shared/assets/images/loginImage.png";
import logo from "shared/assets/logo/medicalLogo.png";
import {loginThunk} from "../model/thunk/loginThunk";
import {loginReducer} from "../model/slice/loginSlice";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {DynamicModuleLoader, ReducersList} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {useNavigate} from "react-router";


interface ILogData {
    username: string,
    password: string
}


const initialReducers: ReducersList = {
    loginForm: loginReducer,
};

export const LogInPage = () => {

    const {
        register,
        handleSubmit
    } = useForm<ILogData>()

    const dispatch = useAppDispatch();


    const navigate = useNavigate()

    const onSubmit: SubmitHandler<ILogData> = (data) => {


        dispatch(loginThunk(data))
            .then(res => res.meta.requestStatus === "fulfilled" ? navigate("/platform") : null)
        // request({url: "token/", method: "POST", body: JSON.stringify(data), headers: headers()})
        //     .then(res => {
        //
        //
        //
        //         console.log(res)
        //     })
    }


    return (
        <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount={false}>
            <div className={cls.loginPage}>
                <div className={cls.loginPage__content}>
                    <img className={cls.loginPage__logo} src={logo} alt=""/>
                    <h1 className={cls.loginPage__title}>Авторизоваться</h1>
                    <Form
                        extraClass={cls.loginPage__form}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className={cls.loginPage__wrapper}>
                            <Input
                                title={"Имя пользователя"}
                                placeholder={"Введите свое имя пользователя"}
                                register={register}
                                name={"username"}
                            />
                            <Input
                                type={"password"}
                                title={"Пароль"}

                                placeholder={"Введите свой пароль"}
                                register={register}
                                name={"password"}
                            />
                        </div>
                        <Button
                            extraClass={cls.loginPage__btn}
                        >
                            Авторизоваться
                        </Button>
                    </Form>
                </div>
                <div className={cls.loginPage__image}>
                    <img src={image} alt=""/>
                </div>
            </div>
        </DynamicModuleLoader>

    );
}
