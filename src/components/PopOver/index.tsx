import React, { useContext } from 'react';

import Reminder from '../DayCell/Reminder';

import { CalendarCtx } from '../CalendarProvider';

import { MdClose } from 'react-icons/md';

import { Container, Close } from './styles';

const PopOver: React.FC = () => {
    const { togglePopOver, setTogglePopOver } = useContext(CalendarCtx);
    const { today, setToday } = useContext(CalendarCtx);

    function handleToggle() {
        setToday ? setToday(null) : null;
        setTogglePopOver ? setTogglePopOver(!togglePopOver) : null;
    }

    return (
        <Container toggled={togglePopOver || false}>
            <header>
                <h1>{today}</h1>
                <Close onClick={() => handleToggle()}>
                    <MdClose />
                </Close>
            </header>
            <Reminder />
        </Container>
    );
};

export default PopOver;
