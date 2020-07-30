import React, { useState, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReminder, updateReminder, deleteReminder } from '../../store/actions';

import ReminderForm from './ReminderForm';
import Reminder, { reminderType } from './Reminder';

import { TiPlus } from 'react-icons/ti';
import { MdClose } from 'react-icons/md';

import { Container, Button, ReminderDot, PopOver, Close } from './styles';

type DayCellProps = {
    day?: number;
    handleSetEditDay?: (day?: number) => any;
};

const DayCell: React.FC<DayCellProps> = (props: DayCellProps) => {
    const [reminder, setReminder] = useState<reminderType>({
        id: null,
        time: null,
        description: null,
        color: null,
    });
    const [reminders, setReminders] = useState<reminderType[]>([reminder]);
    const [editReminder, setEditReminder] = useState<reminderType | undefined>();
    const [togglePopOver, setTogglePopOver] = useState<boolean>(false);

    // const reminders: reminderType[] = useSelector((state: { reminders: reminderType[] }) => state.reminders);
    const dispatch = useDispatch();

    function handleEdit(): void {
        if (props.day) {
            // props.handleSetEditDay(props.day);
        }
        setEditReminder(reminder);
    }

    function handleDelete(id: string | null | undefined): string | null | undefined {
        return id;
    }

    function handleNewReminder(event: MouseEvent): void {
        event.stopPropagation();
        setTogglePopOver(true);
    }

    function handleSaveNewReminder(): void {
        dispatch(createReminder(editReminder));
        setTogglePopOver(false);
    }

    return (
        <Container>
            <header>
                <span>{props.day}</span>
                <Button onClick={handleNewReminder}>
                    {/* togglePopOver */}
                    <TiPlus />
                </Button>
            </header>
            <section>
                {reminders && reminders.length > 0
                    ? reminders.map((reminder: reminderType, index) => {
                          return (
                              <>
                                  {/* <ReminderDot
                                      key={index}
                                      id={reminder.id}
                                      color={reminder.color}
                                      onClick={() => handleEdit()}
                                  /> */}
                              </>
                          );
                      })
                    : null}
            </section>
            <PopOver toggled={togglePopOver}>
                <header>
                    <Close onClick={() => setTogglePopOver(false)}>
                        <MdClose />
                    </Close>
                </header>
                <Reminder reminder={reminder} handleDelete={handleDelete} />
                <ReminderForm />
            </PopOver>
        </Container>
    );
};

export default DayCell;
