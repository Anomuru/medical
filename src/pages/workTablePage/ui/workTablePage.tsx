import React, {JSX} from 'react';
import cls from './workTablePage.module.sass'
import 'react-calendar/dist/Calendar.css';

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


    return (
        <div className={cls.mainBox}>
            {/*<div className={cls.mainBox__calendarBox}>*/}
            {/*    <div className={cls.calendarWrapper}>*/}
            {/*        <Calendar />*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/*/!*<ScheduleXCalendar calendarApp={calendar} />*!/*/}
        </div>
    );
};
