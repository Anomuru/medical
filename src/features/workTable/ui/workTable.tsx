import React, {useCallback, useEffect, useState} from 'react';
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

import "./schedule.sass"
import {createEventModalPlugin} from "@schedule-x/event-modal";
import {Modal} from "shared/ui/modal";
import {Form} from "shared/ui/form";
import {Input} from "shared/ui/input";


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
    status: boolean;
    back_start: string;
    back_end: string;
}


export const WorkTable = () => {


    const today = new Date();
    const doctors = useSelector(getDoctorsData)

    const [active, setActive] = useState<boolean>(false)
    const [selectedDoctor, setSelectedDoctor] = useState<number | null>()
    const [type, setType] = useState<string>(types[2].value)
    const [date, setDate] = useState<string>(today.toISOString().split('T')[0])

    const [fromDate, setFromDate] = useState<string>()
    const [toDate, setToDate] = useState<string>()
    const [dateForm, setDateForm] = useState<string>()
    const [selectedTime, setSelectedTime] = useState<{ start: string; end: string }>()
    const [errorTimeMsg,setErrorTimeMsg] = useState<string>("")
    const [errorTime,setErrorTime] = useState<{start:string,end:string}>()
    const [isChanging,setIsChanging] = useState<boolean>(false)




    const [events, setEvents] = useState<IEvents[]>([])
    const dispatch = useAppDispatch()


    const handleClick = () => {
        setActive(!active)
    }

    useEffect(() => {
        dispatch(getDoctorsThunk({}))
    }, [])


    const {request} = useHttp()

    useEffect(() => {
        localStorage.removeItem("date_calendar")
        localStorage.removeItem("time")
        localStorage.removeItem("doctorIdTable")
        localStorage.removeItem("date_calendar")
        localStorage.removeItem("timeTableIds")
    }, [])

    useEffect(() => {

        if (!selectedDoctor) return;


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
        if (selectedDoctor)
            localStorage.setItem("doctorIdTable", JSON.stringify(selectedDoctor))
    }, [selectedDoctor])

    // const handleDoubleClickDateTime = useCallback(() => {
    //     setActive(prev => !prev);
    // }, []);


    const onChangedSelectedDoctor = (id: number) => {
        setSelectedDoctor(id)
    }

    const navigate = useNavigate()


    const getMinute = (minute: string) => {
        return minute.substring(3, 5)
    }
    const getHour = (hour: string) => {
        return hour.substring(0, 2)
    }

    function addOneMinute(time: string) {
        let [hours, minutes] = time.split(":").map(Number);
        minutes += 1;

        if (minutes === 60) {
            minutes = 0;
            hours += 1;
        }

        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
    }


    function getTimeDifference(start: string, end: string) {
        let [startHour, startMin] = start.split(":").map(Number);
        let [endHour, endMin] = end.split(":").map(Number);

        // Convert everything to minutes
        let startTotalMinutes = startHour * 60 + startMin;
        let endTotalMinutes = endHour * 60 + endMin;

        return endTotalMinutes - startTotalMinutes;
    }

    useEffect(() => {
        if (selectedTime && selectedTime.start && !isChanging) {
            const changedHour = getHour(selectedTime.start)
            const minute = getMinute(selectedTime.start)




            const filtered = events.filter(item => {
                const hour = getHour(item.back_end)


                return hour === changedHour && item.date === dateForm


            })





            if (!filtered.length) {
                console.log(selectedTime)

                setFromDate(selectedTime.start)
                setToDate("")

            } else {
                const sortedAppointments = filtered.sort((a, b) => {
                    return b.back_end.localeCompare(a.back_end);
                });



                const start = addOneMinute(sortedAppointments[0].back_end)


                setFromDate(start)
                // setToDate("")


            }
        } else if (selectedTime && selectedTime.start) {

            const date = JSON.parse(localStorage.getItem("date_calendar") as string)


            setFromDate(selectedTime.start)
            setToDate(selectedTime.end)
            setDateForm(date)
        }

    }, [date, events, isChanging, selectedTime,dateForm])


    useEffect(() => {
        const date = JSON.parse(localStorage.getItem("date_calendar") as string);
        const ids = JSON.parse(localStorage.getItem("timeTableIds") as any)


        if (fromDate && date && selectedDoctor && toDate) {
            const minute = getTimeDifference(fromDate,toDate)
            if (minute > 0) {

                let url

                if (isChanging) {
                    url = `user/users/get/check_doctor_time/?doctor_id=${selectedDoctor}&from_date=${fromDate}&to_date=${toDate}&date=${dateForm}&user_request_id=${ids?.requestId}`

                } else {
                    url = `user/users/get/check_doctor_time/?doctor_id=${selectedDoctor}&from_date=${fromDate}&to_date=${toDate}&date=${date}`

                }


                request({
                    url,
                    method: "GET",
                })
                    .then(res => {
                        if (!res.available) {
                            setErrorTimeMsg("Bu vaqtda patsient bor")
                            setErrorTime({start : res.start, end: res.end})
                        } else {
                            setErrorTimeMsg("")
                            setErrorTime(undefined)

                        }
                    })

            } else {
                setErrorTimeMsg("Vaqtlar no'tog'ri belgilangan")
                setErrorTime(undefined)
            }
        }
    }, [date, fromDate, selectedDoctor, toDate,dateForm])


    // useEffect(() => {
    //     if (fromDate) {
    //         const changedHour = getHour(fromDate)
    //
    //         const filtered = events.filter(item => {
    //             const hour = getHour(item.back_start)
    //             return hour === changedHour
    //         })
    //
    //
    //
    //         if (!filtered.length) {
    //             setFromDate(changedHour)
    //         } else {
    //             const sortedAppointments = filtered.sort((a, b) => {
    //                 return b.back_end.localeCompare(a.back_end);
    //             });
    //
    //             const start = addOneMinute(sortedAppointments[0].back_end)
    //
    //             setFromDate(start)
    //
    //
    //         }
    //     }
    // },[fromDate])


    const handleSubmit = () => {

        if (isChanging) {
            const data = {
                from_date: fromDate,
                to_date: toDate,
                date: dateForm
            }
            const ids = JSON.parse(localStorage.getItem("timeTableIds") as any)

            request({
                url: `user_request/crud/update/${ids.requestId}`,
                method: "PUT",
                body: JSON.stringify(data)
            })
        } else {
            const data = {
                start: fromDate,
                end: toDate,
            }
            localStorage.setItem("time", JSON.stringify(data))
            navigate("../hospitalReg")
        }



    }


    // useEffect(() => {
    //     if (eventsService)
    //         eventsService?.getAll()
    // }, [eventsService])

    // useEffect(() => {
    //     console.log(calendarControls.getView())
    // },[calendarControls])


    return (
        <>
            <DynamicModuleLoader reducers={reducers}>
                <div className={cls.mainBox}>
                    <div className={cls.mainBox__leftSight}>
                        <div className={cls.mainBox__leftSight__arounder}>
                            <h1 className={cls.mainBox__leftSight__arounder__content}>Список персонала</h1>
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
                                        <div
                                            onClick={() => onChangedSelectedDoctor(item.id)}
                                            className={classNames(cls.mainBox__leftSight__staffList__box, {
                                                [cls.active]: selectedDoctor === item.id
                                            })}
                                        >
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
                        <Calendar
                            type={type}
                            date={date}
                            events={events}
                            setActive={setActive}
                            setType={setType}
                            setDate={setDate}
                            setSelectedTime={setSelectedTime}
                            setIsChanging={setIsChanging}
                            setDateForm={setDateForm}
                        />
                    </div>


                </div>

            </DynamicModuleLoader>

            <Modal extraClass={cls.mainBox__modal} title={isChanging ? "Change" : "Add"} active={active} setActive={handleClick}>
                <div className={cls.mainBox__modal__form}>
                    <Input title={"Ot"} value={fromDate} onChange={setFromDate} name={"ot"} type={"time"}/>
                    <Input title={"Do"} value={toDate} onChange={setToDate} name={"do"} type={"time"}/>
                    {isChanging && <Input title={"Sana"} value={dateForm} onChange={setDateForm} name={"date"} type={"date"}/>}

                    {/*<Select extraClass={cls.mainBox__modal__form__select} title={"Doctors"}*/}
                    {/*        setSelectOption={setSelected} optionsData={staffList}/>*/}
                    {/*<Select title={"Days"} keyValue={"name"} setSelectOption={setWeek} optionsData={weekNames}/>*/}
                    {/*<Input name={"start_time"} title={"Start time"} type={"time"} onChange={setFromDate}/>*/}
                    {/*<Input name={"end_time"} title={"End time"} type={"time"} onChange={setToDate}/>*/}
                    {!!errorTimeMsg && <h1 style={{color: "red"}}>{errorTimeMsg}</h1>}
                    {!!errorTime && (
                        <div style={{color: "red"}}>
                            <h2>Patsient vaqtlari</h2>
                            <h2><span>Ot: {errorTime.start}</span>-<span>Do: {errorTime.end}</span></h2>
                        </div>

                    )}
                    <Button disabled={!!errorTimeMsg} extraClass={cls.mainBox__modal__form__select} onClick={handleSubmit}>Send</Button>
                </div>

            </Modal>

        </>

    );
};

