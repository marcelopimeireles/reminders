import React, { MouseEvent, useContext, useEffect } from 'react';
import { format } from 'date-fns';
import Reminder, { reminderType } from './Reminder';

import { TiPlus } from 'react-icons/ti';

import { Container, Button, ReminderDot, PopOver, Close } from './styles';

import { CalendarCtx, CalendarContextInterface } from '../CalendarProvider';

type DayCellProps = {
    day: number;
    handleSetEditDay?: (day?: number) => any;
};

const DayCell: React.FC<DayCellProps> = (props: DayCellProps) => {
    const { day } = props;
    const { month } = useContext<CalendarContextInterface>(CalendarCtx);
    const { togglePopOver, setTogglePopOver } = useContext<CalendarContextInterface>(CalendarCtx);
    const { today, setToday } = useContext<CalendarContextInterface>(CalendarCtx);

    // const { reminder, setReminder } = useContext(CalendarCtx);
    // const { editReminder, setEditReminder } = useContext(CalendarCtx);

    function handleDay(day: number): string {
        return day.toString().length > 1 ? day.toString() : '0'.concat(day.toString());
    }

    // function handleEdit(): void {
    //     if (props.day) {
    //         // props.handleSetEditDay(props.day);
    //     }
    //     setEditReminder(reminder);
    // }

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
        setToday ? setToday(format(new Date(todayString), 'dd MMM yy')) : null;
        setTogglePopOver ? setTogglePopOver(!togglePopOver) : null;
    }

    return (
        <Container>
            <header>
                <span>{day}</span>
                <Button disabled={togglePopOver} onClick={() => handleToggle()}>
                    <TiPlus />
                </Button>
            </header>
            <section>
                {/* {reminders && reminders.length > 0
                    ? reminders.map((reminder: reminderType, index) => {
                          return (
                              <>
                                  <ReminderDot
                                      key={index}
                                      id={reminder.id}
                                      color={reminder.color}
                                      onClick={() => handleEdit()}
                                  />
                              </>
                          );
                      })
                    : null} */}
            </section>
        </Container>
    );
};

export default DayCell;
