import React, {JSX} from 'react';
import cls from './workTablePage.module.sass'
import {ScheduleXCalendar, useCalendarApp} from "@schedule-x/react";
import {createViewWeek, createViewMonthGrid} from '@schedule-x/calendar'
import "@schedule-x/theme-default/dist/calendar.css"
import {createEventModalPlugin} from "@schedule-x/event-modal";
import {createDragAndDropPlugin} from "@schedule-x/drag-and-drop";

interface Event {
    title: string;
    date: string;
}

interface ICalendar {
    views: JSX.Element[];
    events: Event[];
    selectedDate: string;
    plugins: JSX.Element[];
}

export const WorkTablePage = () => {
    const calendar = useCalendarApp({
        views: [
            createViewWeek(),
            createViewMonthGrid()
        ],
        events: [
            {
                id: 1,
                title: "My new event",
                start: "2024-12-15 03:00",
                end: "2024-12-15 04:00",
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
            {/*<div className={cls.mainBox__calendarBox}>*/}
            {/*    <div className={cls.calendarWrapper}>*/}
            {/*        <Calendar />*/}
            {/*    </div>*/}
            {/*</div>*/}

            <ScheduleXCalendar calendarApp={calendar} />
        </div>
    );
};
