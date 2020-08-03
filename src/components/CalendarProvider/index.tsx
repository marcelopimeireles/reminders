import React, { useState, createContext, Context } from 'react';

import { IMonth } from '../MonthHeader';
import { format } from 'date-fns';

type SetString = (value: any | null) => void;

export interface CalendarContextInterface {
    hash?: string | null | undefined;
    setHash?: SetString | undefined;
    time?: string | null;
    setTime?: SetString;
    description?: string | null;
    setDescription?: SetString;
    color?: string | null;
    setColor?: SetString;
    colors?: string[];
    hours?: string[];
    month?: IMonth | null | undefined;
    setMonth?: SetString | undefined;
    togglePopOver?: boolean;
    setTogglePopOver?: SetString;
    today?: string | null;
    setToday?: SetString;
}

export const CalendarCtx = createContext<CalendarContextInterface>({});

const CalendarProvider: React.FC = (props) => {
    const colors = ['red', 'blue', 'green', 'black'];
    const hours = [
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
        '12:00 PM',
    ];

    const [hash, setHash] = useState(null);
    const [time, setTime] = useState(null);
    const [description, setDescription] = useState(null);
    const [month, setMonth] = useState(null);
    const [color, setColor] = useState(null);
    const [togglePopOver, setTogglePopOver] = useState(false);
    const [today, setToday] = useState(format(new Date(), 'yyyy-MM-dd'));

    return (
        <CalendarCtx.Provider
            value={{
                hash,
                setHash,
                time,
                setTime,
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
            }}
        >
            {props?.children}
        </CalendarCtx.Provider>
    );
};

export default CalendarProvider;
