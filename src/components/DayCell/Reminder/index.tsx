import React, { useContext, useEffect, useState } from 'react';
import { FiTrash, FiEdit } from 'react-icons/fi';

import { CalendarCtx } from '../../CalendarProvider';
import ReminderForm from '../ReminderForm';

import { Container, Tools, Button } from './styles';

export type reminderType = {
    id?: string;
    date?: string;
    time?: string;
    description?: string;
    color?: string;
};

const Reminder: React.FC = () => {
    const { currentId, togglePopOver } = useContext(CalendarCtx);
    const { reminders, setReminders } = useContext(CalendarCtx);

    const [localReminder, setlocalReminder] = useState<reminderType>({});
    const [isEditMode, setIsEditMode] = useState<boolean>(false);

    const [delReminders, setDelReminders] = useState<reminderType[]>([]);

    function handleDelete(data: reminderType) {
        const id = data.id;
        setDelReminders(
            [...reminders].filter((item: reminderType) => {
                return item.id !== id;
            })
        );
        (async () => {
            setReminders && setReminders(delReminders);
        })();
    }

    useEffect(() => {
        if (togglePopOver === false) return;
        if (currentId)
            (async () => {
                setlocalReminder(
                    [...reminders].filter((reminder) => {
                        reminder.id ? reminder.id === currentId : null;
                    })[0]
                );
            })();

        if (localReminder) setIsEditMode(true);
    }, [togglePopOver, currentId, reminders]);

    return (
        <Container>
            {isEditMode ? (
                <ReminderForm />
            ) : (
                <>
                    <Tools>
                        <Button onClick={() => handleDelete(localReminder)}>
                            <FiTrash />
                        </Button>
                        <Button onClick={() => setIsEditMode(true)}>
                            <FiEdit />
                        </Button>
                    </Tools>

                    <strong>{localReminder.description}</strong>
                    <time>{localReminder.date}</time>
                    <time>{localReminder.time}</time>
                </>
            )}
        </Container>
    );
};

export default Reminder;
