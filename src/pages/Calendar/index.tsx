import React from 'react';

import { Container } from './styles';

type CalendarProps = { children: React.ReactChild };

const Calendar: React.FC<CalendarProps> = (props: CalendarProps) => <Container>{props.children}</Container>;

export default Calendar;
