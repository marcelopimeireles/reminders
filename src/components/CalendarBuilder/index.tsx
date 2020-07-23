import React, { useReducer, useEffect } from 'react';

import MonthHeader from '../MonthHeader';
import WeekHeader from '../WeekHeader';
import Day from '../Day';

import { Container, Days } from './styles';

export type WeekHeaderProps = {
    days: Array<string>;
};

const CalendarBuilder: React.FC<WeekHeaderProps> = (props: WeekHeaderProps) => {
    // FIX WITH USE REDUCER
    // const days: React.ReactElement =
    // const [daysElements, setDaysElements] = useState([]);

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
            <MonthHeader prevMonth="" currentMonth="" nextMonth=""></MonthHeader>
            <WeekHeader days={props.days}></WeekHeader>
            {/* <>{daysElements}</> */}
        </Container>
    );
};

export default CalendarBuilder;
