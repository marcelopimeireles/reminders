import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import CalendarStructure from '../CalendarStructure';
import { Container } from './styles';

const CalendarBuilder: React.FC<RouteComponentProps> = (props: RouteComponentProps, children) => {
    return (
        <Container>
            <CalendarStructure {...props}>{children}</CalendarStructure>
        </Container>
    );
};

export default CalendarBuilder;
