import React, {JSX, useEffect, useRef, useState} from 'react';
import classNames from "classnames";

import cls from "./accardion.module.sass"

interface IAccordionProps {
    title: string,
    subtitle: string | JSX.Element,
    children: JSX.Element | JSX.Element[],
    backOpen: boolean,
    setBackOpen: (arg: boolean) => void,
    clazz?: string,
    btns?: [],
    number: string | number
}

export const Accordion: React.FC<IAccordionProps> = (props) => {

    const {
        title,
        subtitle,
        children,
        backOpen,
        setBackOpen,
        clazz,
        btns,
        number
    } = props


    const [open, setOpen] = useState(false)


    const contentHeight: React.MutableRefObject<{ current?: { scrollHeight?: string } }> = useRef({})

    // @ts-ignore
    const toggleOpen = (e) => {

        if (e.target.tagName !== "BUTTON") {
            if (backOpen !== undefined) {
                setBackOpen(!backOpen)
            } else {
                setOpen(!open)
            }
        }

    }


    return (
        <div
            className={classNames(cls.accordion, clazz, {
                [cls.active]: backOpen || open
            })}


        >
            <div className={cls.header}>
                <div className={cls.info}>

                    <span>{number}</span>
                    {
                        title ? <div className={cls.title}>{title}</div> : null
                    }


                </div>


                <div className={cls.btns}>
                    {subtitle && <div className={cls.checkbox}>{subtitle}</div>}
                    {
                        btns && btns.map(item => {
                            return item
                        })
                    }
                    <div onClick={toggleOpen} className={classNames(cls.arrow, {
                        [cls.active]: backOpen || open
                    })}>
                        <i className="fas fa-angle-down"></i>
                    </div>
                </div>
            </div>
            <div
                style={
                    backOpen || open
                        // @ts-ignore
                        ? {height: contentHeight.current.scrollHeight}
                        : {height: "0px"}
                }
                // @ts-ignore
                ref={contentHeight}
                className={cls.wrapper}
            >
                <div>
                    {children}
                </div>

            </div>
        </div>
    );
};
