import React, { useState, createContext } from 'react';
import { format } from 'date-fns';
import { Dictionary } from 'lodash';

import { IMonth } from '../MonthHeader';
import { reminderType } from '../DayCell/Reminder';

type SetString = (value: any | null) => void;
type SetDic = (value: Dictionary<any[]> | Dictionary<never[]>) => void;

export interface CalendarContextInterface {
    hash?: string | null;
    setHash?: SetString;
    dateTime?: string | null;
    setDateTime?: SetString;
    description?: string | null;
    setDescription?: SetString;
    color?: string | null;
    setColor?: SetString;
    colors?: string[];
    hours?: string[];
    month?: IMonth | null;
    setMonth?: SetString;
    togglePopOver?: boolean;
    setTogglePopOver?: SetString;
    today?: string;
    setToday?: SetString;
    reminders?: reminderType[] | null;
    setReminders?: SetString;
    remindersList?: Dictionary<reminderType[]> | Dictionary<never[]>;
    setRemindersList?: SetDic;
    todayKey?: string;
    setTodayKey?: SetString;
    currentId?: string;
    setCurrentId?: SetString;
}

export const CalendarCtx = createContext<CalendarContextInterface>({});

const CalendarProvider: React.FC = (props) => {
    const colors = ['red', 'blue', 'green', 'black'];
    const hours = [
        '00:00 AM',
        '01:00 AM',
        '02:00 AM',
        '03:00 AM',
        '04:00 AM',
        '05:00 AM',
        '06:00 AM',
        '07:00 AM',
        '08:00 AM',
        '09:00 AM',
        '10:00 AM',
        '11:00 AM',
        '12:00 AM',
        '01:00 PM',
        '02:00 PM',
        '03:00 PM',
        '04:00 PM',
        '05:00 PM',
        '06:00 PM',
        '07:00 PM',
        '08:00 PM',
        '09:00 PM',
        '10:00 PM',
        '11:00 PM',
    ];

    const [hash, setHash] = useState(null);
    const [dateTime, setDateTime] = useState(null);
    const [description, setDescription] = useState(null);
    const [month, setMonth] = useState(null);
    const [color, setColor] = useState(null);
    const [togglePopOver, setTogglePopOver] = useState(false);
    const [today, setToday] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [todayKey, setTodayKey] = useState('');
    const [reminders, setReminders] = useState([]);
    const [currentId, setCurrentId] = useState('');
    const [remindersList, setRemindersList] = useState({});

    return (
        <CalendarCtx.Provider
            value={{
                hash,
                setHash,
                dateTime,
                setDateTime,
                description,
                setDescription,
                color,
                setColor,
                colors,
                hours,
                month,
                setMonth,
                togglePopOver,
                setTogglePopOver,
                today,
                setToday,
                todayKey,
                setTodayKey,
                reminders,
                setReminders,
                remindersList,
                setRemindersList,
                currentId,
                setCurrentId,
            }}
        >
            {props?.children}
        </CalendarCtx.Provider>
    );
};

export default CalendarProvider;
