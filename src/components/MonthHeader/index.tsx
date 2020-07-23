import React from 'react';
import { TiChevronLeft, TiChevronRight } from 'react-icons/ti';

type MonthProps = {
    prevMonth: string;
    currentMonth: string;
    nextMonth: string;
};

import { Container, Row, Col } from './styles';

const MonthHeader: React.FC<MonthProps> = (props: MonthProps) => {
    return (
        <Container>
            <Row>
                <Col>
                    <a href={'/' + props.prevMonth}>
                        <TiChevronLeft />
                    </a>
                </Col>
                <Col>
                    <h1>{props.currentMonth}</h1>
                </Col>
                <Col>
                    <a href={'/' + props.nextMonth}>
                        <TiChevronRight />
                    </a>
                </Col>
            </Row>
        </Container>
    );
};

export default MonthHeader;
