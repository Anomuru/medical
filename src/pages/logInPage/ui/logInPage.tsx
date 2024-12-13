import React from 'react';
import {useForm} from "react-hook-form";

import {Form} from "shared/ui/form";
import {Input} from "shared/ui/input";
import {Button} from "shared/ui/button";

import cls from "./logInPage.module.sass";
import image from "shared/assets/images/loginImage.png";
import logo from "shared/assets/logo/medicalLogo.png";

interface ILogData {
    name: string,
    password: string
}

export const LogInPage = () => {

    const {
        register,
        handleSubmit
    } = useForm<ILogData>()

    const onSubmit = (data: ILogData) => {

    }

    return (
        <div className={cls.loginPage}>
            <div className={cls.loginPage__content}>
                <img className={cls.loginPage__logo} src={logo} alt=""/>
                <h1 className={cls.loginPage__title}>Login</h1>
                <Form
                    extraClass={cls.loginPage__form}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className={cls.loginPage__wrapper}>
                        <Input
                            title={"E-mail"}
                            placeholder={"Enter your Email"}
                            register={register}
                            name={"email"}
                        />
                        <Input
                            type={"password"}
                            title={"Password"}
                            placeholder={"Enter your password"}
                            register={register}
                            name={"password"}
                        />
                    </div>
                    <Button
                        extraClass={cls.loginPage__btn}
                    >
                        Login
                    </Button>
                </Form>
            </div>
            <div className={cls.loginPage__image}>
                <img src={image} alt=""/>
            </div>
        </div>
    );
}
