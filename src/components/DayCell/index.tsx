import React, { MouseEvent, useContext, useState, useEffect } from 'react';
import { format } from 'date-fns';
import Reminder, { reminderType } from './Reminder';

import { TiPlus } from 'react-icons/ti';

import { Container, Button, ReminderDot } from './styles';

import { CalendarCtx, CalendarContextInterface } from '../CalendarProvider';

type DayCellProps = {
    day: number;
    handleSetEditDay?: (day?: number) => any;
};

const DayCell: React.FC<DayCellProps> = (props: DayCellProps) => {
    const { day } = props;
    const { month } = useContext<CalendarContextInterface>(CalendarCtx);
    const { togglePopOver, setTogglePopOver } = useContext<CalendarContextInterface>(CalendarCtx);
    const { setToday } = useContext<CalendarContextInterface>(CalendarCtx);
    const { reminders, setReminders } = useContext<CalendarContextInterface>(CalendarCtx);
    const { remindersList } = useContext<CalendarContextInterface>(CalendarCtx);
    const [todayList, setTodayList] = useState<string>('');
    const [hasReminders, setHasReminders] = useState<boolean | null>(false);

    // const { reminder, setReminder } = useContext(CalendarCtx);
    // const { editReminder, setEditReminder } = useContext(CalendarCtx);

    function handleDay(day: number): string {
        return day.toString().length > 1 ? day.toString() : '0'.concat(day.toString());
    }

    function handleEdit(): void {
        // if (props.day) {
        // props.handleSetEditDay(props.day);
        // }
        // setEditReminder(reminder);
        console.log('Edit');
    }

    // function handleDelete(id: string | null | undefined): string | null | undefined {
    //     return id;
    // }

    // function handleNewReminder(event: MouseEvent): void {
    //     event.stopPropagation();
    //     setTogglePopOver(true);
    // }

    // function handleSaveNewReminder(): void {
    //     dispatch(createReminder(editReminder));
    //     setTogglePopOver(false);
    // }

    function handleToggle() {
        const prefix = handleDay(day);
        const todayString = `${month?.currentMonth?.date}-${prefix}`;
        setTodayList(format(new Date(todayString), 'yyyy-MM-dd'));
        setToday ? setToday(format(new Date(todayString), 'dd MMM yy')) : null;
        setTogglePopOver ? setTogglePopOver(!togglePopOver) : null;
    }

    function convertToBoolean(input: string | null): boolean {
        try {
            return input ? JSON.parse(input) : false;
        } catch (e) {
            return false;
        }
    }

    useEffect(() => {
        const hasDate = todayList ? remindersList[todayList].length > 0 : false;
        const checkHasReminders: boolean = remindersList && convertToBoolean(todayList) && hasDate;
        setHasReminders(checkHasReminders);
    }, [remindersList, hasReminders]);

    return (
        <Container>
            <header>
                <span>{day}</span>
                <Button disabled={togglePopOver} onClick={() => handleToggle()}>
                    <TiPlus />
                </Button>
            </header>
            <section>
                {hasReminders}
                {hasReminders
                    ? remindersList[todayList]?.map((reminder: reminderType, index: number) => {
                          return reminder ? (
                              <ReminderDot key={index} color={reminder.color} onClick={() => handleEdit()} />
                          ) : null;
                      })
                    : null}
            </section>
        </Container>
    );
};

export default DayCell;
