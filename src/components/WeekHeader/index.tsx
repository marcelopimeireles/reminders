import React from 'react';

import { Container, Weekday } from './styles';

const WeekHeader: React.FC = () => {
    const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    return (
        <Container>
            {weekdays.map((weekday: string, index: number) => (
                <Weekday key={index}>{weekday}</Weekday>
            ))}
        </Container>
    );
};

export default WeekHeader;
