import React, { useContext, useState, useEffect } from 'react';
import { format } from 'date-fns';
import { has, filter } from 'lodash';

import { reminderType } from './Reminder';

import { TiPlus } from 'react-icons/ti';

import { Container, Button, ReminderDot } from './styles';

import { CalendarCtx, CalendarContextInterface } from '../CalendarProvider';

type DayCellProps = {
    day: number;
};

const DayCell: React.FC<DayCellProps> = (props: DayCellProps) => {
    const { month, togglePopOver, setTogglePopOver, setToday, remindersList, setCurrentId } = useContext<
        CalendarContextInterface
    >(CalendarCtx);

    const { day } = props;

    const [localToday, setLocalToday] = useState<string>('');
    const [todayReminders, setTodayReminders] = useState<reminderType[] | null>([]);

    function handleDay(day: number): string {
        return ('0' + day.toString()).slice(-2);
    }

    function handleSetEditById(id = '') {
        (async () => {
            setCurrentId && (await setCurrentId(id));
        })();
        handleToggle();
    }

    function handleToday() {
        const prefix = handleDay(day);
        const todayString = `${month?.currentMonth?.date}-${prefix}`;
        return format(new Date(todayString), 'yyyy-MM-dd');
    }

    function handleToggle() {
        (async () => {
            setToday && setToday(localToday);
            setTogglePopOver && setTogglePopOver(!togglePopOver);
        })();
    }

    useEffect(() => {
        setLocalToday(handleToday());
    }, []); // set every day when did mount

    useEffect(() => {
        // console.log('rebuild dots: ', localToday, has(remindersList, localToday));
        if (localToday) {
            (async () => {
                localToday && remindersList && setTodayReminders(remindersList[localToday]);
            })();
        }
    }, [remindersList, setTodayReminders, localToday]); // set today reminders list what change reminderslist

    return (
        <Container>
            <header>
                <span>{day}</span>
                <Button disabled={togglePopOver} onClick={() => handleToggle()}>
                    <TiPlus />
                </Button>
            </header>
            <section>
                {filter(todayReminders, (reminder) => reminder.date === localToday).map((reminder, index) => (
                    <ReminderDot key={index} color={reminder.color} onClick={() => handleSetEditById(reminder.id)} />
                ))}
            </section>
        </Container>
    );
};

export default DayCell;
