import React, { useContext, useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Dictionary, groupBy, isEmpty, has } from 'lodash';

import { reminderType } from './Reminder';

import { TiPlus } from 'react-icons/ti';

import { Container, Button, ReminderDot } from './styles';

import { CalendarCtx, CalendarContextInterface } from '../CalendarProvider';

type DayCellProps = {
    day: number;
};

const DayCell: React.FC<DayCellProps> = (props: DayCellProps) => {
    const { month } = useContext<CalendarContextInterface>(CalendarCtx);
    const { togglePopOver, setTogglePopOver } = useContext<CalendarContextInterface>(CalendarCtx);
    const { today, setToday } = useContext<CalendarContextInterface>(CalendarCtx);
    const { remindersList } = useContext<CalendarContextInterface>(CalendarCtx);
    const { setCurrentId } = useContext(CalendarCtx);

    const { day } = props;

    const [todayReminders, setTodayReminders] = useState<reminderType[] | null>([]);

    function handleDay(day: number): string {
        return ('0' + day.toString()).slice(-2);
    }

    function handleEdit(id = '') {
        console.log('Edit id ', id);
        setCurrentId && setCurrentId(id);
        handleToggle();
    }

    function handleToggle() {
        const prefix = handleDay(day);
        const todayString = `${month?.currentMonth?.date}-${prefix}`;
        const today = format(new Date(todayString), 'yyyy-MM-dd');

        (async () => {
            setToday && setToday(today);
            setTogglePopOver && setTogglePopOver(!togglePopOver);
        })();
    }

    useEffect(() => {
        if (isEmpty(today) || isEmpty(remindersList)) return;

        if (today && has(remindersList, today)) {
            (async () => {
                today && remindersList && setTodayReminders(remindersList[today]);
            })();
        }
    }, [today, remindersList]);

    return (
        <Container>
            <header>
                <span>{day}</span>
                <Button disabled={togglePopOver} onClick={() => handleToggle()}>
                    <TiPlus />
                </Button>
            </header>
            <section>
                {todayReminders &&
                    today &&
                    today.slice(-2) === day.toString() &&
                    todayReminders.map((reminder: reminderType, index: number) => {
                        return <ReminderDot key={index} onClick={() => handleEdit(reminder.id)} />;
                    })}
            </section>
        </Container>
    );
};

export default DayCell;
