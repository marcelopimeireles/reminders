import React from 'react';
import { Link } from 'react-router-dom';
import { TiChevronLeft, TiChevronRight } from 'react-icons/ti';

export type altMonthProps = {
    date: string;
    slug: string;
};

export type currentMonthProps = {
    date: string;
    days: number;
    editDay: [];
    name: string;
};

export type MonthProps = {
    prevMonth: altMonthProps;
    currentMonth: currentMonthProps;
    nextMonth: altMonthProps;
};

export interface IaltMonth {
    date: string;
    slug: string;
}

export interface IcurrentMonth {
    date: string;
    days: number;
    weeks: number;
    firstWeekDay: number;
    editDay: [];
    name: string;
}

export interface IMonth {
    prevMonth: IaltMonth;
    currentMonth: IcurrentMonth;
    nextMonth: IaltMonth;
}

import { Container, Row, Col } from './styles';

const MonthHeader: React.FC<MonthProps> = (month: MonthProps) => {
    return (
        <Container>
            <Row>
                <Col>
                    <Link to={'/' + month.prevMonth.slug}>
                        <TiChevronLeft />
                    </Link>
                </Col>
                <Col>
                    <h1>{month.currentMonth.name}</h1>
                </Col>
                <Col>
                    <Link to={'/' + month.nextMonth.slug}>
                        <TiChevronRight />
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};

export default MonthHeader;
