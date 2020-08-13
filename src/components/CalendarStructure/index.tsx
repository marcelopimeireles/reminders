import React, { useEffect, useContext } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { format, subMonths, getDaysInMonth, getWeeksInMonth, getDay, addMonths } from 'date-fns';

import MonthHeader, { IMonth } from '../MonthHeader';
import WeekHeader from '../WeekHeader';
import DayCell from '../DayCell';
import PopOver from '../PopOver';

import { CalendarCtx, CalendarContextInterface } from '../CalendarProvider';

import { Row, EmptyCell } from './styles';

export interface IRemindersType {
    id: string;
    date: string;
    time: string;
    description: string;
    color: string;
}

const CalendarStructure: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
    const { hash, setHash, month, setMonth, reminders, setReminders } = useContext<CalendarContextInterface>(
        CalendarCtx
    );

    function buildMonth(hash: string | null | undefined): IMonth | null {
        const currentHash: string = hash || format(new Date(), 'yyyy-MM');
        return {
            prevMonth: {
                date: format(subMonths(new Date(currentHash + '-01'), 1), 'yyyy-MM'),
                slug: format(subMonths(new Date(currentHash + '-01'), 1), 'yyyy/MM'),
            },
            currentMonth: {
                date: currentHash,
                days: getDaysInMonth(new Date(currentHash + '-01')),
                weeks: getWeeksInMonth(new Date(currentHash + '-01')),
                firstWeekDay: getDay(new Date(currentHash + '-01')),
                editDay: [],
                name: format(new Date(currentHash), 'MMM yyyy'),
            },
            nextMonth: {
                date: format(addMonths(new Date(currentHash + '-01'), 1), 'yyyy-MM'),
                slug: format(addMonths(new Date(currentHash + '-01'), 1), 'yyyy/MM'),
            },
        };
    }

    function loadLocalStorage() {
        const localRemindersStorage = localStorage.getItem('reminders');

        if (localRemindersStorage !== '[]') {
            const localReminders: IRemindersType[] = localRemindersStorage ? JSON.parse(localRemindersStorage) : null;
            mergeLocalStorage(localReminders);
        } else {
            localStorage.clear();
        }
        console.log('loadLocalStorage: ', localRemindersStorage);
    }

    function mergeLocalStorage(localReminders: IRemindersType[]) {
        if (!!localReminders) setReminders && setReminders([...reminders].concat(localReminders));
    }

    useEffect(() => {
        loadLocalStorage();
    }, []); // load local storage when did mount

    useEffect(() => {
        props.location.pathname !== '/' && setHash && setMonth
            ? setHash(props.location.pathname.slice(1).replace('/', '-'))
            : setHash
            ? setHash('')
            : null;
        setMonth ? setMonth(buildMonth(hash)) : null;
    }, [props.location.pathname, hash]); // build calendar data when change url

    return (
        <>
            <MonthHeader />
            <WeekHeader />
            {Array.from(Array(month?.currentMonth.weeks).keys()).map((week, index) => {
                return (
                    <Row key={index}>
                        {Array.from(Array(7).keys()).map((day, idx) => {
                            const firstDay = Number(month?.currentMonth.firstWeekDay);
                            const countDay = Number(idx + 1 + index * 7 - firstDay);
                            const lastDay = Number(month?.currentMonth.days);
                            const weekNumbers = Number(month?.currentMonth.weeks);

                            return index === 0 && idx >= firstDay ? (
                                <DayCell key={index + '' + idx} day={idx + 1 - firstDay} />
                            ) : index > 0 && index <= weekNumbers && countDay <= lastDay ? (
                                <DayCell key={index + '' + idx} day={countDay} />
                            ) : (
                                <EmptyCell key={index + '' + idx} />
                            );
                        })}
                    </Row>
                );
            })}
            <PopOver />
        </>
    );
};

export default CalendarStructure;
