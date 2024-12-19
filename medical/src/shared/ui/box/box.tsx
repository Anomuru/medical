import React, {JSX} from "react";
import cls from "./box.module.sass"


interface boxProps {
    children: JSX.Element|JSX.Element[],
    extraClass?: string
}

export const Box = (props: boxProps) => {

    const {
        children,
        extraClass
    } = props
    return (
        <div className={`${cls.box} ${extraClass}`}>
            {children}
        </div>
    );
};

