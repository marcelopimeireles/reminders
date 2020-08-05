import React, { useContext, useEffect, useState } from 'react';
import { FiTrash, FiEdit } from 'react-icons/fi';
import remove from 'lodash/remove';
import filter from 'lodash/filter';
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
    const { isEditMode, setIsEditMode } = useContext(CalendarCtx);

    const [localReminder, setlocalReminder] = useState<reminderType>({});

    function handleDelete(data: reminderType) {
        const { id } = data;
        const deletedInList = remove([...reminders], (reminder) => (reminder.id = id));
        (async () => {
            setReminders && setReminders(deletedInList);
        })();
    }

    useEffect(() => {
        if (togglePopOver === false) return;
        if (currentId)
            (async () => {
                const localRem: reminderType[] | any =
                    reminders &&
                    filter([...reminders], (reminder: reminderType) => reminder.id && reminder.id === currentId);
                setlocalReminder(localRem[0]);
            })();

        if (localReminder)
            (async () => {
                setIsEditMode && setIsEditMode(true);
            })();
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
                        <Button onClick={() => setIsEditMode && setIsEditMode(true)}>
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
