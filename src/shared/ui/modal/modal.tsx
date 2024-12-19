import {createPortal} from 'react-dom';
import classNames from 'classnames';
import React, {JSX, memo} from 'react';

import cls from "./modal.module.sass";

interface IModalProps {
    children: JSX.Element | JSX.Element[],
    active: boolean,
    setActive: (arg: boolean) => void,
    extraClass?: string,
    type?: string,
    typeIcon?: JSX.Element | JSX.Element[],
}

export const Modal: React.FC<IModalProps> = memo((props) => {

    const {
        children,
        active,
        setActive,
        extraClass,
        type = "simple",
        typeIcon
    } = props

    // @ts-ignore
    const onClick = (target) => {
        if (target && typeof target.className === 'string') {
            if (target.className.includes('outClose') || target.className.includes('innerClose')) {
                setActive(false);
            }
        }
    };

    if (active) {

        if (type === "simple") {
            return (


                createPortal(
                    <div
                        className={classNames(cls.modal, "outClose")}
                        onClick={(e) => onClick(e.target)}
                    >
                        <div className={classNames(cls.modal__inner, extraClass)}>

                            {!typeIcon ?
                                <i
                                    onClick={(e) => onClick(e.target)}
                                    className={classNames(cls.modal__close, "innerClose", "fas fa-times")}
                                />
                                // <img
                                //     className={classNames(cls.modal__close, "innerClose")}
                                //     onClick={(e) => onClick(e.target)}
                                //     src={close}
                                //     alt=""
                                : null}
                            {children}
                        </div>
                    </div>
                    ,
                    document.body
                )
            );
        }


        return (
            createPortal(
                <div
                    className={classNames(cls.modal, "outClose")}
                    onClick={(e) => onClick(e.target)}
                >
                    {children}
                </div>,
                document.body
            )
        );
    }
    return null;
})