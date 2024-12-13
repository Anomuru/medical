import React, {useMemo} from 'react';

import {Button} from "shared/ui/button";

import cls from "./registerPage.module.sass";

export const RegisterPage = () => {

    const registerStaff = useMemo(() => [
        {
            name: "name",
            label: "Name",
            isInput: true,
        },{
            name: "surname",
            label: "Surname",
            isInput: true,
        },{
            name: "job",
            label: "Job",
            isSelect: true,
        },{
            name: "pasport_seria",
            label: "Pasport seria (A B)",
            isInput: true,
        },{
            name: "pasport_number",
            label: "Password seria number",
            isInput: true,
        },{
            name: "birth_date",
            label: "Birthday date",
            isInput: true,
            type: "date"
        },{
            name: "phone",
            label: "Phone number",
            isInput: true,
        },{
            name: "email",
            label: "Email adress",
            isInput: true,
        },{
            name: "unknown",
            label: [{label: "Man", id: 1}, {label: "Woman", id: 2}],
            isRadio: true,
        },{
            name: "password",
            label: "Password",
            isInput: true,
            type: "password"
        },
    ], [])

    return (
        <div className={cls.registerPage}>
            <div>
                <h1>Register Staff</h1>
                <div></div>
                <Button>Register</Button>
            </div>
            <div>
                <img src="" alt=""/>
            </div>
        </div>
    );
}
