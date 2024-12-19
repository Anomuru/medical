import React from 'react';
import cls from "./workTable.module.sass"
import Calendar from "react-calendar";
import {ScheduleXCalendar, useCalendarApp} from "@schedule-x/react";
import {createViewMonthGrid, createViewWeek} from "@schedule-x/calendar";
import {createEventModalPlugin} from "@schedule-x/event-modal";
import '@schedule-x/theme-default/dist/index.css'
import {createDragAndDropPlugin} from "@schedule-x/drag-and-drop";

import img from "shared/assets/images/dailyImage.png"


const list = [
    {
        name: "John",
        type: "Surgeon"
    },{
        name: "John",
        type: "Surgeon"
    },{
        name: "John",
        type: "Surgeon"
    },{
        name: "John",
        type: "Surgeon"
    },
]
export const WorkTable = () => {

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
        <div className={cls.mainBox}>
            <div className={cls.mainBox__leftSight}>
                <Calendar className={cls.mainBox__leftSight__calendar}/>
                <h1 className={cls.mainBox__leftSight__content}>Staff list</h1>
                <div className={cls.mainBox__leftSight__staffList}>
                    {
                        list.map((item) => (
                            <div className={cls.mainBox__leftSight__staffList__box}>
                        <span className={cls.mainBox__leftSight__staffList__box__nameBox}>
                            <img className={cls.mainBox__leftSight__staffList__box__nameBox__img} src={img} alt=""/>
                            <h1 className={cls.mainBox__leftSight__staffList__box__nameBox__content}>{item.name}</h1>
                        </span>
                                <span className={cls.mainBox__leftSight__staffList__box__typeBox}>
                            <h1 className={cls.mainBox__leftSight__staffList__box__typeBox__type}>{item.type}</h1>
                        </span>
                            </div>
                        ))
                    }

                </div>
            </div>
            <div className={cls.mainBox__rightSight}>
                <ScheduleXCalendar calendarApp={calendar} />
            </div>

        </div>
    );
};

