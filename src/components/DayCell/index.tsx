import React, { useContext, useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Dictionary, groupBy } from 'lodash';

import { reminderType } from './Reminder';

import { TiPlus } from 'react-icons/ti';

import { Container, Button, ReminderDot } from './styles';

import { CalendarCtx, CalendarContextInterface } from '../CalendarProvider';

type DayCellProps = {
    day: number;
};

const DayCell: React.FC<DayCellProps> = (props: DayCellProps) => {
    const { day } = props;
    const { month } = useContext<CalendarContextInterface>(CalendarCtx);
    const { togglePopOver, setTogglePopOver } = useContext<CalendarContextInterface>(CalendarCtx);
    const { setToday } = useContext<CalendarContextInterface>(CalendarCtx);
    const { todayKey, setTodayKey } = useContext<CalendarContextInterface>(CalendarCtx);
    const { reminders } = useContext<CalendarContextInterface>(CalendarCtx);
    const { remindersList, setRemindersList } = useContext<CalendarContextInterface>(CalendarCtx);
    const [hasReminders, setHasReminders] = useState<boolean | null>(false);

    // const { reminder, setReminder } = useContext(CalendarCtx);
    const { setCurrentId } = useContext(CalendarCtx);

    function handleDay(day: number): string {
        return day.toString().length > 1 ? day.toString() : '0'.concat(day.toString());
    }

    function handleEdit(id = '') {
        console.log('Edit');
        setCurrentId && setCurrentId(id);
    }

    function handleToggle() {
        const prefix = handleDay(day);
        const todayString = `${month?.currentMonth?.date}-${prefix}`;
        const today = format(new Date(todayString), 'yyyy-MM-dd');
        setTodayKey && setTodayKey(today);
        setToday && setToday(format(new Date(todayString), 'dd MMM yy'));
        setTogglePopOver && setTogglePopOver(!togglePopOver);
        console.log(today, todayKey);
    }

    function saveReminders() {
        const newList: Dictionary<reminderType[]> = groupBy(reminders, 'dateTime');
        setRemindersList ? setRemindersList(newList) : null;
    }

    function convertToBoolean(input: string | undefined | null): boolean {
        try {
            return input ? JSON.parse(input) : false;
        } catch (e) {
            return false;
        }
    }

    useEffect(() => {
        const hasDate: boolean = remindersList && todayKey ? remindersList[todayKey]?.length > 0 : false;
        const checkHasReminders: boolean = convertToBoolean(todayKey) && hasDate;
        setHasReminders(checkHasReminders);
        saveReminders();
    }, [reminders, hasReminders, setCurrentId]);

    return (
        <Container>
            <header>
                <span>{day}</span>
                <Button disabled={togglePopOver} onClick={() => handleToggle()}>
                    <TiPlus />
                </Button>
            </header>
            <section>
                {hasReminders && remindersList && todayKey
                    ? remindersList[todayKey].map((reminder: reminderType, index: number) => {
                          return reminder ? <ReminderDot key={index} onClick={() => handleEdit(reminder.id)} /> : null;
                      })
                    : null}
            </section>
        </Container>
    );
};

export default DayCell;