interface ICalendar {
    type: string,
    date: string,
    events: IEvents[],
    setActive: React.Dispatch<React.SetStateAction<boolean>>,
    setType: React.Dispatch<React.SetStateAction<string>>,
    setDate: React.Dispatch<React.SetStateAction<string>>,
    setDateForm: React.Dispatch<React.SetStateAction<string | undefined>>,
    setSelectedTime: React.Dispatch<React.SetStateAction<{ start: string, end: string } | undefined>>,
    setIsChanging:  React.Dispatch<React.SetStateAction<boolean>>

}


const Calendar = React.memo((props: ICalendar) => {


    const {
        type,
        date,
        events,
        setActive,
        setType,
        setDate,
        setSelectedTime,
        setIsChanging,
        setDateForm
    } = props

    const calendarControls = useState(() => createCalendarControlsPlugin())[0]
    const eventsServicePlugin = useState(() => createEventsServicePlugin())[0];
    const eventModal = createEventModalPlugin()


    // const handleDoubleClickDateTime = useCallback((date: any) => {
    //     console.log(date)
    //     setActive(prev => !prev);
    // }, []);




    useEffect(() => {
        if (eventsServicePlugin && events.length > 0) {
            eventsServicePlugin.set([...events]);  // Ensure it's initialized and events exist
        }
    }, [events]);


    const calendar = useCalendarApp({
        defaultView: type,
        selectedDate: date,
        locale: 'ru-RU',

        views: [
            createViewMonthGrid(),
            createViewWeek(),
            createViewDay(),
        ],
        events: [
            ...events,
            {
                id: 2,
                start: '2025-02-11 08:00',
                end: '2025-02-11 08:30',
                back_start: "8:00",
                back_end: "8:30",
            },
            {
                id: 2,
                start: '2025-02-11 08:30',
                end: '2025-02-11 08:45',
                back_start: "8:30",
                back_end: "8:45",
            }
        ],
        plugins: [
            // createEventModalPlugin(),
            // createDragAndDropPlugin()
            eventsServicePlugin,
            calendarControls,
            eventModal
        ],
        dayBoundaries: {
            start: '08:00',
            end: '00:00',
        },


        callbacks: {
            // onDoubleClickDateTime: handleDoubleClickDateTime,
            onDoubleClickDateTime(data: any) {
                // navigate("../hospitalReg")
                const math = Number(data.substring(data.length - 5, data.length - 3)) + 1
                const res = {
                    start: data.substring(data.length - 5, data.length - 3) + ":00",
                    end: (math < 10 ? `0${math}` : math) + ":00"
                }


                // localStorage.setItem("time", JSON.stringify(res))
                localStorage.setItem("date_calendar", JSON.stringify(data.substring(0, 10)))
                localStorage.removeItem("changedItemTable")


                setDateForm(data.substring(0, 10))
                setSelectedTime(res)
                setActive(prev => !prev)
                setIsChanging(false)
            },
            // onDoubleClickEvent(calendarEvent: any) {
            //     const math = Number(calendarEvent.start.substring(calendarEvent.start.length - 5, calendarEvent.start.length - 3)) + 1
            //     const res = {
            //         start: calendarEvent.start.substring(calendarEvent.start.length - 5, calendarEvent.start.length - 3) + ":00",
            //         end: (math < 10 ? `0${math}` : math) + ":00"
            //     }
            //     localStorage.setItem("date_calendar", JSON.stringify(calendarEvent.date))
            //     // localStorage.setItem("time", JSON.stringify(res))
            //     localStorage.setItem("timeTableIds", JSON.stringify({
            //         patient: calendarEvent.patient,
            //         requestId: calendarEvent.id
            //     }))
            //     setSelectedTime(res)
            //     setActive(prev => !prev)
            //     // navigate("../hospitalReg")
            // },
            onRangeUpdate(range: any) {
                if (calendarControls && calendarControls.getView) {
                    const view = calendarControls.getView();
                    if (view) {
                        setType(types.find(item => item.value === view)?.name || "default");
                    }
                }
            },
            onSelectedDateUpdate(date: string) {
                setDate((prev) => date)
            },
        }
    })

    const onChangeTime = (e: any) => {
        setSelectedTime(e)
        setActive(prev => !prev)
        setIsChanging(true)
    }

    return (
        <ScheduleXCalendar
            // style={{ fontSize: 25+ "px" }}
            customComponents={{
                timeGridEvent: CustomEvent,
                eventModal: (e: any) =>  CustomEventModal({...e,setTime:onChangeTime})
                // dateGridEvent: CustomDateGridEvent,
            }}
            calendarApp={calendar}
        />
    )

})


