import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { format, subMonths, addMonths, getDaysInMonth, getWeeksInMonth, getDay } from 'date-fns';

import MonthHeader, { IMonth } from '../MonthHeader';
import WeekHeader from '../WeekHeader';
import DayCell from '../DayCell';

import { Container, Row, EmptyCell } from './styles';

const CalendarBuilder: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
    const [hash, setHash] = useState('');
    const [month, setMonth] = useState<IMonth>(buildMonth(hash));

    function buildMonth(hash: string): IMonth {
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

    useEffect(() => {
        setHash(props.location.pathname.slice(1).replace('/', '-'));
        setMonth(buildMonth(hash));
    }, [hash, props.location.pathname]);

    // FIX WITH USE REDUCER
    // const days: React.ReactElement =

    // function handleDays(props: WeekHeaderProps): any {
    //     const currentDays: StateAction<JSX.Element[]> | null =
    //         props.days.length != daysElements.length
    //             ? props.days.map((day: string, index: number) => <Day key={index}>{day}</Day>)
    //             : null;
    //     setDaysElements(currentDays);
    // }

    // useEffect(handleDays(props), [daysElements]);

    return (
        <Container>
            <MonthHeader {...month}></MonthHeader>
            <WeekHeader />
            {Array.from(Array(month.currentMonth.weeks).keys()).map((week, index) => {
                return (
                    <Row key={index}>
                        {Array.from(Array(7).keys()).map((day, idx) => {
                            const firstDay = month.currentMonth.firstWeekDay;
                            const countDay = idx + 1 + index * 7 - firstDay;
                            const lastDay = month.currentMonth.days;

                            return index === 0 && idx >= firstDay ? (
                                <DayCell key={index + '' + idx} day={idx - firstDay + 1} />
                            ) : index > 0 && index <= month.currentMonth.weeks && countDay <= lastDay ? (
                                <DayCell key={index + '' + idx} day={countDay} />
                            ) : (
                                <EmptyCell key={index + '' + idx} />
                            );
                        })}
                    </Row>
                );
            })}
        </Container>
    );
};

export default CalendarBuilder;
