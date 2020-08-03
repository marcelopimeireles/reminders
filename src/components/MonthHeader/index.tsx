import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { TiChevronLeft, TiChevronRight } from 'react-icons/ti';
import { CalendarCtx, CalendarContextInterface } from '../CalendarProvider';

export interface IAltMonth {
    date: string;
    slug: string;
}

export interface ICurrentMonth {
    date: string;
    days: number;
    weeks: number;
    firstWeekDay: number;
    editDay: [];
    name: string;
}

export interface IMonth {
    prevMonth: IAltMonth;
    currentMonth: ICurrentMonth;
    nextMonth: IAltMonth;
}

import { Container, Row, Col } from './styles';

const MonthHeader: React.FC<any> = () => {
    const { month } = useContext(CalendarCtx);

    return (
        <Container>
            <Row>
                <Col>
                    <Link to={'/' + month?.prevMonth?.slug}>
                        <TiChevronLeft />
                    </Link>
                </Col>
                <Col>
                    <h1>{month?.currentMonth?.name}</h1>
                </Col>
                <Col>
                    <Link to={'/' + month?.nextMonth?.slug}>
                        <TiChevronRight />
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};

export default MonthHeader;