const CustomEvent = (event: any) => {

    const {calendarEvent,setTime} = event

    const {patient_name, status, start, end} = calendarEvent


    return (
        <div className={cls.customEvent}>
            {/*<h1 className={cls.name}>{patient_name}</h1>*/}
            <h2>
                {start.substring(11, 16)}-{end.substring(11, 16)}
            </h2>
            {/*<h2*/}
            {/*    className={classNames(cls.payment_type, {*/}
            {/*        [cls.active] : status*/}
            {/*    })}*/}
            {/*>*/}
            {/*    {status ? "оплаченный" : "неоплаченный"}*/}
            {/*</h2>*/}
        </div>
    )
}


const CustomEventModal = (event: any) => {
    const {calendarEvent,setTime} = event


    const {patient_name, status, start, end,date,id,patient} = calendarEvent

    console.log(calendarEvent)
    const onClickChange = () => {
        setTime({start: calendarEvent.back_start, end: calendarEvent.back_end})
        localStorage.setItem("date_calendar", JSON.stringify(date))
        localStorage.setItem("timeTableIds", JSON.stringify({
            patient: patient,
            requestId: id
        }))
    }


    return (
        <>
            <div className={cls.customEventModal}>
                <h1 className={cls.name}>{patient_name}</h1>
                <i
                    className={classNames("fas fa-pen",cls.pen)}
                    onClick={onClickChange}
                ></i>
                {/*<i className={classNames("fas fa-trash",cls.trash)}></i>*/}
                <h2>
                    {start.substring(11, 16)}-{end.substring(11, 16)}
                </h2>
                <h2
                    className={classNames(cls.payment_type, {
                        [cls.active]: status
                    })}
                >
                    {status ? "оплаченный" : "неоплаченный"}
                </h2>
            </div>


        </>

    )
}
