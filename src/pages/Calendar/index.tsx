import React from 'react';

import { GiBrain } from 'react-icons/gi';
import { Container } from './styles';

type CalendarProps = { children: React.ReactChild | null };

const Calendar: React.FC<CalendarProps> = (props: CalendarProps) => (
    <Container>
        <h1>
            <GiBrain size="32" />
            /Re.mind.me/
        </h1>
        {props.children}
    </Container>
);

export default Calendar;
