import React, {JSX, SetStateAction} from "react";
import cls from "./box.module.sass"


interface boxProps {
    children: JSX.Element|JSX.Element[],
    extraClass?: string,
    onClick?: SetStateAction<any> | React.MouseEventHandler<HTMLButtonElement>
}

export const Box = (props: boxProps) => {

    const {
        children,
        extraClass,
        onClick
    } = props
    return (
        <div onClick={onClick} className={`${cls.box} ${extraClass}`}>
            {children}
        </div>
    );
};

