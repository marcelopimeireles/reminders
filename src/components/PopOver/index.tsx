import React, { useContext } from 'react';

import { CalendarCtx, CalendarContextInterface } from '../CalendarProvider';

import { MdClose } from 'react-icons/md';

import { Container, Close } from './styles';

function PopOver() {
    const { togglePopOver, setTogglePopOver } = useContext(CalendarCtx);
    const { today, setToday } = useContext(CalendarCtx);

    function handleToggle() {
        setToday ? setToday(null) : null;
        setTogglePopOver ? setTogglePopOver(!togglePopOver) : null;
        console.log(togglePopOver);
    }

    return (
        <Container toggled={togglePopOver || false}>
            <header>
                <h1>{today}</h1>
                <Close onClick={() => handleToggle()}>
                    <MdClose />
                </Close>
            </header>
            {/* <Reminder reminder={reminder} handleDelete={handleDelete} /> */}
        </Container>
    );
}

export default PopOver;
