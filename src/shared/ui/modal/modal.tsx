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
    title?: string
}

export const Modal: React.FC<IModalProps> = memo((props) => {

    const {
        children,
        active,
        setActive,
        extraClass,
        type = "simple",
        typeIcon,
        title
    } = props

    const onClick = (event: React.MouseEvent<HTMLElement>): void => {
        const target = event.target as HTMLElement
        if (target && target.classList) {
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
                        onClick={onClick}
                    >
                        <div className={classNames(cls.modal__inner, extraClass)}>


                            <div className={cls.modal__inner_header}>
                                <h1>{title}</h1>
                                {!typeIcon ?
                                    <i
                                        onClick={onClick}
                                        className={classNames(cls.modal__close, "innerClose", "fas fa-times")}
                                    />
                                    // <img
                                    //     className={classNames(cls.modal__close, "innerClose")}
                                    //     onClick={(e) => onClick(e.target)}
                                    //     src={close}
                                    //     alt=""
                                    : null}
                            </div>
                            <div className={cls.modal__inner_body}>
                                {children}

                            </div>


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
                    onClick={onClick}
                >
                    {children}
                </div>,
                document.body
            )
        );
    }
    return null;
})