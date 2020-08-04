import React, { useContext, useEffect, useState } from 'react';
import { FiTrash } from 'react-icons/fi';

import { CalendarCtx } from '../../CalendarProvider';
import ReminderForm from '../ReminderForm';

import { Container, Tools, Button } from './styles';

export type reminderType = {
    id?: string;
    dateTime?: Date | null;
    description?: string | null;
    color?: string | null;
};

const Reminder: React.FC = () => {
    const { currentId } = useContext(CalendarCtx);
    const { reminders, setReminders } = useContext(CalendarCtx);
    const [reminder, setReminder] = useState<reminderType>({});
    const [delRems, setDelRems] = useState<reminderType[]>([]);

    function handleDelete(data: reminderType) {
        const id = data.id;
        setDelRems(
            [...reminders].filter((item: reminderType) => {
                return item.id !== id;
            })
        );
    }

    useEffect(() => {
        if (currentId)
            setReminder(
                [...reminders].filter((reminder) => {
                    reminder.id ? reminder.id === currentId : null;
                })[0]
            );
        setReminders && setReminders(delRems);
    }, [currentId, reminder, delRems, reminders, setReminders, reminder]);

    return (
        <Container>
            <Tools>
                {currentId ? (
                    <Button onClick={() => handleDelete(reminder)}>
                        <FiTrash />
                    </Button>
                ) : null}
            </Tools>
            {currentId ? (
                <>
                    <strong>{reminder.description}</strong>
                    <time>{reminder.dateTime}</time>
                </>
            ) : (
                <ReminderForm />
            )}
        </Container>
    );
};

export default Reminder;
