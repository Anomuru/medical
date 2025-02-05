import React, {useEffect, useState} from 'react';
import cls from "./workTable.module.sass"

import {ScheduleXCalendar, useCalendarApp} from '@schedule-x/react';
import {createViewDay, createViewMonthGrid, createViewWeek,} from "@schedule-x/calendar";
import '@schedule-x/theme-default/dist/index.css'

import img from "shared/assets/images/dailyImage.png"
import {Button} from "shared/ui/button";
import classNames from "classnames";
import {useSelector} from "react-redux";
import {
    DynamicModuleLoader,
    ReducersList
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {workTableReducer} from "../model/slice/workTableSlice";

import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {useNavigate} from "react-router";
import {getDoctorsThunk} from "entities/oftenUsed/model/thunk/oftenUsedThunk";
import {getDoctorsData} from "entities/oftenUsed/model/selector/oftenUsedSelector";
import {createEventsServicePlugin} from "@schedule-x/events-service";
import {createCalendarControlsPlugin} from "@schedule-x/calendar-controls";
import {headers, useHttp} from "shared/api/base";


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

const types = [
    {
        name: "month",
        value: "month-grid"
    },
    {
        name: "day",
        value: "day"
    },
    {
        name: "week",
        value: "week"
    }
]

const reducers: ReducersList = {
    // staffSlice: staffReducer,
    workTableSlice: workTableReducer
}

interface IEvents {
    id: number;
    date: string;
    doctor: number;
    start: string;
    end: string;
    patient_name: string;
    status: boolean
}


export const WorkTable = () => {


    const calendarControls = createCalendarControlsPlugin()
    const eventsServicePlugin = useState(() => createEventsServicePlugin())[0];


    const today = new Date();
    const doctors = useSelector(getDoctorsData)

    const [active, setActive] = useState<boolean>(false)
    const [selectedDoctor, setSelectedDoctor] = useState<number | null>()
    const [type, setType] = useState<string>(types[2].value)
    const [date, setDate] = useState<string>(today.toISOString().split('T')[0])
    const [events, setEvents] = useState<IEvents[]>([])
    const dispatch = useAppDispatch()
    const navigate = useNavigate()


    const handleClick = () => {
        setActive(!active)
    }

    useEffect(() => {
        dispatch(getDoctorsThunk({}))
    }, [])


    const {request} = useHttp()

    useEffect(() => {
        console.log(date, selectedDoctor, type)
        if (date && selectedDoctor && type) {
            request({
                url: `job_info/job_get/doctor_clients/?type=${type}&doctor_id=${selectedDoctor}&date=${date}`,
                method: "GET",
                headers: headers()
            })
                .then(res => {
                    setEvents(res)
                })
        }
    }, [date, selectedDoctor, type])


    useEffect(() => {
        if (eventsServicePlugin) {
            console.log(eventsServicePlugin)
            eventsServicePlugin.set(events || [])

        }

    }, [events, eventsServicePlugin])

    const calendar = useCalendarApp({
        defaultView: type,

        /**
         * The default date to display when the calendar is first rendered. Only accepts YYYY-MM-DD format.
         * Defaults to the current date
         * */
        selectedDate: date,

        views: [
            createViewMonthGrid(),
            createViewWeek(),
            createViewDay(),
        ],
        events: [
            ...events,
            {
                id: 3,
                title: 'Breakfast with Sam',
                description: 'Discuss the new project',
                location: 'Starbucks',
                start: '2025-02-05 11:00',
                end: '2023-02-05 12:00',
            }
            ,],
        plugins: [
            // createEventModalPlugin(),
            // createDragAndDropPlugin()
            eventsServicePlugin,
            calendarControls,

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
                if (calendarControls) {
                    setType(types.filter(item => item.value === calendarControls.getView())[0].name)
                }
            },

            onSelectedDateUpdate(date: string) {
                setDate(date)
            },
        }
    })

    console.log(events)
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
                                </>

                            ))
                        }
                    </div>
                </div>
                <div className={cls.mainBox__rightSight}>
                    <ScheduleXCalendar

                        customComponents={{
                            timeGridEvent: CustomEvent,
                            // dateGridEvent: CustomDateGridEvent,
                        }}
                        calendarApp={calendar}
                    />
                </div>
                {/*<Modal extraClass={cls.mainBox__modal} title={"Add"} active={active} setActive={handleClick}>*/}
                {/*    <Form extraClass={cls.mainBox__modal__form} onSubmit={handleSubmit}>*/}
                {/*        /!*<Select extraClass={cls.mainBox__modal__form__select} title={"Doctors"}*!/*/}
                {/*        /!*        setSelectOption={setSelected} optionsData={staffList}/>*!/*/}
                {/*        <Select title={"Days"} keyValue={"name"} setSelectOption={setWeek} optionsData={weekNames}/>*/}
                {/*        <Input name={"start_time"} title={"Start time"} type={"time"} onChange={setFromDate}/>*/}
                {/*        <Input name={"end_time"} title={"End time"} type={"time"} onChange={setToDate}/>*/}
                {/*        <Button extraClass={cls.mainBox__modal__form__select}>Send</Button>*/}
                {/*    </Form>*/}

                {/*</Modal>*/}
            </div>

        </DynamicModuleLoader>

    );
};


const CustomEvent = (event: any) => {
    console.log(event)

    const {calendarEvent} = event

    const {patient_name, status} = calendarEvent

    return (
        <div className={cls.customEvent}>
            <h1 className={cls.name}>{patient_name}</h1>
            <h2
                className={classNames(cls.payment_type, {
                    [cls.active] : status
                })}
            >
                {status ? "to'landi" : "to'lanmadi"}
            </h2>
        </div>
    )
}

