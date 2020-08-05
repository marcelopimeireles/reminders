import React, { useContext, useEffect, useState } from 'react';
import { format } from 'date-fns';

import Reminder from '../DayCell/Reminder';

import { CalendarCtx } from '../CalendarProvider';

import { MdClose } from 'react-icons/md';

import { Container, Close } from './styles';

const PopOver: React.FC = () => {
    const { togglePopOver, setTogglePopOver } = useContext(CalendarCtx);
    const { today } = useContext(CalendarCtx);

    const [localDay, setLocalDay] = useState('');

    function handleToggle() {
        setTogglePopOver ? setTogglePopOver(!togglePopOver) : null;
    }

    useEffect(() => {
        (async () => {
            if (today && togglePopOver) setLocalDay(format(new Date(today), 'dd MMM yy'));
        })();
    }, [today, togglePopOver]);

    return (
        <Container toggled={togglePopOver || false}>
            <header>
                <h1>{localDay}</h1>
                <Close onClick={() => handleToggle()}>
                    <MdClose />
                </Close>
            </header>
            <Reminder />
        </Container>
    );
};

export default PopOver;
