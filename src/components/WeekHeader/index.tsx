import React from 'react';
import { WeekHeaderProps } from '../CalendarBuilder';

import { Container, Weekday } from './styles';

const WeekHeader: React.FC<WeekHeaderProps> = (props: WeekHeaderProps) => {
    return (
        <Container>
            {props.days.map((weekday: string, index: number) => (
                <Weekday key={index}>{weekday}</Weekday>
            ))}
        </Container>
    );
};

export default WeekHeader;
