import React, {useEffect, useState} from 'react';
import cls from "./workTable.module.sass"

import {ScheduleXCalendar, useCalendarApp} from '@schedule-x/react';
import {createViewDay, createViewMonthGrid, createViewWeek} from "@schedule-x/calendar";

import '@schedule-x/theme-default/dist/index.css'


import img from "shared/assets/images/dailyImage.png"
import {Button} from "../../../shared/ui/button";
import classNames from "classnames";
import {Modal} from "../../../shared/ui/modal";
import {Select} from "../../../shared/ui/select";
import {useSelector} from "react-redux";
import {
    DynamicModuleLoader,
    ReducersList
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {workTableReducer} from "../model/slice/workTableSlice";
import {Form} from "shared/ui/form";
import {Input} from "../../../shared/ui/input";

import {useAppDispatch} from "../../../shared/lib/hooks/useAppDispatch/useAppDispatch";
import {useNavigate} from "react-router";
import {getDoctorsThunk} from "entities/oftenUsed/model/thunk/oftenUsedThunk";
import {getDoctorsData} from "entities/oftenUsed/model/selector/oftenUsedSelector";

import {createCalendarControlsPlugin} from "@schedule-x/calendar-controls";


const weekNames = [
    {
        id: 1,
        name: "Monday"
    }, {
        id: 2,
        name: "Tuesday"
    }, {
        id: 3,
        name: "Wednesday"
    }, {
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
    // staffSlice: staffReducer,
    workTableSlice: workTableReducer
}
export const WorkTable = () => {


    const calendarControls = createCalendarControlsPlugin()


    const doctors = useSelector(getDoctorsData)

    const [active, setActive] = useState<boolean>(false)
    const [select, setSelected] = useState<number | string>()
    const [selectedDoctor, setSelectedDoctor] = useState<number | null>()
    const [week, setWeek] = useState<number | string>()
    const [fromDate, setFromDate] = useState<string>()
    const [toDate, setToDate] = useState<string>()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()



    const handleClick = () => {
        setActive(!active)
    }

    useEffect(() => {
        dispatch(getDoctorsThunk({}))
    }, [])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // const data = {
        //     doctor: select,
        //     date: week,
        //     from_date: fromDate,
        //     to_date: toDate
        //
        // }
        //
        // dispatch(workTableThunk(data))
    }


    useEffect(() => {

    }, [])


    const calendar = useCalendarApp({
        views: [
            createViewMonthGrid(),
            createViewWeek(),
            createViewDay(),
        ],
        events: [
            {
                id: 1,
                title: "My new event",
                start: "2024-12-21 09:00",
                end: "2024-12-21 10:00",
            }
        ],
        selectedDate: "2024-12-15",
        plugins: [
            // createEventModalPlugin(),
            // createDragAndDropPlugin()
            calendarControls
        ],
        dayBoundaries: {
            start: '08:00',
            end: '00:00',
        },
        callbacks: {
            onDoubleClickDateTime(data: any) {
                navigate("../hospitalReg")
                const math = Number(data.substring(data.length - 5, data.length - 3)) + 1
                const res = {
                    start: data.substring(data.length - 5, data.length - 3) + ":00",
                    end: (math < 10 ? `0${math}` : math) + ":00"
                }
                localStorage.setItem("time", JSON.stringify(res))
                localStorage.setItem("date_calendar", JSON.stringify(data.substring(0, 10)))
            },
            onRangeUpdate(range: any) {
                console.log('new calendar range start date', range.start)
                console.log('new calendar range end date', range.end)
                if (calendarControls)
                console.log(calendarControls?.getView())
            },
            onEventUpdate(updatedEvent: any) {
                console.log('onEventUpdate', updatedEvent)
            },
            onClickDate(date: any) {
                console.log('onClickDate', date) // e.g. 2024-01-01
            },


            onClickDateTime(dateTime: string) {
                console.log('onClickDateTime', dateTime) // e.g. 2024-01-01 12:37
            },

            onClickAgendaDate(date: string) {
                console.log('onClickAgendaDate', date) // e.g. 2024-01-01
            },
            onSelectedDateUpdate(date: string) {
                console.log('onSelectedDateUpdate', date)
            },
        }
    })


    const onChangedSelectedDoctor = (id: number) => {
        setSelectedDoctor(id)
    }

    //
    // useEffect(() => {
    //     // get all events
    //     if (eventsService)
    //         eventsService?.getAll()
    // }, [eventsService])

    // useEffect(() => {
    //     console.log(calendarControls.getView())
    // },[calendarControls])

    return (
        <DynamicModuleLoader reducers={reducers}>
            <div className={cls.mainBox}>
                <div className={cls.mainBox__leftSight}>
                    <div className={cls.mainBox__leftSight__arounder}>
                        <h1 className={cls.mainBox__leftSight__arounder__content}>Staff list</h1>
                        <Button
                            onClick={handleClick}
                            extraClass={cls.mainBox__leftSight__arounder__btn}
                            children={<i className={classNames("fa-solid fa-plus")}/>}
                        />
                    </div>

                    <div className={cls.mainBox__leftSight__staffList}>
                        {
                            doctors.map((item) => (
                                <>

                                    <div onClick={() => onChangedSelectedDoctor(item.id)}
                                         className={classNames(cls.mainBox__leftSight__staffList__box, {
                                             [cls.active]: selectedDoctor === item.id
                                         })}>
                                        <div className={cls.mainBox__leftSight__staffList__box__nameBox}>
                                            <img className={cls.mainBox__leftSight__staffList__box__nameBox__img}
                                                 src={img}
                                                 alt=""/>
                                            <h1 className={cls.mainBox__leftSight__staffList__box__nameBox__content}>{item.name}</h1>
                                        </div>
                                        <div className={cls.mainBox__leftSight__staffList__box__typeBox}>
                                            {
                                                item.jobs.map(job => {
                                                    return (
                                                        <>
                                                            <h1 className={cls.mainBox__leftSight__staffList__box__typeBox__type}>{job.name}</h1>


                                                        </>

                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div onClick={() => onChangedSelectedDoctor(item.id)}
                                         className={classNames(cls.mainBox__leftSight__staffList__box, {
                                             [cls.active]: selectedDoctor === item.id
                                         })}>
                                        <div className={cls.mainBox__leftSight__staffList__box__nameBox}>
                                            <img className={cls.mainBox__leftSight__staffList__box__nameBox__img}
                                                 src={img}
                                                 alt=""/>
                                            <h1 className={cls.mainBox__leftSight__staffList__box__nameBox__content}>{item.name}</h1>
                                        </div>
                                        <div className={cls.mainBox__leftSight__staffList__box__typeBox}>
                                            {
                                                item.jobs.map(job => {
                                                    return (
                                                        <>
                                                            <h1 className={cls.mainBox__leftSight__staffList__box__typeBox__type}>{job.name}</h1>


                                                        </>

                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div onClick={() => onChangedSelectedDoctor(item.id)}
                                         className={classNames(cls.mainBox__leftSight__staffList__box, {
                                             [cls.active]: selectedDoctor === item.id
                                         })}>
                                        <div className={cls.mainBox__leftSight__staffList__box__nameBox}>
                                            <img className={cls.mainBox__leftSight__staffList__box__nameBox__img}
                                                 src={img}
                                                 alt=""/>
                                            <h1 className={cls.mainBox__leftSight__staffList__box__nameBox__content}>{item.name}</h1>
                                        </div>
                                        <div className={cls.mainBox__leftSight__staffList__box__typeBox}>
                                            {
                                                item.jobs.map(job => {
                                                    return (
                                                        <>
                                                            <h1 className={cls.mainBox__leftSight__staffList__box__typeBox__type}>{job.name}</h1>


                                                        </>

                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div onClick={() => onChangedSelectedDoctor(item.id)}
                                         className={classNames(cls.mainBox__leftSight__staffList__box, {
                                             [cls.active]: selectedDoctor === item.id
                                         })}>
                                        <div className={cls.mainBox__leftSight__staffList__box__nameBox}>
                                            <img className={cls.mainBox__leftSight__staffList__box__nameBox__img}
                                                 src={img}
                                                 alt=""/>
                                            <h1 className={cls.mainBox__leftSight__staffList__box__nameBox__content}>{item.name}</h1>
                                        </div>
                                        <div className={cls.mainBox__leftSight__staffList__box__typeBox}>
                                            {
                                                item.jobs.map(job => {
                                                    return (
                                                        <>
                                                            <h1 className={cls.mainBox__leftSight__staffList__box__typeBox__type}>{job.name}</h1>


                                                        </>

                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </>

                            ))
                        }
                    </div>
                </div>
                <div className={cls.mainBox__rightSight}>
                    <ScheduleXCalendar

                        customComponents={{
                            // timeGridEvent: Elem,
                            // dateGridEvent: CustomDateGridEvent,
                        }}
                        calendarApp={calendar}
                    />
                </div>
                <Modal extraClass={cls.mainBox__modal} title={"Add"} active={active} setActive={handleClick}>
                    <Form extraClass={cls.mainBox__modal__form} onSubmit={handleSubmit}>
                        {/*<Select extraClass={cls.mainBox__modal__form__select} title={"Doctors"}*/}
                        {/*        setSelectOption={setSelected} optionsData={staffList}/>*/}
                        <Select title={"Days"} keyValue={"name"} setSelectOption={setWeek} optionsData={weekNames}/>
                        <Input name={"start_time"} title={"Start time"} type={"time"} onChange={setFromDate}/>
                        <Input name={"end_time"} title={"End time"} type={"time"} onChange={setToDate}/>
                        <Button extraClass={cls.mainBox__modal__form__select}>Send</Button>
                    </Form>

                </Modal>
            </div>

        </DynamicModuleLoader>

    );
};

