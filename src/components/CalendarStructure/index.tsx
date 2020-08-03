import React, { useEffect, useContext } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { format, subMonths, getDaysInMonth, getWeeksInMonth, getDay, addMonths } from 'date-fns';

import MonthHeader, { IMonth } from '../MonthHeader';
import WeekHeader from '../WeekHeader';
import DayCell from '../DayCell';
import PopOver from '../PopOver';

import { CalendarCtx, CalendarContextInterface } from '../CalendarProvider';

import { Row, EmptyCell } from './styles';

const CalendarStructure: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
    const { hash, setHash } = useContext<CalendarContextInterface>(CalendarCtx);
    const { month, setMonth } = useContext<CalendarContextInterface>(CalendarCtx);

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

    useEffect(() => {
        props.location.pathname !== '/' && setHash && setMonth
            ? setHash(props.location.pathname.slice(1).replace('/', '-'))
            : setHash
            ? setHash('')
            : null;
        setMonth ? setMonth(buildMonth(hash)) : null;
    }, [hash, props.location.pathname]);

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
