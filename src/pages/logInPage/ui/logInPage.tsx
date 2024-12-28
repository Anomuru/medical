import React from 'react';
import {useForm, FieldValues, SubmitHandler} from "react-hook-form";

import {Form} from "shared/ui/form";
import {Input} from "shared/ui/input";
import {Button} from "shared/ui/button";

import cls from "./logInPage.module.sass";
import image from "shared/assets/images/loginImage.png";
import logo from "shared/assets/logo/medicalLogo.png";
import {headers, useHttp} from "shared/api/base";
import {DynamicModuleLoader, ReducersList} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {workTableReducer} from "entities/workTable";

interface ILogData {
    email: string,
    password: string
}
const reducers: ReducersList = {
    workTableSlice: workTableReducer,
    // userSlice:
};
export const LogInPage = () => {

    const {
        register,
        handleSubmit
    } = useForm<ILogData>()



    const {request} = useHttp()


    const onSubmit: SubmitHandler<ILogData> = (data) => {
        console.log(data)


        request({url: "login", method: "POST", body: JSON.stringify(data), headers: headers()})
            .then(res => {

            })
    }

    
    return (
        // <DynamicModuleLoader reducers={{}} removeAfterUnmount={false}>
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
        // </DynamicModuleLoader>

    );
}
