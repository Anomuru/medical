import React, {useEffect, useState} from 'react';
import cls from "./workTable.module.sass"
import Calendar from "react-calendar";
import {ScheduleXCalendar, useCalendarApp} from '@schedule-x/react';
import {createViewMonthGrid, createViewWeek} from "@schedule-x/calendar";
import {createEventModalPlugin} from "@schedule-x/event-modal";
import '@schedule-x/theme-default/dist/index.css'
import {createDragAndDropPlugin} from "@schedule-x/drag-and-drop";

import img from "shared/assets/images/dailyImage.png"
import {Button} from "../../../shared/ui/button";
import classNames from "classnames";
import {Modal} from "../../../shared/ui/modal";
import {Select} from "../../../shared/ui/select";
import {useDispatch, useSelector} from "react-redux";
import {fetchStaffListData, getStaffListData, staffReducer} from "../../staff";
import {
    DynamicModuleLoader,
    ReducersList
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {workTableReducer} from "../model/slice/workTableSlice";
import {Form} from "shared/ui/form";
import {Input} from "../../../shared/ui/input";
import {workTableThunk} from "../model/thunk/workTableThunk";


const weekNames = [
    {
        id: 1,
        name: "Monday"
    },{
        id: 2,
        name: "Tuesday"
    },{
        id: 3,
        name: "Wednesday"
    },{
        id: 4,
        name: "Thursday"
    },
    {
        id: 5,
        name: "Friday"
    },
    {
        id: 6,
        name: "Sunday"
    }
]

const reducers: ReducersList = {
    staffSlice: staffReducer,
    workTableSlice: workTableReducer
}
export const WorkTable = () => {

    const [active, setActive] = useState<boolean>(false)
    const [select, setSelected] = useState<number | string>()
    const [week, setWeek] = useState<number | string>()
    const [fromDate, setFromDate] = useState<string>()
    const [toDate, setToDate] = useState<string>()
    const dispatch = useDispatch()
    const handleClick = () => {
        setActive(!active)
    }

    useEffect(() => {
        //@ts-ignore
        dispatch(fetchStaffListData())
    }, [])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // if (!(select && fromDate)) return

        const data = {
            doctor: select,
            date: week,
            from_date: fromDate,
            to_date: toDate

        }
        //@ts-ignore
        dispatch(workTableThunk(data))
    }

    const staffList = useSelector(getStaffListData)

    console.log(select, 'efefee')
    const calendar = useCalendarApp({
        views: [
            createViewWeek(),
            createViewMonthGrid()
        ],
        events: [
            {
                id: 1,
                title: "My new event",
                start: "2024-12-21 03:00",
                end: "2024-12-21 04:00",
            }
        ],
        selectedDate: "2024-12-15",
        plugins: [
            createEventModalPlugin(),
            createDragAndDropPlugin()
        ]
    })
    return (
        <DynamicModuleLoader reducers={reducers}>
            <div className={cls.mainBox}>
                <div className={cls.mainBox__leftSight}>
                    <Calendar className={cls.mainBox__leftSight__calendar}/>
                    <div className={cls.mainBox__leftSight__arounder}>
                        <h1 className={cls.mainBox__leftSight__arounder__content}>Staff list</h1>
                        <Button onClick={handleClick} extraClass={cls.mainBox__leftSight__arounder__btn} children={ <i className={classNames("fa-solid fa-plus")} />}/>
                    </div>

                    <div className={cls.mainBox__leftSight__staffList}>
                        {
                            staffList?.map((item) => (
                                <div className={cls.mainBox__leftSight__staffList__box}>
                        <span className={cls.mainBox__leftSight__staffList__box__nameBox}>
                            <img className={cls.mainBox__leftSight__staffList__box__nameBox__img} src={img} alt=""/>
                            <h1 className={cls.mainBox__leftSight__staffList__box__nameBox__content}>{item.name}</h1>
                        </span>
                                    <span className={cls.mainBox__leftSight__staffList__box__typeBox}>
                            <h1 className={cls.mainBox__leftSight__staffList__box__typeBox__type}>{item.job}</h1>
                        </span>
                                </div>
                            ))
                        }

                    </div>
                </div>
                <div className={cls.mainBox__rightSight}>
                    <ScheduleXCalendar calendarApp={calendar} />
                </div>
                <Modal extraClass={cls.mainBox__modal} title={"Add"}  active={active} setActive={handleClick}>
                    <Form extraClass={cls.mainBox__modal__form} onSubmit={handleSubmit}>
                        {/*//@ts-ignore*/}
                        <Select extraClass={cls.mainBox__modal__form__select} title={"Doctors"} setSelectOption={setSelected} optionsData={staffList}/>
                        {/*//@ts-ignore*/}
                        <Select title={"Days"} keyValue={"name"}  setSelectOption={setWeek} optionsData={weekNames}/>
                        <Input name={"start_time"} title={"Start time"} type={"time"} onChange={setFromDate}/>
                        <Input name={"end_time"} title={"End time"} type={"time"} onChange={setToDate}/>
                        <Button extraClass={cls.mainBox__modal__form__select}>Send</Button>
                    </Form>

                </Modal>
            </div>

        </DynamicModuleLoader>

    );
};

